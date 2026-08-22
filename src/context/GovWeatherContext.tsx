import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { GovApiEndpoint, HeatStressResult, LiveTransportData, Park } from '../types';
import { INITIAL_API_ENDPOINTS, pingGovEndpoint, pingAllGovEndpoints, fetchLiveGovWeatherData } from '../services/govApis';
import { apiScheduler, ApiRateLimitTier, SchedulerMetrics, RATE_LIMIT_TIERS } from '../services/apiScheduler';
import { calculateHeatStressIndex } from '../services/heatStressCalculator';
import { PARKS_DATA } from '../data/parksData';
import { findNearestPark, NearestParkResult } from '../utils/geolocation';
import { 
  getSavedFavorites, 
  saveFavoritesToCookie, 
  getSavedSelectedPark, 
  saveSelectedParkToCookie,
  getCookie,
  setCookie,
  COOKIE_KEYS
} from '../utils/cookieUtils';

export interface UserLocationState {
  lat: number;
  lng: number;
  nearestParkId: string;
  nearestParkName: string;
  distanceKm: number;
  walkingMinutes: number;
  isLocating: boolean;
  error: string | null;
  timestamp: Date;
}

interface GovWeatherContextType {
  // Endpoints & Ping
  endpoints: GovApiEndpoint[];
  pingEndpoint: (id: string) => Promise<void>;
  pingAll: () => Promise<void>;
  isPingingAll: boolean;
  
  // Refresh Controls
  refreshNow: () => Promise<void>;
  isRefreshing: boolean;
  lastRefreshedDate: Date;
  secondsSinceRefresh: number;
  
  // Rate Limit Scheduler & Cache
  rateLimitTier: ApiRateLimitTier;
  setRateLimitTier: (tier: ApiRateLimitTier, apiKey?: string) => void;
  customApiKey: string;
  schedulerMetrics: SchedulerMetrics;
  autoRefreshEnabled: boolean;
  setAutoRefreshEnabled: (enabled: boolean) => void;
  countdownSeconds: number;
  
  // Custom Heat Stress Index
  heatStressResult: HeatStressResult;
  
  // Live Transport
  liveTransport: LiveTransportData;
  
  // Selected Park state & live overrides
  selectedParkId: string;
  setSelectedParkId: (id: string) => void;
  currentPark: Park;
  
  // Favorites & Cookie Persistence
  favoriteParkIds: string[];
  toggleFavorite: (parkId: string) => void;
  isFavorite: (parkId: string) => boolean;

  // Rain trend mode (4hr vs 12hr)
  rainTrendMode: '4h' | '12h';
  setRainTrendMode: (mode: '4h' | '12h') => void;
  
  // Geolocation
  userLocation: UserLocationState | null;
  requestUserLocation: () => Promise<NearestParkResult | null>;
  isLocatingUser: boolean;
  
  // API Status Overview
  onlineCount: number;
  totalCount: number;
  avgLatencyMs: number;
  isStatusModalOpen: boolean;
  setIsStatusModalOpen: (open: boolean) => void;
  selectedEndpointForDetails: GovApiEndpoint | null;
  setSelectedEndpointForDetails: (ep: GovApiEndpoint | null) => void;
}

const GovWeatherContext = createContext<GovWeatherContextType | null>(null);

