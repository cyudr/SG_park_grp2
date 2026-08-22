import { Park, RainRiskTier, HistoricalDataPoint, DailyForecast, WeatherProjectionResult, RainProbHour } from '../types';
import { getSingaporeNow, getSingaporeHour, formatTime12H } from './timeUtils';

/**
 * Categorizes rain chance percentage into Low, Medium, High tiers.
 * - Low: 0% - 24% (Dry / Minimal risk)
 * - Medium: 25% - 59% (Passing showers / Moderate risk)
 * - High: 60% - 100% (High likelihood of downpour / thunderstorm)
 */
export function getRainTier(percentage: number): RainRiskTier {
  if (percentage < 25) return 'Low';
  if (percentage < 60) return 'Medium';
  return 'High';
}

export interface RainTierInfo {
  tier: RainRiskTier;
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentColor: string;
  barColor: string;
  dotColor: string;
  color: string;
  icon: string;
  description: string;
  guidance: string;
  recommendedGear: string;
}

export function getRainTierInfo(tier: RainRiskTier): RainTierInfo {
  switch (tier) {
    case 'Low':
      return {
        tier: 'Low',
        label: 'Low Rain Probability (<25%)',
        badgeBg: 'bg-[#eef7f1]',
        badgeText: 'text-[#006b47]',
        badgeBorder: 'border-[#71dba6]/40',
        accentColor: '#006b47',
        barColor: 'bg-[#006b47]/70',
        dotColor: 'bg-emerald-500',
        color: 'text-emerald-700',
        icon: 'sunny',
        description: 'Dry, fair tropical conditions expected. Low chance of precipitation.',
        guidance: 'Ideal for unshaded trails, lawns, cycling, TreeTop walks, and photography.',
        recommendedGear: 'Sun protection, sunglasses, water bottle'
      };
    case 'Medium':
      return {
        tier: 'Medium',
        label: 'Medium Rain Probability (25% - 59%)',
        badgeBg: 'bg-[#fff8e1]',
        badgeText: 'text-[#b45309]',
        badgeBorder: 'border-[#fbbf24]/50',
        accentColor: '#d97706',
        barColor: 'bg-[#d97706]/75',
        dotColor: 'bg-amber-500',
        color: 'text-amber-700',
        icon: 'partly_cloudy_day',
        description: 'Passing cloud cover with localized brief showers possible.',
        guidance: 'Good for park visits, but remain within 10-15 minutes walk of a pavilion/shelter.',
        recommendedGear: 'Compact umbrella or lightweight windbreaker'
      };
    case 'High':
      return {
        tier: 'High',
        label: 'High Rain Probability (60% - 100%)',
        badgeBg: 'bg-[#fef2f2]',
        badgeText: 'text-[#b91c1c]',
        badgeBorder: 'border-[#f87171]/50',
        accentColor: '#dc2626',
        barColor: 'bg-[#dc2626]/80',
        dotColor: 'bg-rose-500',
        color: 'text-rose-700',
        icon: 'thunderstorm',
        description: 'High risk of thundery showers or persistent monsoon downpours.',
        guidance: 'Exercise extreme caution near bodies of water or tall trees. Seek indoor/sheltered facilities.',
        recommendedGear: 'Raincoat, waterproof footwear, umbrella'
      };
  }
}

export interface RainTrendItem extends RainProbHour {
  conditionIcon: string;
  rainfallMm: string;
  hourOffset: number;
}

/**
 * Generates forward rain probability trend slices (4-Hour high resolution vs 12-Hour extended outlook)
 * strictly anchored to the real current Singapore local time (SGT / UTC+8).
 */
