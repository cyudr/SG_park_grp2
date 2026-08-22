import { Park, WeatherAlert, CommunityReport, HistoricalWeatherPoint, ForecastDay, DailyForecast, RainProbHour } from '../types';
import { getSingaporeNow, getSingaporeHour, formatTime12H } from '../utils/timeUtils';
import { PARKS_CENTRAL } from './parksCentral';
import { PARKS_EAST } from './parksEast';
import { PARKS_NORTH } from './parksNorth';
import { PARKS_WEST } from './parksWest';
import { PARKS_SOUTH_ISLANDS } from './parksSouthIslands';

export const NATIONAL_ALERTS: WeatherAlert[] = [
  {
    id: 'sg-rain-alert-1',
    type: 'warning',
    title: 'Heavy Rain & Thundery Showers Alert',
    timeWindow: '15:30 - 18:30 SGT',
    description: 'Moderate to heavy thundery showers with gusty winds expected over northern, western, and central parts of Singapore.',
    severity: 'high'
  },
  {
    id: 'sg-heat-alert-2',
    type: 'advisory',
    title: 'Moderate Heat Stress Advisory',
    timeWindow: '12:00 - 15:30 SGT',
    description: 'WBGT elevated across unshaded open park plains. Stay hydrated, wear light clothing, and seek shelter during peak midday hours.',
    severity: 'medium'
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    parkId: 'bishan-ang-mo-kio',
    parkName: 'Bishan-Ang Mo Kio Park',
    userName: 'Cheryl T.',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '12 mins ago',
    type: 'weather',
    content: 'Dark storm clouds gathering fast over River Plains near McDonald’s. Light drizzle just started, runners heading to pavilions!',
    likes: 18,
    isVerified: true
  },
  {
    id: 'rep-2',
    parkId: 'macritchie',
    parkName: 'MacRitchie Reservoir',
    userName: 'Marcus L.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '25 mins ago',
    type: 'trail_condition',
    content: 'TreeTop Walk is open and breezy. Boardwalk steps are damp but not slippery if wearing proper trail shoes. Saw a family of long-tailed macaques near Jelutong Tower!',
    likes: 34,
    isVerified: true
  },
  {
    id: 'rep-3',
    parkId: 'east-coast-park',
    parkName: 'East Coast Park',
    userName: 'Dave K.',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '42 mins ago',
    type: 'crowd',
    content: 'Marine Cove is packed with families today. Cycling tracks near Area C are moving well, great ocean breeze keeping it comfortable.',
    likes: 21,
    isVerified: false
  },
  {
    id: 'rep-4',
    parkId: 'jurong-lake-gardens',
    parkName: 'Jurong Lake Gardens',
    userName: 'Samantha W.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timeAgo: '1 hour ago',
    type: 'wildlife',
    content: 'Spotted smooth-coated otters hunting near Rasau Walk! Very clear weather right now with mild sunshine.',
    likes: 47,
    isVerified: true
  }
];

function generateHistorical24h(baseTemp: number): HistoricalWeatherPoint[] {
  const points: HistoricalWeatherPoint[] = [];
  const hoursAgo = [24, 20, 16, 12, 8, 4, 2, 1, 0];
  const now = getSingaporeNow();
  const currentSgMs = now.getTime();
  
  hoursAgo.forEach((h, index) => {
    const pointTime = new Date(currentSgMs - h * 60 * 60 * 1000);
    const pastHour = pointTime.getHours();
    const timeLabel = h === 0 
      ? `${String(pastHour).padStart(2, '0')}:00 (Now)` 
      : h === 24 
        ? `${String(pastHour).padStart(2, '0')}:00 (YTD)` 
        : `${String(pastHour).padStart(2, '0')}:00`;

    let tempDiff = 0;
    let rain = 0;
    let humidity = 72;
    
    if (pastHour >= 13 && pastHour <= 16) {
      tempDiff = 1.5;
      rain = 3.5;
      humidity = 82;
    } else if (pastHour >= 1 && pastHour <= 6) {
      tempDiff = -4.5;
      rain = 0;
      humidity = 88;
    } else if (pastHour >= 7 && pastHour <= 11) {
      tempDiff = -1;
      rain = 0;
      humidity = 76;
    } else {
      tempDiff = -1.5;
      rain = 0;
      humidity = 80;
    }

    if (h === 0) {
      tempDiff = 0;
      humidity = 75;
    }

    points.push({
      time: timeLabel,
      temp: Math.round((baseTemp + tempDiff) * 10) / 10,
      rainfallMm: rain,
      humidity,
      heatIndex: Math.round(baseTemp + tempDiff + (humidity > 80 ? 3 : 1)),
      condition: rain > 10 ? 'Heavy Rain' : rain > 0 ? 'Light Rain' : (pastHour >= 1 && pastHour <= 6) ? 'Cool Night' : 'Partly Cloudy'
    });
  });

  return points;
}

