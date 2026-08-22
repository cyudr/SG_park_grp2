/**
 * Singapore Open Data API Rate-Limiter, Scheduler & Caching Engine
 * 
 * Configured with strict rate limits:
 * - Keyless (Default): Max 3 requests per 10 seconds (scheduled and staggered)
 * - Developer Key: 6 requests per 10 seconds
 * - Production Key: 12 requests per 10 seconds
 * 
 * Complies strictly with data update cadences & TTL caching:
 * - Update Frequency: Every 30 seconds
 * - Weather Forecasts & Outlooks: 30 minutes (half-hourly)
 * - Carparks: 1 minute (60s)
 * - Taxis: 30 seconds
 * - Weather Telemetry (Temp, RH, Wind, Rain, PSI, PM2.5, UV): 2 minutes
 */

export type ApiRateLimitTier = 'keyless' | 'developer' | 'production';

export interface RateLimitConfig {
  tier: ApiRateLimitTier;
  maxRequestsPer10Sec: number;
  apiKey?: string;
}

export const RATE_LIMIT_TIERS: Record<ApiRateLimitTier, { name: string; maxRequests: number; description: string }> = {
  keyless: {
    name: 'Scheduled Keyless (Max 3/10s)',
    maxRequests: 3,
    description: 'Strictly ≤ 3 requests per 10 seconds with smooth staggering'
  },
  developer: {
    name: 'Developer API Key (Max 6/10s)',
    maxRequests: 6,
    description: '6 requests per 10 seconds'
  },
  production: {
    name: 'Production Key (Max 12/10s)',
    maxRequests: 12,
    description: '12 requests per 10 seconds'
  }
};

export interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  ttlMs: number;
  expiresAt: number;
  key: string;
}

export interface SchedulerMetrics {
  tier: ApiRateLimitTier;
  maxRequestsPer10s: number;
  tokensRemaining: number;
  usedTokensInWindow: number;
  windowResetSeconds: number;
  totalRequests: number;
  cacheHits: number;
  networkCalls: number;
  cacheHitRatioPercent: number;
  queueLength: number;
  staggerDelayMs: number;
  cachedEntriesCount: number;
  nextScheduledSync: {
    taxisInSeconds: number;
    carparksInSeconds: number;
    telemetryInSeconds: number;
    forecastsInSeconds: number;
  };
}

// TTL configuration in milliseconds
export const CACHE_TTLS = {
  weatherForecast: 30 * 60 * 1000, // 30 mins (half-hourly)
  weatherTelemetry: 2 * 60 * 1000,  // 2 mins (120s)
  carparks: 60 * 1000,             // 1 min (60s)
  taxis: 30 * 1000                 // 30 seconds
};

class ApiSchedulerEngine {
  private tier: ApiRateLimitTier = 'keyless';
  private customApiKey: string = '';
  private requestTimestamps: number[] = [];
  private lastRequestTime: number = 0;
  private cache: Map<string, CacheEntry<any>> = new Map();
  private queue: Array<{
    id: string;
    url: string;
    priority: 'high' | 'normal';
    resolve: (data: any) => void;
    reject: (err: any) => void;
  }> = [];
  private isProcessingQueue = false;

  // Telemetry stats
  private totalRequests = 0;
  private cacheHits = 0;
  private networkCalls = 0;

  // Next scheduled timestamps
  private nextTaxisSyncTime = Date.now() + CACHE_TTLS.taxis;
  private nextCarparksSyncTime = Date.now() + CACHE_TTLS.carparks;
  private nextTelemetrySyncTime = Date.now() + CACHE_TTLS.weatherTelemetry;
  private nextForecastsSyncTime = Date.now() + CACHE_TTLS.weatherForecast;

  constructor() {
    // Periodically clean up old timestamps beyond 10-second window
    setInterval(() => this.pruneOldTimestamps(), 500);
  }

  public setTier(tier: ApiRateLimitTier, apiKey?: string) {
    this.tier = tier;
    if (apiKey !== undefined) {
      this.customApiKey = apiKey;
    }
  }

  public getTier(): ApiRateLimitTier {
    return this.tier;
  }

  public getApiKey(): string {
    return this.customApiKey;
  }

