import { useState, useEffect } from 'react';

export interface WindowDimensions {
  width: number;
  height: number;
  isMobile: boolean; // < 640px
  isTablet: boolean; // 640px - 1024px
  isDesktop: boolean; // >= 1024px
  isWide: boolean; // >= 1440px
  aspectRatio: number;
  orientation: 'portrait' | 'landscape';
  devicePixelRatio: number;
}

export function useWindowSize(): WindowDimensions {
  const getDimensions = (): WindowDimensions => {
    if (typeof window === 'undefined') {
      return {
        width: 1200,
        height: 800,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isWide: false,
        aspectRatio: 1.5,
        orientation: 'landscape',
        devicePixelRatio: 1
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      width,
      height,
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
      isWide: width >= 1440,
      aspectRatio: width / Math.max(1, height),
      orientation: width >= height ? 'landscape' : 'portrait',
      devicePixelRatio: window.devicePixelRatio || 1
    };
  };

  const [windowSize, setWindowSize] = useState<WindowDimensions>(getDimensions);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      // Debounce slightly to maintain 60fps performance on rapid window drags
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(getDimensions());
      }, 50);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return windowSize;
}