function generate3DayForecast(baseTemp: number, parkCondition: string, parkRegion: string): DailyForecast[] {
  const now = getSingaporeNow();
  const isCoastal = parkRegion === 'East' || parkRegion === 'South' || parkRegion === 'Islands';

  const dayConfigs = [
    {
      label: 'Today',
      cond: parkCondition || 'Partly Cloudy & Breezy',
      icon: 'partly_cloudy_day',
      rainProb: 30,
      rainTier: 'Medium' as const,
      maxT: baseTemp,
      minT: Math.round(baseTemp - 5),
      uv: 8,
      window: '07:30 AM - 10:30 AM',
      desc: 'Moderate cloud cover with localized afternoon breezes. Ideal morning for outdoor trails.'
    },
    {
      label: 'Tomorrow',
      cond: isCoastal ? 'Passing Ocean Showers' : 'Afternoon Thundery Showers',
      icon: isCoastal ? 'rainy' : 'thunderstorm',
      rainProb: isCoastal ? 45 : 65,
      rainTier: isCoastal ? ('Medium' as const) : ('High' as const),
      maxT: Math.round(baseTemp - 1),
      minT: 25,
      uv: 7,
      window: '08:00 AM - 11:00 AM',
      desc: 'Showers expected across interior areas in early afternoon. Fair conditions during early morning.'
    },
    {
      label: 'Day 3',
      cond: 'Sunny & Fair',
      icon: 'wb_sunny',
      rainProb: 20,
      rainTier: 'Low' as const,
      maxT: Math.round(baseTemp + 1),
      minT: 26,
      uv: 9,
      window: '07:00 AM - 10:00 AM',
      desc: 'Clear morning skies with gentle tropical breeze. Great conditions for family picnics and cycling.'
    }
  ];

  return dayConfigs.map((cfg, idx) => {
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + idx);
    const dateFormatted = targetDate.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
    const dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : targetDate.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' });

    return {
      date: dateFormatted,
      dayName,
      condition: cfg.cond,
      icon: cfg.icon,
      conditionIcon: cfg.icon,
      maxTemp: cfg.maxT,
      tempMax: cfg.maxT,
      minTemp: cfg.minT,
      tempMin: cfg.minT,
      rainProbability: cfg.rainProb,
      rainChance: cfg.rainProb,
      rainTier: cfg.rainTier,
      uvMax: cfg.uv,
      bestWindow: cfg.window,
      description: cfg.desc,
      humidity: cfg.rainProb > 50 ? 85 : 72,
      windSpeed: isCoastal ? '14 km/h SE' : '10 km/h NE'
    };
  });
}

function generate7DayForecast(baseTemp: number, parkCondition: string): DailyForecast[] {
  const now = getSingaporeNow();
  const conditions = [
    { cond: parkCondition || 'Partly Cloudy', icon: 'partly_cloudy_day', rainProb: 35, rainTier: 'Medium' as const, maxT: baseTemp, minT: baseTemp - 5, desc: 'Afternoon thundery showers over central & inland areas.' },
    { cond: 'Scattered Showers', icon: 'rainy', rainProb: 65, rainTier: 'High' as const, maxT: baseTemp - 1, minT: 25, desc: 'Moderate to heavy morning and early afternoon rain expected.' },
    { cond: 'Thundery Showers', icon: 'thunderstorm', rainProb: 75, rainTier: 'High' as const, maxT: baseTemp - 2, minT: 24, desc: 'Gusty winds and thunder across western and northern catchments.' },
    { cond: 'Partly Cloudy', icon: 'partly_cloudy_day', rainProb: 25, rainTier: 'Low' as const, maxT: baseTemp + 1, minT: 26, desc: 'Fair morning with pleasant breezes, low rain risk.' },
    { cond: 'Sunny & Warm', icon: 'wb_sunny', rainProb: 15, rainTier: 'Low' as const, maxT: baseTemp + 2, minT: 26, desc: 'Clear skies, ideal for outdoor morning cycling and picnics.' },
    { cond: 'Passing Showers', icon: 'rainy', rainProb: 40, rainTier: 'Medium' as const, maxT: baseTemp, minT: 25, desc: 'Brief midday shower followed by pleasant late afternoon sun.' },
    { cond: 'Fair & Breezy', icon: 'cloud', rainProb: 20, rainTier: 'Low' as const, maxT: baseTemp + 1, minT: 26, desc: 'Gentle sea and reservoir winds, comfortable humidity levels.' }
  ];

  return conditions.map((c, idx) => {
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + idx);
    const dateFormatted = targetDate.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
    const dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : targetDate.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' });

    return {
      date: dateFormatted,
      dayName,
      condition: c.cond,
      icon: c.icon,
      conditionIcon: c.icon,
      maxTemp: c.maxT,
      tempMax: c.maxT,
      minTemp: c.minT,
      tempMin: c.minT,
      rainProbability: c.rainProb,
      rainChance: c.rainProb,
      rainTier: c.rainTier,
      uvMax: idx === 4 ? 9 : 7,
      bestWindow: c.rainProb > 50 ? '07:30 AM - 10:30 AM' : '04:30 PM - 07:00 PM',
      description: c.desc
    };
  });
}

