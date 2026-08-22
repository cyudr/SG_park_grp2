import React from 'react';
import { useGovWeather } from '../context/GovWeatherContext';
import { useLanguage } from '../context/LanguageContext';
import { ViewModeSwitcher, ViewMode } from './ViewModeSwitcher';
import { LanguageSelector } from './LanguageSelector';

interface ApiStatusBarProps {
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
}

export const ApiStatusBar: React.FC<ApiStatusBarProps> = ({
  viewMode,
  onToggleViewMode
}) => {
  const {
    refreshNow,
    isRefreshing,
    lastRefreshedDate,
    autoRefreshEnabled,
    setAutoRefreshEnabled,
    countdownSeconds
  } = useGovWeather();

  const { t } = useLanguage();

  const formattedTime = lastRefreshedDate.toLocaleTimeString('en-SG', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      className="relative z-50 bg-[#003421] text-white/90 text-xs px-2 sm:px-4 py-1 border-b border-[#004d31] shadow-inner select-none"
      id="main-scheduler-bar"
    >
      <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-1.5 sm:gap-3 flex-nowrap">
        
        {/* Left side: Background Scheduler status with pause/play */}
        <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
          <button
            onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
            className="flex items-center gap-1 bg-black/20 hover:bg-black/35 text-white/90 hover:text-white px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer"
            title={autoRefreshEnabled ? "Pause automatic 30s background scheduler" : "Resume automatic 30s background scheduler"}
            id="scheduler-toggle-btn"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoRefreshEnabled ? 'bg-[#71dba6] animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="font-semibold hidden xs:inline">{t('scheduler.label', '30s Scheduler')}:</span>
            <strong className={`font-mono ${autoRefreshEnabled ? 'text-[#71dba6]' : 'text-amber-300'}`}>
              {autoRefreshEnabled ? `${countdownSeconds}s` : t('scheduler.paused', 'Paused')}
            </strong>
          </button>

          <span className="text-white/40 text-[10px] hidden md:inline">
            ({t('scheduler.synced', 'Synced')} {formattedTime})
          </span>
        </div>

        {/* Right side: View Switcher, Language Selector, & Manual Refresh (All in a single line, no indicators cutting off) */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0 whitespace-nowrap">
          {/* Clean View Mode Switcher (no extra labels) */}
          <ViewModeSwitcher
            viewMode={viewMode}
            onToggleViewMode={onToggleViewMode}
          />

          {/* Clean Language Selector */}
          <LanguageSelector variant="compact" />

          {/* Manual Refresh Button */}
          <button
            onClick={() => refreshNow()}
            disabled={isRefreshing}
            className={`flex items-center gap-1 bg-[#006b47] hover:bg-[#00875a] text-white px-2 sm:px-2.5 py-0.5 rounded-md font-semibold text-[10px] sm:text-[11px] transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap ${
              isRefreshing ? 'opacity-80' : ''
            }`}
            title="Refresh Live Weather Data (or press 'R' key)"
            id="manual-refresh-btn"
          >
            <span className={`material-symbols-outlined text-[13px] ${isRefreshing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span className="hidden xs:inline">{t('scheduler.refresh', 'Refresh')}</span>
            <kbd className="hidden md:inline-block bg-black/30 text-[#71dba6] text-[9px] px-1 py-0.2 rounded font-mono font-bold">
              R
            </kbd>
          </button>
        </div>

      </div>
    </div>
  );
};
