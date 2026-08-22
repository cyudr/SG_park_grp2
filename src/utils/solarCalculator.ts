/**
 * Solar Times & Astronomical Calculation for Singapore & Park Coordinates
 * Accurate NOAA solar position algorithm adapted for Singapore (UTC+8, ~1.35°N).
 */

import { getSingaporeDate } from './timeUtils';

export interface SolarInfo {
  sunrise: Date;
  sunset: Date;
  dawn: Date; // Civil twilight start (~20 mins before sunrise)
  dusk: Date; // Civil twilight end (~20 mins after sunset)
  solarNoon: Date;
  isDaytime: boolean;
  isGoldenHour: boolean;
  nextEvent: 'sunrise' | 'sunset';
  nextEventTime: Date;
  timeUntilNextEventFormatted: string; // e.g. "2h 15m" or "42m"
  sunriseFormatted: string; // e.g. "07:05 AM"
  sunsetFormatted: string; // e.g. "07:16 PM"
  dawnFormatted: string;
  duskFormatted: string;
  solarNoonFormatted: string;
  goldenHourFormatted: string; // e.g. "06:30 PM - 07:16 PM"
  dayProgressPercent: number; // 0 to 100
  statusText: string; // e.g. "Sunset in 2h 15m (07:16 PM)"
  subText: string; // e.g. "Golden hour starts in 1h 30m" or "Ideal evening breeze"
}

/**
 * Calculates solar times for a given date and coordinates accurately in Singapore Local Time (SGT, UTC+8).
 */