  public getMaxRequestsPer10s(): number {
    return RATE_LIMIT_TIERS[this.tier].maxRequests;
  }

  private pruneOldTimestamps() {
    const now = Date.now();
    const tenSecondsAgo = now - 10000;
    this.requestTimestamps = this.requestTimestamps.filter((ts) => ts > tenSecondsAgo);
  }

  public getTokensRemaining(): number {
    this.pruneOldTimestamps();
    const max = this.getMaxRequestsPer10s();
    return Math.max(0, max - this.requestTimestamps.length);
  }

  public getWindowResetSeconds(): number {
    this.pruneOldTimestamps();
    if (this.requestTimestamps.length === 0) return 0;
    const oldestInWindow = this.requestTimestamps[0];
    const diff = (oldestInWindow + 10000 - Date.now()) / 1000;
    return Math.max(0, Math.ceil(diff));
  }

  public getMetrics(): SchedulerMetrics {
    const tokensRemaining = this.getTokensRemaining();
    const maxReq = this.getMaxRequestsPer10s();
    const now = Date.now();

    const hitRatio = this.totalRequests > 0
      ? Math.round((this.cacheHits / this.totalRequests) * 100)
      : 0;

    return {
      tier: this.tier,
      maxRequestsPer10s: maxReq,
      tokensRemaining,
      usedTokensInWindow: maxReq - tokensRemaining,
      windowResetSeconds: this.getWindowResetSeconds(),
      totalRequests: this.totalRequests,
      cacheHits: this.cacheHits,
      networkCalls: this.networkCalls,
      cacheHitRatioPercent: hitRatio,
      queueLength: this.queue.length,
      staggerDelayMs: Math.floor(10000 / maxReq),
      cachedEntriesCount: this.cache.size,
      nextScheduledSync: {
        taxisInSeconds: Math.max(0, Math.ceil((this.nextTaxisSyncTime - now) / 1000)),
        carparksInSeconds: Math.max(0, Math.ceil((this.nextCarparksSyncTime - now) / 1000)),
        telemetryInSeconds: Math.max(0, Math.ceil((this.nextTelemetrySyncTime - now) / 1000)),
        forecastsInSeconds: Math.max(0, Math.ceil((this.nextForecastsSyncTime - now) / 1000))
      }
    };
  }