function generateParkRainProbability(park: Omit<Park, 'historical24h' | 'forecast3Day' | 'forecast7Day'>): RainProbHour[] {
  const currentSgHour = getSingaporeHour();
  const isCoastal = park.region === 'East' || park.region === 'South' || park.region === 'Islands';
  const offsets = [0, 1, 2, 3, 4];
  
  return offsets.map((offset) => {
    const targetHour = (currentSgHour + offset) % 24;
    const time = formatTime12H(targetHour, 0);
    const label = offset === 0 ? 'Now' : `+${offset}h`;
    
    let percentage = 15;
    if (targetHour >= 13 && targetHour <= 17) {
      percentage = isCoastal ? 45 : 70;
    } else if (targetHour >= 11 && targetHour < 13) {
      percentage = 35;
    } else if (targetHour >= 18 && targetHour <= 20) {
      percentage = 25;
    } else if (targetHour >= 21 || targetHour < 6) {
      percentage = 8;
    } else if (targetHour >= 6 && targetHour < 9) {
      percentage = isCoastal ? 20 : 12;
    }

    const tier: 'Low' | 'Medium' | 'High' = percentage >= 60 ? 'High' : percentage >= 25 ? 'Medium' : 'Low';
    return {
      label,
      percentage,
      time,
      tier
    };
  });
}

function generateParkHourly(park: Omit<Park, 'historical24h' | 'forecast3Day' | 'forecast7Day'>) {
  const currentSgHour = getSingaporeHour();
  const isCoastal = park.region === 'East' || park.region === 'South' || park.region === 'Islands';
  const offsets = [0, 1, 2, 3, 4, 5];

  return offsets.map((offset) => {
    const targetHour = (currentSgHour + offset) % 24;
    const time = formatTime12H(targetHour, 0);

    let condition = 'Partly Cloudy';
    let icon = 'partly_cloudy_day';
    let temp = park.currentTemp;
    let rainChance = 15;
    let humidity = park.humidity || 72;

    if (targetHour >= 13 && targetHour <= 17) {
      condition = isCoastal ? 'Coastal Showers' : 'Thundery Showers';
      icon = isCoastal ? 'rainy' : 'thunderstorm';
      rainChance = isCoastal ? 50 : 70;
      temp = park.currentTemp;
      humidity = 82;
    } else if (targetHour >= 21 || targetHour < 6) {
      condition = 'Pleasant Night Breeze';
      icon = 'nights_stay';
      temp = park.currentTemp - 3;
      rainChance = 8;
      humidity = 86;
    } else if (targetHour >= 6 && targetHour < 11) {
      condition = 'Morning Fair';
      icon = 'wb_sunny';
      temp = park.currentTemp - 2;
      rainChance = 12;
      humidity = 78;
    }

    return {
      time,
      condition,
      icon,
      temp,
      rainChance,
      humidity,
      windSpeed: park.windSpeed
    };
  });
}

export const RAW_PARKS: Record<string, Omit<Park, 'historical24h' | 'forecast3Day' | 'forecast7Day'>> = {
  ...PARKS_CENTRAL,
  ...PARKS_EAST,
  ...PARKS_NORTH,
  ...PARKS_WEST,
  ...PARKS_SOUTH_ISLANDS
};

export const PARKS_DATA: Record<string, Park> = Object.entries(RAW_PARKS).reduce((acc, [id, park]) => {
  acc[id] = {
    ...park,
    rainProbability: generateParkRainProbability(park),
    hourly: generateParkHourly(park),
    historical24h: generateHistorical24h(park.currentTemp),
    forecast3Day: generate3DayForecast(park.currentTemp, park.condition, park.region),
    forecast7Day: generate7DayForecast(park.currentTemp, park.condition)
  };
  return acc;
}, {} as Record<string, Park>);