export function getParkRainTrendData(park: Park, mode: '4h' | '12h'): RainTrendItem[] {
  const currentSgHour = getSingaporeHour();
  const isCoastal = park.region === 'East' || park.region === 'South';

  // Base live precipitation probability if available from telemetry/radar
  const liveRainPct = park.rainProbability?.[0]?.percentage;

  if (mode === '4h') {
    // 4-Hour High Resolution: 5 intervals (Now, +1h, +2h, +3h, +4h)
    const offsets = [0, 1, 2, 3, 4];
    return offsets.map((offset) => {
      const targetHour = (currentSgHour + offset) % 24;
      const timeStr = formatTime12H(targetHour, 0);
      const label = offset === 0 ? 'Now' : `+${offset}h`;

      let percentage: number;
      let icon = 'partly_cloudy_day';

      // Singapore diurnal convective pattern
      if (targetHour >= 13 && targetHour <= 17) {
        // Peak convective afternoon
        percentage = isCoastal ? 45 : 70;
        icon = 'thunderstorm';
      } else if (targetHour >= 11 && targetHour < 13) {
        percentage = 35;
        icon = 'cloud';
      } else if (targetHour >= 18 && targetHour <= 20) {
        percentage = 25;
        icon = 'rainy';
      } else if (targetHour >= 21 || targetHour < 6) {
        percentage = 8;
        icon = 'nights_stay';
      } else if (targetHour >= 6 && targetHour < 9) {
        percentage = isCoastal ? 22 : 12;
        icon = 'wb_sunny';
      } else {
        percentage = 18;
        icon = 'partly_cloudy_day';
      }

      // For "Now", prioritize live telemetry radar percentage if provided
      if (offset === 0 && liveRainPct !== undefined) {
        percentage = liveRainPct;
        if (percentage >= 60) icon = 'thunderstorm';
        else if (percentage >= 30) icon = 'rainy';
      } else if (offset > 0 && liveRainPct !== undefined) {
        // Blend current telemetry momentum with diurnal expectation
        percentage = Math.round(percentage * 0.6 + liveRainPct * Math.max(0.1, 0.4 - offset * 0.08));
      }

      percentage = Math.min(95, Math.max(5, percentage));
      const tier = getRainTier(percentage);
      
      let rainfallMm = '0.0 mm';
      if (percentage >= 60) {
        rainfallMm = `${(3.2 + offset * 1.4).toFixed(1)} mm`;
      } else if (percentage >= 30) {
        rainfallMm = `${(0.4 + offset * 0.3).toFixed(1)} mm`;
      }

      return {
        label,
        time: timeStr,
        percentage,
        tier,
        conditionIcon: icon,
        rainfallMm,
        hourOffset: offset
      };
    });
  } else {
    // 12-Hour Extended Outlook: 7 intervals (Now, +2h, +4h, +6h, +8h, +10h, +12h)
    const offsets = [0, 2, 4, 6, 8, 10, 12];
    return offsets.map((offset) => {
      const targetHour = (currentSgHour + offset) % 24;
      const timeStr = formatTime12H(targetHour, 0);
      const label = offset === 0 ? 'Now' : `+${offset}h`;

      let percentage: number;
      let icon = 'partly_cloudy_day';

      if (targetHour >= 13 && targetHour <= 17) {
        percentage = isCoastal ? 50 : 75;
        icon = 'thunderstorm';
      } else if (targetHour >= 18 && targetHour <= 20) {
        percentage = 30;
        icon = 'rainy';
      } else if (targetHour >= 21 || targetHour < 6) {
        percentage = 8;
        icon = 'nights_stay';
      } else if (targetHour >= 6 && targetHour <= 10) {
        percentage = isCoastal ? 20 : 12;
        icon = 'wb_sunny';
      } else {
        percentage = 22;
        icon = 'cloud';
      }

      if (offset === 0 && liveRainPct !== undefined) {
        percentage = liveRainPct;
        if (percentage >= 60) icon = 'thunderstorm';
        else if (percentage >= 30) icon = 'rainy';
      }

      percentage = Math.min(95, Math.max(5, percentage));
      const tier = getRainTier(percentage);

      let rainfallMm = '0.0 mm';
      if (percentage >= 60) {
        rainfallMm = `${(3.8 + (offset % 4) * 1.2).toFixed(1)} mm`;
      } else if (percentage >= 30) {
        rainfallMm = `${(0.5 + (offset % 3) * 0.4).toFixed(1)} mm`;
      }

      return {
        label,
        time: timeStr,
        percentage,
        tier,
        conditionIcon: icon,
        rainfallMm,
        hourOffset: offset
      };
    });
  }
}

/**
 * Generates 24-hour historical telemetry for the park based on MSS baseline,
 * calculated backward from current Singapore time.
 */
