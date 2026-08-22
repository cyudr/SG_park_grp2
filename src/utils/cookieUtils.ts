/**
 * Cookie Management & Persistence Utilities
 * Complies with Singapore PDPA & Web Standards for functional/preference cookies.
 */

const DEFAULT_EXPIRY_DAYS = 365;

export const setCookie = (name: string, value: string, days: number = DEFAULT_EXPIRY_DAYS): void => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    document.cookie = cookieString;
    
    // Also mirror to localStorage as fallback
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(name, value);
    }
  } catch (err) {
    console.warn('Cookie set error:', err);
  }
};

export const getCookie = (name: string): string | null => {
  try {
    if (typeof document === 'undefined') return null;
    const nameEQ = encodeURIComponent(name) + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    
    // Fallback to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(name);
    }
  } catch (err) {
    console.warn('Cookie get error:', err);
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  try {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(name);
    }
  } catch (err) {
    console.warn('Cookie delete error:', err);
  }
};

// Typed helpers for App Preferences
export const COOKIE_KEYS = {
  SELECTED_PARK: 'sg_park_selected',
  FAVORITES: 'sg_park_favorites',
  RAIN_TREND_MODE: 'sg_park_rain_trend_mode',
  MAP_PREF: 'sg_park_map_pref',
  VIEW_MODE: 'sg_park_view_mode',
  COOKIE_CONSENT: 'sg_park_cookie_consent',
  LANGUAGE: 'sg_park_language'
} as const;

export type SupportedLanguage = 'en' | 'zh' | 'ms' | 'ta' | 'ko' | 'ja';

export const getSavedLanguage = (): SupportedLanguage | null => {
  const lang = getCookie(COOKIE_KEYS.LANGUAGE) as SupportedLanguage | null;
  if (lang && ['en', 'zh', 'ms', 'ta', 'ko', 'ja'].includes(lang)) {
    return lang;
  }
  return null;
};

export const saveLanguageToCookie = (lang: SupportedLanguage): void => {
  setCookie(COOKIE_KEYS.LANGUAGE, lang);
};

export const detectSystemLanguage = (): SupportedLanguage => {
  try {
    if (typeof window === 'undefined' || !window.navigator) return 'en';
    
    // Inspect ONLY the user's primary system/browser language
    const primary = (
      (window.navigator.languages && window.navigator.languages.length > 0 ? window.navigator.languages[0] : null) ||
      window.navigator.language ||
      'en'
    ).toLowerCase().trim();
    
    // If primary language is English (e.g. 'en', 'en-US', 'en-GB', 'en-SG'), strictly return 'en'
    if (primary.startsWith('en')) {
      return 'en';
    }
    
    // Only apply non-English if the primary detected language matches
    if (primary.startsWith('zh')) return 'zh';
    if (primary.startsWith('ms') || primary.startsWith('id')) return 'ms';
    if (primary.startsWith('ta')) return 'ta';
    if (primary.startsWith('ko')) return 'ko';
    if (primary.startsWith('ja')) return 'ja';
  } catch (e) {
    console.warn('System language detection failed:', e);
  }
  return 'en';
};

export const getSavedViewMode = (): 'mobile' | 'desktop' | null => {
  const mode = getCookie(COOKIE_KEYS.VIEW_MODE);
  if (mode === 'mobile' || mode === 'desktop') return mode;
  return null;
};

export const saveViewModeToCookie = (mode: 'mobile' | 'desktop'): void => {
  setCookie(COOKIE_KEYS.VIEW_MODE, mode);
};

export const getSavedCookieConsent = (): boolean => {
  return getCookie(COOKIE_KEYS.COOKIE_CONSENT) === 'accepted';
};

export const saveCookieConsent = (accepted: boolean): void => {
  setCookie(COOKIE_KEYS.COOKIE_CONSENT, accepted ? 'accepted' : 'declined');
};

export const getSavedFavorites = (): string[] => {
  const raw = getCookie(COOKIE_KEYS.FAVORITES);
  if (!raw) return ['bishan-ang-mo-kio', 'macritchie']; // Initial sensible default
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ['bishan-ang-mo-kio'];
  } catch {
    return raw.split(',').filter(Boolean);
  }
};

export const saveFavoritesToCookie = (favorites: string[]): void => {
  setCookie(COOKIE_KEYS.FAVORITES, JSON.stringify(favorites));
};

export const getSavedSelectedPark = (): string | null => {
  try {
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlPark = urlParams.get('park');
      if (urlPark) return urlPark;
    }
  } catch (e) {
    // ignore
  }

  // Check default home park preference
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const defaultPark = window.localStorage.getItem('sg_parkweather_default_park');
      if (defaultPark) return defaultPark;
    }
  } catch (e) {
    // ignore
  }

  return getCookie(COOKIE_KEYS.SELECTED_PARK);
};

export const saveSelectedParkToCookie = (parkId: string): void => {
  setCookie(COOKIE_KEYS.SELECTED_PARK, parkId);
};
