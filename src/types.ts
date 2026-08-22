export type AppTab = 'parks' | 'map' | 'community' | 'alerts' | 'datasource';

export type RainRiskTier = 'Low' | 'Medium' | 'High';

export interface HistoricalDataPoint {
  time: string;
  temp: number;
  rainfallMm: number;
  humidity: number;
  condition: string;
  psi?: number;
  heatIndex?: number;
}
export type HistoricalWeatherPoint = HistoricalDataPoint;

export interface DailyForecast {
  date: string;
  dayName?: string;
  tempMin?: number;
  tempMax?: number;
  minTemp?: number;
  maxTemp?: number;
  rainChance?: number;
  rainProbability?: number;
  rainTier: RainRiskTier;
  condition: string;
  icon?: string;
  conditionIcon?: string;
  uvMax: number;
  bestWindow?: string;
  description?: string;
  humidity?: number;
  windSpeed?: string;
}
export type ForecastDay = DailyForecast;

export interface WeatherProjectionResult {
  targetDate: string;
  targetTime: string;
  parkName: string;
  projectedTemp: number;
  projectedFeelsLike: number;
  rainChance: number;
  rainTier: RainRiskTier;
  condition: string;
  icon: string;
  uvIndex: number;
  humidity: number;
  windSpeed: string;
  heatStressScore: number;
  heatStressLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: string;
  bestAlternateWindow?: string;
  confidenceScore: number;
}

export interface HourlyItem {
  time: string;
  condition: string;
  icon: string;
  temp: number;
  rainChance: number;
  humidity?: number;
  windSpeed?: string;
  description?: string;
}

export interface RainProbHour {
  label: string;
  percentage: number;
  time: string;
  tier?: RainRiskTier;
}

export interface ParkAlert {
  id: string;
  type: 'warning' | 'advisory' | 'info';
  title: string;
  timeWindow: string;
  description: string;
  timestamp?: string;
  message?: string;
  actionText?: string;
  severity: 'high' | 'medium' | 'low';
}
export type WeatherAlert = ParkAlert;

export interface NearbyPark {
  id: string;
  name: string;
  distanceKm: number;
  temp: number;
  icon: string;
  condition: string;
}

export interface Facility {
  name: string;
  icon: string;
  count?: number;
}

export interface GovApiEndpoint {
  id: string;
  name: string;
  category: 'Weather & Environment' | 'Transport & Access';
  url: string;
  hostVersion: string;
  description: string;
  refreshInterval: string;
  status: 'online' | 'degraded' | 'offline' | 'pinging' | 'idle';
  httpStatus?: number;
  latencyMs?: number;
  lastChecked?: string;
  lastSuccess?: string;
  dataSnippet?: string;
  rawSample?: any;
  errorMessage?: string;
}

export interface HeatStressResult {
  temperature: number; // Dry bulb temp in °C
  relativeHumidity: number; // in %
  windSpeedKmh: number; // in km/h
  windSpeedMs: number; // in m/s
  uvIndex: number;
  vaporPressureHpa: number; // e in hPa
  dewPointC: number; // Tdp in °C
  apparentTempC: number; // Steadman Tropical Feels Like in °C
  simplifiedWbgtC: number; // sWBGT in °C
  solarAdjustmentC: number; // Solar radiation thermal addition in °C
  windCoolingC: number; // Wind cooling reduction in °C
  heatStressIndexC: number; // Final Tropical Park Heat Stress Index in °C
  heatStressScore: number; // 0 - 100 relative heat strain score
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  badgeColor: string;
  headline: string;
  advisoryText: string;
  workRestRatio: string;
  hydrationRateMlPerHr: number;
  activityRecommendations: {
    runningJogging: string;
    familyPlay: string;
    seniorsPets: string;
  };
}

export interface LiveTransportData {
  nearbyCarparks: {
    carparkNumber: string;
    address: string;
    totalLots: number;
    availableLots: number;
    lotType: string;
    distanceEstimate: string;
  }[];
  nearbyTaxisCount: number;
  lastTransportSync: string;
}

export interface CommunityReport {
  id: string;
  author?: string;
  userName?: string;
  avatar?: string;
  userAvatar?: string;
  parkId: string;
  parkName: string;
  timestamp?: string;
  timeAgo?: string;
  category?: 'wildlife' | 'weather' | 'crowd' | 'maintenance' | 'view' | 'trail_condition';
  type?: 'wildlife' | 'weather' | 'crowd' | 'maintenance' | 'view' | 'trail_condition';
  content: string;
  tags?: string[];
  upvotes?: number;
  likes?: number;
  userUpvoted?: boolean;
  isVerified?: boolean;
  imageUrl?: string;
  statusBadge?: string;
}

export interface Park {
  id: string;
  name: string;
  region: 'Central' | 'East' | 'North' | 'South' | 'West' | 'Islands';
  category?: 'Nature Reserve' | 'Coastal Park' | 'Coastal & Waterfront' | 'Urban & Heritage' | 'Community Park' | 'Offshore Island' | 'Ecological & Wetland';
  nparksUrl?: string;
  status: 'Open' | 'Crowded' | 'Shelter Advised' | 'Maintenance';
  statusNote?: string;
  updatedAgo: string;
  currentTemp: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  bgImageUrl: string;
  mapImageUrl: string;
  lat: number;
  lng: number;
  rainProbability: RainProbHour[];
  rainTier?: RainRiskTier;
  uvIndex: {
    value: number;
    level: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
    advice: string;
    peakTime: string;
  };
  bestTime: {
    start: string;
    end: string;
    description: string;
  };
  hourly: HourlyItem[];
  alerts: ParkAlert[];
  nearby: NearbyPark[];
  facilities: Facility[];
  summary: string;
  crowdLevel: 'Low' | 'Moderate' | 'Busy' | 'High';
  humidity: number;
  windSpeed: string;
  airQualityPsi: number;
  runningTrackKm: number;
  historical24h?: HistoricalDataPoint[];
  forecast3Day?: DailyForecast[];
  forecast7Day?: DailyForecast[];
}
