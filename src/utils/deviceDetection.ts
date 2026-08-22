export type DevicePlatform = 'ios' | 'android' | 'mac' | 'windows' | 'other';

export interface DeviceInfo {
  platform: DevicePlatform;
  isMobile: boolean;
  isStandalone: boolean;
  browserName: string;
  buttonLabel: string;
  buttonIcon: string;
  actionTitle: string;
}

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      platform: 'other',
      isMobile: false,
      isStandalone: false,
      browserName: 'browser',
      buttonLabel: 'Save App / Shortcut',
      buttonIcon: 'bookmark_add',
      actionTitle: 'Save SG ParkWeather'
    };
  }

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const isStandalone = 
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true ||
    document.referrer.includes('android-app://');

  const isiOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(ua) && !isiOS;
  const isWindows = /Win32|Win64|Windows|WinCE/.test(ua);

  let browserName = 'Browser';
  if (/Chrome|CriOS/i.test(ua) && !/Edg/i.test(ua)) browserName = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) browserName = 'Safari';
  else if (/Edg/i.test(ua)) browserName = 'Edge';
  else if (/Firefox|FxiOS/i.test(ua)) browserName = 'Firefox';
  else if (/SamsungBrowser/i.test(ua)) browserName = 'Samsung Internet';

  if (isiOS) {
    return {
      platform: 'ios',
      isMobile: true,
      isStandalone,
      browserName,
      buttonLabel: isStandalone ? 'App Active' : 'Save as Web App',
      buttonIcon: isStandalone ? 'check_circle' : 'install_mobile',
      actionTitle: 'Add to Home Screen (iOS)'
    };
  }

  if (isAndroid) {
    return {
      platform: 'android',
      isMobile: true,
      isStandalone,
      browserName,
      buttonLabel: isStandalone ? 'App Active' : 'Install Web App',
      buttonIcon: isStandalone ? 'check_circle' : 'install_mobile',
      actionTitle: 'Install Web App (Android)'
    };
  }

  if (isMac) {
    return {
      platform: 'mac',
      isMobile: false,
      isStandalone,
      browserName,
      buttonLabel: 'Save Bookmark / App',
      buttonIcon: 'bookmark_add',
      actionTitle: 'Save to Mac / Bookmarks'
    };
  }

  if (isWindows) {
    return {
      platform: 'windows',
      isMobile: false,
      isStandalone,
      browserName,
      buttonLabel: 'Save App / Favorite',
      buttonIcon: 'bookmark_add',
      actionTitle: 'Save Shortcut / Bookmark'
    };
  }

  return {
    platform: 'other',
    isMobile: false,
    isStandalone,
    browserName,
    buttonLabel: 'Save Shortcut',
    buttonIcon: 'bookmark_add',
    actionTitle: 'Save SG ParkWeather'
  };
}