export function getParkHistorical24h(park: Park): HistoricalDataPoint[] {
  const points: HistoricalDataPoint[] = [];
  const hoursAgo = [24, 20, 16, 12, 8, 4, 2, 1];
  
  const now = getSingaporeNow();
  const currentSgMs = now.getTime();
  const baseTemp = park.currentTemp || 31;
  const isCoastal = park.region === 'East' || park.region === 'South';

  hoursAgo.forEach((h, idx) => {
    const pastTime = new Date(currentSgMs - h * 60 * 60 * 1000);
    const pastHour = pastTime.getHours();
    const timeLabel = `${String(pastHour).padStart(2, '0')}:00`;

    // Diurnal variation simulation based on the actual past hour of the day
    let tempDelta = 0;
    let rainMm = 0;
    let humidity = park.humidity || 75;
    let condition = 'Fair';

    if (pastHour >= 13 && pastHour <= 16) {
      // Afternoon heat & convective rain
      tempDelta = 1.5;
      rainMm = isCoastal ? 0 : 3.2;
      humidity = 78;
      condition = isCoastal ? 'Partly Cloudy & Warm' : 'Light Afternoon Shower';
    } else if (pastHour >= 1 && pastHour <= 7) {
      // Night / Early morning cool
      tempDelta = -4.5;
      rainMm = 0;
      humidity = 88;
      condition = 'Clear & Cool';
    } else if (pastHour >= 8 && pastHour <= 12) {
      // Morning sun
      tempDelta = -1;
      rainMm = 0;
      humidity = 76;
      condition = 'Sunny Morning';
    } else {
      // Evening
      tempDelta = -2;
      rainMm = 0;
      humidity = 82;
      condition = 'Pleasant Breeze';
    }

    if (h <= 2) {
      humidity = park.humidity;
      condition = park.condition;
      rainMm = (park.rainProbability?.[0]?.percentage || 0) > 50 ? 4.5 : 0;
    }

    points.push({
      time: timeLabel,
      temp: Math.round(baseTemp + tempDelta),
      rainfallMm: rainMm,
      humidity,
      condition,
      psi: Math.max(25, Math.min(65, Math.round(park.airQualityPsi + (idx % 3) - 1)))
    });
  });

  return points;
}

/**
 * Estimation algorithm for Singapore Park 3-Day Forecast.
 * 
 * Accurately simulates Day 1 (Today), Day 2 (Tomorrow), and Day 3 (Day After)
 * based on park region, microclimate characteristics, diurnal tropical curves,
 * and current telemetry.
 */
export function getPark3DayForecast(park: Park): DailyForecast[] {
  const forecasts: DailyForecast[] = [];
  const now = getSingaporeNow();
  const isCoastal = park.region === 'East' || park.region === 'South' || park.region === 'Islands';
  const isNatureReserve = park.category === 'Nature Reserve' || park.category === 'Ecological & Wetland';
  const baseTemp = park.currentTemp || 31;

  for (let i = 0; i < 3; i++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const dayIndex = targetDate.getDay();

    const dateFormatted = targetDate.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : targetDate.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' });

    // Deterministic diurnal variation simulation for Singapore tropical weather
    let rainChance = 25;
    if (i === 0) {
      if (park.rainProbability && park.rainProbability.length > 0) {
        const avgTodayRain = Math.round(
          park.rainProbability.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / park.rainProbability.length
        );
        rainChance = Math.max(10, Math.min(90, avgTodayRain));
      } else {
        rainChance = isCoastal ? 30 : 45;
      }
    } else if (i === 1) {
      // Tomorrow estimation: afternoon convection shift
      rainChance = isNatureReserve ? 55 : isCoastal ? 35 : 45;
    } else {
      // Day 3 estimation
      rainChance = ((dayIndex * 17 + 23) % 45) + (isCoastal ? 15 : 25);
    }

    const rainTier = getRainTier(rainChance);

    let condition = 'Partly Cloudy & Breezy';
    let icon = 'partly_cloudy_day';
    let tempMax = Math.round(baseTemp + (i === 0 ? 0 : i === 1 ? 1 : -1));
    let tempMin = Math.round(tempMax - (isCoastal ? 5 : 6));
    let description = '';

    if (rainTier === 'High') {
      condition = isCoastal ? 'Thundery Coastal Showers' : 'Afternoon Thundery Downpours';
      icon = 'thunderstorm';
      tempMax = Math.min(tempMax, 30);
      tempMin = 24;
      description = 'Moderate to heavy thundery showers expected in the afternoon with gusty winds. Seek sheltered boardwalks.';
    } else if (rainTier === 'Medium') {
      condition = isCoastal ? 'Passing Ocean Showers' : 'Passing Midday Showers';
      icon = 'rainy';
      tempMax = Math.min(tempMax, 32);
      tempMin = 25;
      description = 'Brief localized showers between 2:00 PM and 4:30 PM. Clear skies during early morning and evening.';
    } else {
      condition = isCoastal ? 'Sunny & Sea Breeze' : 'Fair & Sunny';
      icon = 'wb_sunny';
      tempMax = Math.max(tempMax, 32);
      tempMin = 26;
      description = 'Ideal weather for outdoor trails, jogging, cycling, and family picnics with comfortable breezes.';
    }

    const uvMax = rainTier === 'High' ? 6 : rainTier === 'Medium' ? 8 : 10;
    const bestWindow = rainTier === 'High' ? '07:30 AM - 10:30 AM' : '04:30 PM - 07:00 PM';
    const humidity = rainTier === 'High' ? 88 : rainTier === 'Medium' ? 78 : 68;
    const windSpeed = isCoastal ? '15 km/h SE' : '10 km/h NE';

    forecasts.push({
      date: dateFormatted,
      dayName,
      tempMin,
      tempMax,
      minTemp: tempMin,
      maxTemp: tempMax,
      rainChance,
      rainProbability: rainChance,
      rainTier,
      condition,
      icon,
      conditionIcon: icon,
      uvMax,
      bestWindow,
      description,
      humidity,
      windSpeed
    });
  }

  return forecasts;
}

