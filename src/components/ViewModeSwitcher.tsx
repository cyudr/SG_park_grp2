import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export type ViewMode = 'mobile' | 'desktop';

interface ViewModeSwitcherProps {
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  className?: string;
  variant?: 'compact' | 'standard';
}

export const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({
  viewMode,
  onToggleViewMode,
  className = '',
  variant: _variant = 'standard'
}) => {
  const { t } = useLanguage();

  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-md bg-black/25 backdrop-blur-xs border border-white/15 shadow-inner whitespace-nowrap ${className}`}
      id="view-mode-switcher"
      role="group"
      aria-label="Display View Mode Switcher"
    >
      <button
        onClick={() => onToggleViewMode('mobile')}
        className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-sm text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
          viewMode === 'mobile'
            ? 'bg-[#71dba6] text-[#003824] shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        title={t('view.switchToMobile', 'Switch to Touch-Optimized Mobile View')}
        id="view-mode-mobile-btn"
      >
        <span className="material-symbols-outlined text-[11px] sm:text-[12px] leading-none">phone_iphone</span>
        <span className="leading-none">{t('view.mobile', 'Mobile')}</span>
      </button>

      <button
        onClick={() => onToggleViewMode('desktop')}
        className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-sm text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
          viewMode === 'desktop'
            ? 'bg-[#71dba6] text-[#003824] shadow-xs'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        title={t('view.switchToDesktop', 'Switch to Full Multi-Column Desktop Grid View')}
        id="view-mode-desktop-btn"
      >
        <span className="material-symbols-outlined text-[11px] sm:text-[12px] leading-none">desktop_windows</span>
        <span className="leading-none">{t('view.desktop', 'Desktop')}</span>
      </button>
    </div>
  );
};
