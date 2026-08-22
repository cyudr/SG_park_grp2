/**
 * Utility functions for Singapore Time (SGT, UTC+8) and real-time temporal calculations.
 * Ensures consistent, timezone-accurate timestamps across data feeds, solar calculations,
 * rain probability trends, historical telemetry, and meteorological simulations.
 * Singapore is strictly UTC+8 year-round with no Daylight Saving Time.
 */

export interface SingaporeDateTimeParts {
  year: number;
  month: number; // 1 - 12
  day: number; // 1 - 31
  hours: number; // 0 - 23
  minutes: number; // 0 - 59
  seconds: number; // 0 - 59
}

/**
 * Returns exact Singapore time parts (UTC+8) from any Date object (or current moment).
 */
export function getSingaporeParts(date: Date = new Date()): SingaporeDateTimeParts {
  const sgMs = date.getTime() + (8 * 60 * 60 * 1000);
  const sgUtc = new Date(sgMs);
  return {
    year: sgUtc.getUTCFullYear(),
    month: sgUtc.getUTCMonth() + 1,
    day: sgUtc.getUTCDate(),
    hours: sgUtc.getUTCHours(),
    minutes: sgUtc.getUTCMinutes(),
    seconds: sgUtc.getUTCSeconds()
  };
}

/**
 * Returns current hour (0-23) in Singapore Time.
 */
export function getSingaporeHour(date: Date = new Date()): number {
  return getSingaporeParts(date).hours;
}

/**
 * Returns current minute (0-59) in Singapore Time.
 */
export function getSingaporeMinute(date: Date = new Date()): number {
  return getSingaporeParts(date).minutes;
}

/**
 * Returns current date string formatted as YYYY-MM-DD in Singapore Time.
 */
export function getSingaporeDateISO(date: Date = new Date()): string {
  const p = getSingaporeParts(date);
  const month = String(p.month).padStart(2, '0');
  const day = String(p.day).padStart(2, '0');
  return `${p.year}-${month}-${day}`;
}

/**
 * Returns a Date object representing the current instant adjusted to Singapore Local Time components.
 */
export function getSingaporeNow(): Date {
  const p = getSingaporeParts(new Date());
  return new Date(p.year, p.month - 1, p.day, p.hours, p.minutes, p.seconds);
}

/**
 * Converts any given Date object into Singapore Local Time components.
 */
export function getSingaporeDate(date: Date = new Date()): Date {
  const p = getSingaporeParts(date);
  return new Date(p.year, p.month - 1, p.day, p.hours, p.minutes, p.seconds);
}

/**
 * Formats a Date object in Singapore Time.
 */
export function formatSingaporeTime(date: Date = new Date(), options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleTimeString('en-SG', {
    timeZone: 'Asia/Singapore',
    ...options
  });
}

/**
 * Formats a date string with Singapore locale and timezone.
 */
export function formatSingaporeDate(date: Date = new Date(), options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString('en-SG', {
    timeZone: 'Asia/Singapore',
    ...options
  });
}

/**
 * Formats hour and minute into a 12-hour AM/PM string (e.g. "1:00 AM", "1:05 PM", "12:00 PM").
 */
export function formatTime12H(hours: number, minutes: number = 0, padHour: boolean = false): string {
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const hourStr = padHour ? String(h12).padStart(2, '0') : String(h12);
  return `${hourStr}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

/**
 * Returns formatted current Singapore local time in 12-hour AM/PM format (e.g. "1:05 AM", "2:14 PM").
 */
export function formatSingaporeLiveTime12H(date: Date = new Date(), includeSeconds: boolean = false): string {
  const parts = getSingaporeParts(date);
  const ampm = parts.hours >= 12 ? 'PM' : 'AM';
  const h12 = parts.hours % 12 || 12;
  const mm = String(parts.minutes).padStart(2, '0');
  if (includeSeconds) {
    const ss = String(parts.seconds).padStart(2, '0');
    return `${h12}:${mm}:${ss} ${ampm}`;
  }
  return `${h12}:${mm} ${ampm}`;
}

/**
 * Formats hour and minute into a 24-hour string (e.g. "01:00", "14:00").
 */
export function formatTime24H(hours: number, minutes: number = 0): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