/**
 * Generates a 7-day projection outlook for the park starting from current Singapore date.
 */
export function getPark7DayForecast(park: Park): DailyForecast[] {
  const forecasts: DailyForecast[] = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const now = getSingaporeNow();
  const isCoastal = park.region === 'East' || park.region === 'South' || park.region === 'Islands';
  const isNatureReserve = park.category === 'Nature Reserve' || park.category === 'Ecological & Wetland';
  const baseTemp = park.currentTemp || 31;

  for (let i = 0; i < 7; i++) {
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const dayIndex = target.getDay();

    const dateFormatted = target.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[dayIndex];

    let rainChance = 20 + ((dayIndex * 13 + (isNatureReserve ? 15 : 0)) % 65);
    if (i === 0 && park.rainProbability && park.rainProbability.length > 0) {
      const avgTodayRain = Math.round(
        park.rainProbability.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / park.rainProbability.length
      );
      rainChance = avgTodayRain;
    }

    const rainTier = getRainTier(rainChance);

    let condition = 'Partly Cloudy';
    let icon = 'partly_cloudy_day';
    let tempMax = baseTemp + (i % 2);
    let tempMin = baseTemp - 5;

    if (rainTier === 'High') {
      condition = isCoastal ? 'Thundery Showers' : 'Afternoon Heavy Downpour';
      icon = 'thunderstorm';
      tempMax = 30;
      tempMin = 24;
    } else if (rainTier === 'Medium') {
      condition = 'Passing Afternoon Showers';
      icon = 'rainy';
      tempMax = 31;
      tempMin = 25;
    } else {
      condition = 'Sunny & Breezy';
      icon = 'wb_sunny';
      tempMax = 33;
      tempMin = 26;
    }

    const uvMax = rainTier === 'High' ? 6 : rainTier === 'Medium' ? 8 : 10;
    const bestWindow = rainTier === 'High' ? '07:30 AM - 10:30 AM' : '04:30 PM - 07:00 PM';

    forecasts.push({
      date: dateFormatted,
      dayName,
      tempMin,
      tempMax,
      minTemp: tempMin,
      maxTemp: tempMax,
      rainChance,
      rainProbability: rainChance,
      rainTier,
      condition,
      icon,
      conditionIcon: icon,
      uvMax,
      bestWindow,
      description: `${condition} across ${park.name}. Best visiting time around ${bestWindow}.`
    });
  }

  return forecasts;
}

/**
 * On-demand simulation model for user date & time input (Feature B)
 * Max 1 week away.
 */