export function getSolarTimes(
  date: Date = new Date(),
  lat: number = 1.3521,
  lng: number = 103.8198
): SolarInfo {
  // Convert target date to Singapore Local Time (UTC+8)
  const now = getSingaporeDate(date);
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // Day of Year
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Fractional year in radians
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + (now.getHours() - 12) / 24);

  // Equation of time in minutes
  const eqtime = 229.18 * (
    0.000075 +
    0.001868 * Math.cos(gamma) -
    0.032077 * Math.sin(gamma) -
    0.014615 * Math.cos(2 * gamma) -
    0.040849 * Math.sin(2 * gamma)
  );

  // Solar declination angle in radians
  const decl = 0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = lat * (Math.PI / 180);
  const zenith = 90.833 * (Math.PI / 180); // Official zenith for sunrise/sunset

  // Hour angle
  const cosH = (Math.cos(zenith) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
  const clampedCosH = Math.max(-1, Math.min(1, cosH));
  const H = Math.acos(clampedCosH) * (180 / Math.PI); // in degrees

  // Solar noon in minutes from midnight UTC
  const solarNoonUTC = 720 - (4 * lng) - eqtime;
  
  // Sunrise and sunset in minutes from midnight UTC
  const sunriseMinutesUTC = solarNoonUTC - (H * 4);
  const sunsetMinutesUTC = solarNoonUTC + (H * 4);

  // Local Singapore offset (UTC+8 = +480 minutes)
  const tzOffsetMinutes = 480; 

  const solarNoonMinutesLocal = (solarNoonUTC + tzOffsetMinutes + 1440) % 1440;
  const solarNoonHours = Math.floor(solarNoonMinutesLocal / 60);
  const solarNoonMins = Math.floor(solarNoonMinutesLocal % 60);
  const todaySolarNoon = new Date(year, month, day, solarNoonHours, solarNoonMins, 0);

  const sunriseMinutesLocal = (sunriseMinutesUTC + tzOffsetMinutes + 1440) % 1440;
  const sunsetMinutesLocal = (sunsetMinutesUTC + tzOffsetMinutes + 1440) % 1440;

  const sunriseHours = Math.floor(sunriseMinutesLocal / 60);
  const sunriseMins = Math.floor(sunriseMinutesLocal % 60);

  const sunsetHours = Math.floor(sunsetMinutesLocal / 60);
  const sunsetMins = Math.floor(sunsetMinutesLocal % 60);

  const todaySunrise = new Date(year, month, day, sunriseHours, sunriseMins, 0);
  const todaySunset = new Date(year, month, day, sunsetHours, sunsetMins, 0);
  
  const dawn = new Date(todaySunrise.getTime() - 22 * 60 * 1000);
  const dusk = new Date(todaySunset.getTime() + 22 * 60 * 1000);

  const nowMs = now.getTime();
  const isDaytime = nowMs >= todaySunrise.getTime() && nowMs <= todaySunset.getTime();

  // Next event determination
  let nextEvent: 'sunrise' | 'sunset';
  let nextEventTime: Date;

  if (nowMs < todaySunrise.getTime()) {
    // Before today's sunrise
    nextEvent = 'sunrise';
    nextEventTime = todaySunrise;
  } else if (nowMs <= todaySunset.getTime()) {
    // Daytime -> Next is sunset
    nextEvent = 'sunset';
    nextEventTime = todaySunset;
  } else {
    // After sunset -> Next is tomorrow's sunrise
    nextEvent = 'sunrise';
    nextEventTime = new Date(todaySunrise.getTime() + 24 * 60 * 60 * 1000);
  }

  // Time remaining
  const diffMs = Math.max(0, nextEventTime.getTime() - nowMs);
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let timeUntilNextEventFormatted = '';
  if (diffHours > 0) {
    timeUntilNextEventFormatted = `${diffHours}h ${diffMins}m`;
  } else {
    timeUntilNextEventFormatted = `${diffMins}m`;
  }

  const format12H = (d: Date) => {
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const sunriseFormatted = format12H(todaySunrise);
  const sunsetFormatted = format12H(todaySunset);
  const dawnFormatted = format12H(dawn);
  const duskFormatted = format12H(dusk);
  const solarNoonFormatted = format12H(todaySolarNoon);

  // Golden hour: 45 minutes before sunset, or 45 minutes after sunrise
  const morningGoldenEnd = new Date(todaySunrise.getTime() + 45 * 60 * 1000);
  const eveningGoldenStart = new Date(todaySunset.getTime() - 45 * 60 * 1000);
  const isGoldenHour = (nowMs >= todaySunrise.getTime() && nowMs <= morningGoldenEnd.getTime()) ||
                      (nowMs >= eveningGoldenStart.getTime() && nowMs <= todaySunset.getTime());

  const goldenHourFormatted = `${format12H(eveningGoldenStart)} - ${sunsetFormatted}`;

  // Day progress percentage (0% at sunrise to 100% at sunset)
  let dayProgressPercent = 0;
  const totalDaylightMs = todaySunset.getTime() - todaySunrise.getTime();
  if (nowMs < todaySunrise.getTime()) {
    dayProgressPercent = 0;
  } else if (nowMs > todaySunset.getTime()) {
    dayProgressPercent = 100;
  } else {
    dayProgressPercent = Math.min(100, Math.max(0, Math.round(((nowMs - todaySunrise.getTime()) / totalDaylightMs) * 100)));
  }

  let statusText = '';
  let subText = '';
  if (nextEvent === 'sunset') {
    statusText = `Sunset in ${timeUntilNextEventFormatted} (${sunsetFormatted})`;
    if (isGoldenHour) {
      subText = '✨ Golden Hour now active (prime photography light)';
    } else {
      const msToGolden = eveningGoldenStart.getTime() - nowMs;
      if (msToGolden > 0 && msToGolden < 2 * 60 * 60 * 1000) {
        const ghHours = Math.floor(msToGolden / (1000 * 60 * 60));
        const ghMins = Math.floor((msToGolden % (1000 * 60 * 60)) / (1000 * 60));
        subText = `Golden hour in ${ghHours > 0 ? `${ghHours}h ` : ''}${ghMins}m (${format12H(eveningGoldenStart)})`;
      } else {
        subText = `Sunrise was at ${sunriseFormatted} • ${dayProgressPercent}% daylight elapsed`;
      }
    }
  } else {
    statusText = `Sunrise in ${timeUntilNextEventFormatted} (${format12H(nextEventTime)})`;
    subText = `Sunset was at ${sunsetFormatted} • Evening park lighting on`;
  }

  return {
    sunrise: todaySunrise,
    sunset: todaySunset,
    dawn,
    dusk,
    solarNoon: todaySolarNoon,
    isDaytime,
    isGoldenHour,
    nextEvent,
    nextEventTime,
    timeUntilNextEventFormatted,
    sunriseFormatted,
    sunsetFormatted,
    dawnFormatted,
    duskFormatted,
    solarNoonFormatted,
    goldenHourFormatted,
    dayProgressPercent,
    statusText,
    subText
  };
}