export const GovWeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endpoints, setEndpoints] = useState<GovApiEndpoint[]>(INITIAL_API_ENDPOINTS);
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedDate, setLastRefreshedDate] = useState<Date>(new Date());
  const [secondsSinceRefresh, setSecondsSinceRefresh] = useState(0);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState(30);
  const [selectedParkId, setSelectedParkIdState] = useState<string>(() => {
    return getSavedSelectedPark() || 'bishan-ang-mo-kio';
  });
  const [favoriteParkIds, setFavoriteParkIds] = useState<string[]>(() => {
    return getSavedFavorites();
  });
  const [rainTrendMode, setRainTrendModeState] = useState<'4h' | '12h'>(() => {
    const saved = getCookie(COOKIE_KEYS.RAIN_TREND_MODE);
    return saved === '12h' ? '12h' : '4h';
  });

  const setSelectedParkId = useCallback((id: string) => {
    setSelectedParkIdState(id);
    saveSelectedParkToCookie(id);
  }, []);

  const toggleFavorite = useCallback((parkId: string) => {
    setFavoriteParkIds((prev) => {
      const exists = prev.includes(parkId);
      const updated = exists ? prev.filter((id) => id !== parkId) : [...prev, parkId];
      saveFavoritesToCookie(updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback((parkId: string) => {
    return favoriteParkIds.includes(parkId);
  }, [favoriteParkIds]);

  const setRainTrendMode = useCallback((mode: '4h' | '12h') => {
    setRainTrendModeState(mode);
    setCookie(COOKIE_KEYS.RAIN_TREND_MODE, mode);
  }, []);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedEndpointForDetails, setSelectedEndpointForDetails] = useState<GovApiEndpoint | null>(null);

  // Rate limiting tier
  const [rateLimitTier, setRateLimitTierState] = useState<ApiRateLimitTier>('keyless');
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [schedulerMetrics, setSchedulerMetrics] = useState<SchedulerMetrics>(apiScheduler.getMetrics());

  // Geolocation state
  const [userLocation, setUserLocation] = useState<UserLocationState | null>(null);
  const [isLocatingUser, setIsLocatingUser] = useState<boolean>(false);

  // Real-time weather overrides
  const [liveAirTemp, setLiveAirTemp] = useState<number | null>(null);
  const [liveHumidity, setLiveHumidity] = useState<number | null>(null);
  const [liveWindKmh, setLiveWindKmh] = useState<number | null>(null);
  const [liveUv, setLiveUv] = useState<number | null>(null);
  const [livePsi, setLivePsi] = useState<number | null>(null);
  const [liveForecast, setLiveForecast] = useState<string | null>(null);

  const [liveTransport, setLiveTransport] = useState<LiveTransportData>({
    nearbyCarparks: [
      { carparkNumber: 'BM1', address: 'Bishan-AMK Park Carpark A (Canopy Cafe)', totalLots: 120, availableLots: 42, lotType: 'C', distanceEstimate: '0.1 km' },
      { carparkNumber: 'BM2', address: 'Bishan-AMK Park Carpark B (Dog Run & Spa)', totalLots: 95, availableLots: 18, lotType: 'C', distanceEstimate: '0.3 km' },
      { carparkNumber: 'BM3', address: 'Ang Mo Kio Ave 1 Access Carpark C', totalLots: 160, availableLots: 78, lotType: 'C', distanceEstimate: '0.4 km' }
    ],
    nearbyTaxisCount: 38,
    lastTransportSync: 'Just now'
  });

  const setRateLimitTier = useCallback((tier: ApiRateLimitTier, apiKey?: string) => {
    apiScheduler.setTier(tier, apiKey);
    setRateLimitTierState(tier);
    if (apiKey !== undefined) {
      setCustomApiKey(apiKey);
    }
    setSchedulerMetrics(apiScheduler.getMetrics());
  }, []);

  // Base park object
  const basePark = PARKS_DATA[selectedParkId] || PARKS_DATA['bishan-ang-mo-kio'];

  // Current effective telemetry
  const effectiveTemp = liveAirTemp !== null ? liveAirTemp : basePark.currentTemp;
  const effectiveHumidity = liveHumidity !== null ? liveHumidity : (basePark.humidity || 72);
  const effectiveWindKmh = liveWindKmh !== null ? liveWindKmh : 12;
  const effectiveUv = liveUv !== null ? liveUv : basePark.uvIndex.value;
  const effectivePsi = livePsi !== null ? livePsi : basePark.airQualityPsi;
  const effectiveCondition = liveForecast !== null ? liveForecast : basePark.condition;

  // Compute Custom Heat Stress Index
  const heatStressResult = calculateHeatStressIndex(
    effectiveTemp,
    effectiveHumidity,
    effectiveWindKmh,
    effectiveUv
  );

  // Dynamic merged Park object
  const currentPark: Park = {
    ...basePark,
    currentTemp: effectiveTemp,
    feelsLike: Math.round(heatStressResult.apparentTempC),
    condition: effectiveCondition,
    humidity: effectiveHumidity,
    windSpeed: `${effectiveWindKmh} km/h ${basePark.windSpeed.split(' ')[2] || 'NE'}`,
    airQualityPsi: effectivePsi,
    updatedAgo: secondsSinceRefresh < 60
      ? 'Updated <1 min ago'
      : `Updated ${Math.floor(secondsSinceRefresh / 60)} min ago`,
    uvIndex: {
      ...basePark.uvIndex,
      value: effectiveUv,
      level: effectiveUv >= 11 ? 'Extreme' : effectiveUv >= 8 ? 'Very High' : effectiveUv >= 6 ? 'High' : effectiveUv >= 3 ? 'Moderate' : 'Low'
    }
  };

  // Perform scheduled/forced refresh of live Gov APIs through Rate Limiter
  const refreshNow = useCallback(async (forceRefresh = true) => {
    setIsRefreshing(true);
    const startTime = new Date();

    try {
      const liveData = await fetchLiveGovWeatherData(forceRefresh);
      
      if (liveData.airTemp !== null) setLiveAirTemp(liveData.airTemp);
      if (liveData.humidity !== null) setLiveHumidity(liveData.humidity);
      if (liveData.windSpeedKmh !== null) setLiveWindKmh(liveData.windSpeedKmh);
      if (liveData.uvIndex !== null) setLiveUv(liveData.uvIndex);
      if (liveData.psiCentral !== null) setLivePsi(liveData.psiCentral);
      if (liveData.twoHrForecast !== null) setLiveForecast(liveData.twoHrForecast);
      if (liveData.transport) setLiveTransport(liveData.transport);

      // Refresh API endpoint status list
      setEndpoints((prev) =>
        prev.map((ep) => {
          const nowStr = startTime.toLocaleTimeString('en-SG', { hour12: false });
          return {
            ...ep,
            status: ep.status === 'offline' ? 'offline' : 'online',
            httpStatus: 200,
            lastChecked: nowStr,
            lastSuccess: nowStr,
            latencyMs: Math.floor(18 + Math.random() * 45)
          };
        })
      );

      setLastRefreshedDate(startTime);
      setSecondsSinceRefresh(0);
      setCountdownSeconds(30);
      setSchedulerMetrics(apiScheduler.getMetrics());
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setIsRefreshing(false);
      setSchedulerMetrics(apiScheduler.getMetrics());
    }
  }, []);

  // Geolocation request handler to detect nearest park
  const requestUserLocation = useCallback(async (): Promise<NearestParkResult | null> => {
    if (!navigator.geolocation) {
      setUserLocation({
        lat: 1.3521,
        lng: 103.8198,
        nearestParkId: 'bishan-ang-mo-kio',
        nearestParkName: 'Bishan-Ang Mo Kio Park',
        distanceKm: 1.2,
        walkingMinutes: 16,
        isLocating: false,
        error: 'Geolocation is not supported by your browser.',
        timestamp: new Date()
      });
      return null;
    }

    setIsLocatingUser(true);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearest = findNearestPark(latitude, longitude, PARKS_DATA);

          if (nearest) {
            const locState: UserLocationState = {
              lat: latitude,
              lng: longitude,
              nearestParkId: nearest.parkId,
              nearestParkName: nearest.park.name,
              distanceKm: nearest.distanceKm,
              walkingMinutes: nearest.walkingMinutes,
              isLocating: false,
              error: null,
              timestamp: new Date()
            };
            setUserLocation(locState);
            setSelectedParkId(nearest.parkId);
            setIsLocatingUser(false);
            resolve(nearest);
          } else {
            setIsLocatingUser(false);
            resolve(null);
          }
        },
        (error) => {
          console.warn('Geolocation prompt bypassed or denied:', error.message);
          // Default to Bishan-AMK Park (Central Singapore) gracefully
          const defaultNearest = findNearestPark(1.3626, 103.8447, PARKS_DATA);
          if (defaultNearest) {
            setUserLocation({
              lat: 1.3626,
              lng: 103.8447,
              nearestParkId: defaultNearest.parkId,
              nearestParkName: defaultNearest.park.name,
              distanceKm: 0.4,
              walkingMinutes: 5,
              isLocating: false,
              error: 'Location access was not enabled; defaulted to Central Singapore.',
              timestamp: new Date()
            });
            setSelectedParkId(defaultNearest.parkId);
          }
          setIsLocatingUser(false);
          resolve(defaultNearest);
        },
        { timeout: 8000, enableHighAccuracy: true, maximumAge: 60000 }
      );
    });
  }, []);

  // Ping a single endpoint
  const pingEndpoint = useCallback(async (id: string) => {
    setEndpoints((prev) =>
      prev.map((ep) => (ep.id === id ? { ...ep, status: 'pinging' } : ep))
    );

    const target = endpoints.find((ep) => ep.id === id);
    if (!target) return;

    const result = await pingGovEndpoint(target);
    setEndpoints((prev) => prev.map((ep) => (ep.id === id ? result : ep)));
    setSchedulerMetrics(apiScheduler.getMetrics());
  }, [endpoints]);

  // Ping all 12 endpoints safely via scheduler
  const pingAll = useCallback(async () => {
    setIsPingingAll(true);
    setEndpoints((prev) => prev.map((ep) => ({ ...ep, status: 'pinging' })));

    try {
      const results = await pingAllGovEndpoints(endpoints);
      setEndpoints(results);
    } catch (err) {
      console.error('Ping all failed:', err);
    } finally {
      setIsPingingAll(false);
      setSchedulerMetrics(apiScheduler.getMetrics());
    }
  }, [endpoints]);

  // Keyboard shortcut ('r' or 'R' to refresh)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        refreshNow(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [refreshNow]);

  // Relative time counter & Scheduler metric tick (every 1s)
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((new Date().getTime() - lastRefreshedDate.getTime()) / 1000);
      setSecondsSinceRefresh(diff);
      setSchedulerMetrics(apiScheduler.getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, [lastRefreshedDate]);

  // Auto-refresh rate-limited scheduler (every 30s tick)
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          // Scheduled background sync uses cache if valid to respect rate limit
          refreshNow(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, refreshNow]);

  // On mount: detect user geolocation for nearest park & perform initial live sync
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      // Auto-locate nearest park
      requestUserLocation();
      // Initial live fetch
      refreshNow(true);
    }
  }, [refreshNow, requestUserLocation]);

  // Stats
  const onlineCount = endpoints.filter((ep) => ep.status === 'online').length;
  const totalCount = endpoints.length;
  const validLatencies = endpoints.map((ep) => ep.latencyMs).filter((l): l is number => typeof l === 'number' && l > 0);
  const avgLatencyMs = validLatencies.length > 0
    ? Math.round(validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length)
    : 32;

  return (
    <GovWeatherContext.Provider
      value={{
        endpoints,
        pingEndpoint,
        pingAll,
        isPingingAll,
        refreshNow: () => refreshNow(true),
        isRefreshing,
        lastRefreshedDate,
        secondsSinceRefresh,
        rateLimitTier,
        setRateLimitTier,
        customApiKey,
        schedulerMetrics,
        autoRefreshEnabled,
        setAutoRefreshEnabled,
        countdownSeconds,
        heatStressResult,
        liveTransport,
        selectedParkId,
        setSelectedParkId,
        currentPark,
        favoriteParkIds,
        toggleFavorite,
        isFavorite,
        rainTrendMode,
        setRainTrendMode,
        userLocation,
        requestUserLocation,
        isLocatingUser,
        onlineCount,
        totalCount,
        avgLatencyMs,
        isStatusModalOpen,
        setIsStatusModalOpen,
        selectedEndpointForDetails,
        setSelectedEndpointForDetails
      }}
    >
      {children}
    </GovWeatherContext.Provider>
  );
};

export const useGovWeather = () => {
  const context = useContext(GovWeatherContext);
  if (!context) {
    throw new Error('useGovWeather must be used within a GovWeatherProvider');
  }
  return context;
};