export function calculateOnDemandProjection(
  park: Park,
  targetDateStr: string,
  targetTimeStr: string
): WeatherProjectionResult {
  const [yearStr, monthStr, dateStr] = targetDateStr.split('-');
  const [hourStr, minuteStr = '0'] = targetTimeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const now = getSingaporeNow();
  
  const targetDate = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, parseInt(dateStr, 10));
  
  // Day offset from today in Singapore
  const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = targetDate.getTime() - todayZero.getTime();
  const dayOffset = Math.max(0, Math.min(7, Math.round(diffTime / (1000 * 60 * 60 * 24))));

  const isCoastal = park.region === 'East' || park.region === 'South';
  const isNatureReserve = park.category === 'Nature Reserve';

  // Base climate parameters for Singapore
  // Diurnal temp cycle: Peak 14:00 - 15:30 (32-34°C), Night 03:00 - 07:00 (25-26°C)
  let baseTemp = 26;
  if (hour >= 7 && hour < 11) baseTemp = 28 + (hour - 7) * 1;
  else if (hour >= 11 && hour <= 15) baseTemp = 32 + (hour === 14 ? 1 : 0);
  else if (hour > 15 && hour <= 19) baseTemp = 31 - (hour - 15) * 0.8;
  else baseTemp = 27;

  // Rain probability simulation based on tropical convection:
  // Convection peak occurs 14:00 - 17:30 in Singapore
  let rainChance = 15;
  if (hour >= 13 && hour <= 17) {
    rainChance = isCoastal ? 35 + ((dayOffset * 7) % 30) : 55 + ((dayOffset * 9) % 35);
  } else if (hour >= 7 && hour <= 11) {
    rainChance = isCoastal ? 25 + ((dayOffset * 5) % 20) : 10;
  } else if (hour >= 18 && hour <= 21) {
    rainChance = 20;
  } else {
    rainChance = 10;
  }

  // Cap rainChance
  rainChance = Math.min(95, Math.max(5, Math.round(rainChance)));
  const rainTier = getRainTier(rainChance);

  // Humidity inverse to temperature
  let humidity = Math.round(92 - (baseTemp - 24) * 2.5);
  if (rainTier === 'High') humidity = Math.min(96, humidity + 12);

  // Calculate Feels-Like
  const feelsLike = Math.round(baseTemp + (humidity > 70 ? (humidity - 70) * 0.15 : 0) + (hour >= 11 && hour <= 15 ? 2.5 : 0));

  // UV index
  let uvIndex = 0;
  if (hour >= 10 && hour <= 16) {
    uvIndex = rainTier === 'High' ? 4 : rainTier === 'Medium' ? 7 : 9;
  } else if ((hour >= 8 && hour < 10) || (hour > 16 && hour <= 18)) {
    uvIndex = 3;
  } else {
    uvIndex = 0;
  }

  // Condition description & icon
  let condition = 'Partly Cloudy';
  let icon = 'partly_cloudy_day';

  if (rainTier === 'High') {
    condition = hour >= 13 && hour <= 17 ? 'Thundery Downpour' : 'Moderate Tropical Rain';
    icon = 'thunderstorm';
  } else if (rainTier === 'Medium') {
    condition = 'Scattered Passing Showers';
    icon = 'rainy';
  } else if (hour >= 19 || hour < 7) {
    condition = 'Clear Tropical Night';
    icon = 'nights_stay';
  } else if (uvIndex >= 8) {
    condition = 'Bright & Sunny';
    icon = 'wb_sunny';
  }

  // Heat Stress
  let heatStressScore = Math.min(98, Math.round(feelsLike * 2.2));
  let heatStressLevel: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  if (heatStressScore > 80 || feelsLike >= 36) heatStressLevel = 'Very High';
  else if (heatStressScore > 65 || feelsLike >= 33) heatStressLevel = 'High';
  else if (heatStressScore < 45) heatStressLevel = 'Low';

  // Custom actionable recommendation
  let recommendation = '';
  let bestAlternateWindow = '';

  if (rainTier === 'High') {
    recommendation = `High downpour risk (${rainChance}%). Heavy rain expected around ${targetTimeStr}. We recommend bringing sturdy rain gear or scheduling around ${hour < 12 ? 'late morning (10:00 AM)' : 'early morning (08:00 AM)'}.`;
    bestAlternateWindow = hour < 12 ? '10:00 AM - 12:00 PM' : '07:30 AM - 09:30 AM';
  } else if (heatStressLevel === 'Very High' || uvIndex >= 8) {
    recommendation = `High thermal load (Feels like ${feelsLike}°C, UV ${uvIndex}). Stay well-hydrated (600ml/hr) and choose shaded trails like the canopy walk or lakeside gazebos.`;
    bestAlternateWindow = '05:00 PM - 07:15 PM';
  } else if (rainTier === 'Low' && baseTemp <= 30) {
    recommendation = `Excellent conditions for visiting ${park.name}! Low rain probability and comfortable breeze. Ideal for outdoor running, cycling, or picnics.`;
    bestAlternateWindow = 'Current target time is optimal';
  } else {
    recommendation = `Good overall visiting window with mild humidity. Keep a lightweight umbrella handy in case of localized cloud buildup.`;
    bestAlternateWindow = '04:30 PM - 06:45 PM';
  }

  const confidenceScore = Math.max(72, Math.round(96 - dayOffset * 3.5));

  return {
    targetDate: targetDateStr,
    targetTime: targetTimeStr,
    parkName: park.name,
    projectedTemp: Math.round(baseTemp),
    projectedFeelsLike: feelsLike,
    rainChance,
    rainTier,
    condition,
    icon,
    uvIndex,
    humidity,
    windSpeed: isCoastal ? '16 km/h SE' : '10 km/h E',
    heatStressScore,
    heatStressLevel,
    recommendation,
    bestAlternateWindow,
    confidenceScore
  };
}