  /**
   * Reads from cache if still valid
   */
  public getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() < entry.expiresAt) {
      this.totalRequests++;
      this.cacheHits++;
      return entry.data as T;
    }

    // Expired
    this.cache.delete(key);
    return null;
  }

  /**
   * Writes to cache with custom TTL
   */
  public setToCache<T>(key: string, data: T, ttlMs: number) {
    const now = Date.now();
    this.cache.set(key, {
      data,
      cachedAt: now,
      ttlMs,
      expiresAt: now + ttlMs,
      key
    });
  }

  /**
   * Updates next scheduled timestamps
   */
  public markCategorySynced(category: 'taxis' | 'carparks' | 'telemetry' | 'forecasts') {
    const now = Date.now();
    if (category === 'taxis') this.nextTaxisSyncTime = now + CACHE_TTLS.taxis;
    if (category === 'carparks') this.nextCarparksSyncTime = now + CACHE_TTLS.carparks;
    if (category === 'telemetry') this.nextTelemetrySyncTime = now + CACHE_TTLS.weatherTelemetry;
    if (category === 'forecasts') this.nextForecastsSyncTime = now + CACHE_TTLS.weatherForecast;
  }

  /**
   * Rate-limited fetch execution with automatic queue scheduling
   */
  public async scheduleFetch<T>(
    url: string,
    options: {
      cacheKey?: string;
      ttlMs?: number;
      priority?: 'high' | 'normal';
      forceRefresh?: boolean;
    } = {}
  ): Promise<T> {
    const { cacheKey, ttlMs = CACHE_TTLS.weatherTelemetry, priority = 'normal', forceRefresh = false } = options;

    this.totalRequests++;

    // 1. Check Cache first unless forceRefresh is true
    if (!forceRefresh && cacheKey) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    // 2. Enqueue network request through rate limiter
    return new Promise<T>((resolve, reject) => {
      const task = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        url,
        priority,
        resolve: (data: T) => {
          if (cacheKey) {
            this.setToCache(cacheKey, data, ttlMs);
          }
          resolve(data);
        },
        reject
      };

      if (priority === 'high') {
        this.queue.unshift(task); // High priority goes to front
      } else {
        this.queue.push(task);
      }

      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    try {
      while (this.queue.length > 0) {
        this.pruneOldTimestamps();
        const max = this.getMaxRequestsPer10s();

        // 1. Sliding window rate limit: Ensure not exceeding max (e.g. 3) in ANY 10s window
        if (this.requestTimestamps.length >= max) {
          const oldest = this.requestTimestamps[0];
          const waitTime = Math.max(100, oldest + 10000 - Date.now() + 50);
          await new Promise((r) => setTimeout(r, waitTime));
          this.pruneOldTimestamps();
          continue;
        }

        // 2. Smooth Staggering: Space out consecutive requests by at least 10s / maxRequests (e.g. ~3300ms for 3 req/10s)
        const minStaggerMs = Math.floor(10000 / max);
        const now = Date.now();
        const elapsedSinceLast = now - this.lastRequestTime;
        if (this.lastRequestTime > 0 && elapsedSinceLast < minStaggerMs && this.requestTimestamps.length > 0) {
          const staggerWait = minStaggerMs - elapsedSinceLast;
          await new Promise((r) => setTimeout(r, staggerWait));
          this.pruneOldTimestamps();
          if (this.requestTimestamps.length >= max) continue;
        }

        const task = this.queue.shift();
        if (!task) break;

        const execTime = Date.now();
        this.lastRequestTime = execTime;
        this.requestTimestamps.push(execTime);
        this.networkCalls++;

        // Execute fetch
        this.executeSingleFetch(task.url)
          .then((result) => task.resolve(result))
          .catch((err) => task.reject(err));
      }
    } finally {
      this.isProcessingQueue = false;
    }
  }

  private async executeSingleFetch(url: string): Promise<any> {
    const headers: Record<string, string> = {
      Accept: 'application/json'
    };

    if (this.customApiKey && this.customApiKey.trim() !== '') {
      headers['api-key'] = this.customApiKey.trim();
    }

    // Rewrite external data endpoints to local backend /api routes to prevent CORS issues and guarantee uptime
    let targetUrl = url;
    if (url.includes('datamall2.mytransport.sg/ltaodataservice/v3/BusArrival')) {
      const match = url.match(/BusStopCode=([^&]+)/);
      const code = match ? match[1] : '83139';
      targetUrl = `/api/lta/bus-arrival?busStopCode=${code}`;
    } else if (url.includes('datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2')) {
      targetUrl = '/api/lta/carparks';
    } else if (url.includes('datamall2.mytransport.sg/ltaodataservice/TrafficIncidents')) {
      targetUrl = '/api/lta/traffic-incidents';
    } else if (url.includes('datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts')) {
      targetUrl = '/api/lta/train-alerts';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/two-hr-forecast')) {
      targetUrl = '/api/weather/two-hr-forecast';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast')) {
      targetUrl = '/api/weather/twenty-four-hr-forecast';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/four-day-outlook')) {
      targetUrl = '/api/weather/four-day-outlook';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/air-temperature')) {
      targetUrl = '/api/weather/air-temperature';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/rainfall')) {
      targetUrl = '/api/weather/rainfall';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/psi')) {
      targetUrl = '/api/weather/psi';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/pm25')) {
      targetUrl = '/api/weather/pm25';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/uv')) {
      targetUrl = '/api/weather/uv';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/relative-humidity')) {
      targetUrl = '/api/weather/relative-humidity';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/wind-speed')) {
      targetUrl = '/api/weather/wind-speed';
    } else if (url.includes('api-open.data.gov.sg/v2/real-time/api/wind-direction')) {
      targetUrl = '/api/weather/wind-direction';
    } else if (url.includes('carpark-availability')) {
      targetUrl = '/api/weather/carparks';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  /**
   * Purges all cache
   */
  public clearCache() {
    this.cache.clear();
  }
}

export const apiScheduler = new ApiSchedulerEngine();
