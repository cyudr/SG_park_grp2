import React, { useState } from 'react';
import { Park, ParkAlert, AppTab } from '../types';
import { useGovWeather } from '../context/GovWeatherContext';
import { useLanguage } from '../context/LanguageContext';
import { ParkDirectoryModal } from './ParkDirectoryModal';
import { ViewMode } from './ViewModeSwitcher';
import { SaveAppShortcutModal } from './SaveAppShortcutModal';
import { detectDevice } from '../utils/deviceDetection';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  currentPark: Park;
  onSelectPark: (parkId: string) => void;
  onOpenQrPass: () => void;
  alerts: ParkAlert[];
  viewMode?: ViewMode;
  onToggleViewMode?: (mode: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentPark,
  onSelectPark,
  onOpenQrPass,
  alerts,
  viewMode: _viewMode,
  onToggleViewMode: _onToggleViewMode
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showParkModal, setShowParkModal] = useState(false);
  const [showShortcutModal, setShowShortcutModal] = useState(false);

  const { 
    userLocation,
    requestUserLocation,
    isLocatingUser,
    favoriteParkIds,
    isFavorite,
    toggleFavorite
  } = useGovWeather();

  const { t } = useLanguage();
  const device = detectDevice();

  const isCurrentFav = isFavorite(currentPark.id);

  const handleInstallAppClick = async () => {
    const promptEvent = (window as any).__deferredInstallPrompt;
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          (window as any).__deferredInstallPrompt = null;
          return;
        }
      } catch (err) {
        console.warn('Install prompt failed:', err);
      }
    }
    setShowShortcutModal(true);
  };

  return (
    <header className="bg-[#f7faf8]/95 backdrop-blur-xl sticky top-0 z-40 border-b border-[#bdcac0]/40 shadow-xs transition-colors">
      <div className="flex justify-between items-center px-3 sm:px-6 py-2 w-full max-w-[1180px] mx-auto">
        
        {/* Brand Logo & Park Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('parks')}
            className="flex items-center gap-1.5 font-bold text-lg text-[#006b47] tracking-tight hover:opacity-85 transition-opacity cursor-pointer text-left"
            id="brand-home-btn"
          >
            <span className="material-symbols-outlined text-[24px] text-[#006b47]">forest</span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base font-extrabold text-[#005235]">SG ParkWeather</span>
              <span className="text-[9px] text-[#006b47]/80 font-medium hidden xs:inline tracking-normal">
                Live Government Feeds
              </span>
            </div>
          </button>

          {/* Interactive Park Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowParkModal(true)}
              className="flex items-center gap-1.5 pl-2.5 pr-2 py-1 bg-[#eef5f0] hover:bg-[#e1ece4] active:bg-[#d5e3d9] text-[#005235] rounded-full text-xs font-semibold border border-[#006b47]/20 transition-all cursor-pointer shadow-2xs group"
              title="Click to search all 24 Singapore Parks & Nature Reserves across 5 Regions"
              id="park-selector-pill-btn"
            >
              <span className="material-symbols-outlined text-[15px] text-[#006b47]">park</span>
              <span className="max-w-[110px] sm:max-w-[160px] md:max-w-[200px] truncate">
                {currentPark.name}
              </span>
              {isCurrentFav && (
                <span className="material-symbols-outlined text-[13px] text-amber-500 fill-current">star</span>
              )}
              <span className="material-symbols-outlined text-[15px] text-[#556258] group-hover:translate-y-0.5 transition-transform">
                expand_more
              </span>
            </button>
          </div>

          {/* Geolocation Quick Locate Button */}
          <button
            onClick={() => requestUserLocation()}
            disabled={isLocatingUser}
            className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center border ${
              userLocation 
                ? 'bg-[#eef7f1] text-[#006b47] border-[#006b47]/30 hover:bg-[#dcf0e2]'
                : 'bg-white/80 text-[#556258] border-[#c1d0c4] hover:text-[#006b47]'
            }`}
            title={
              isLocatingUser 
                ? 'Acquiring GPS coordinates...' 
                : userLocation 
                  ? `Located at Singapore GPS (Nearest: ${currentPark.name}). Click to refresh` 
                  : 'Auto-detect nearest Singapore park via GPS'
            }
            id="gps-locate-btn"
          >
            <span className={`material-symbols-outlined text-[18px] ${isLocatingUser ? 'animate-spin text-[#006b47]' : ''}`}>
              {isLocatingUser ? 'sync' : userLocation ? 'my_location' : 'near_me'}
            </span>
          </button>

          {/* Park Favorite Button */}
          <button
            onClick={() => toggleFavorite(currentPark.id)}
            className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center border ${
              isCurrentFav
                ? 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                : 'bg-white/80 text-[#556258] border-[#c1d0c4] hover:text-amber-600 hover:bg-white'
            }`}
            title={isCurrentFav ? `Remove ${currentPark.name} from Favorites` : `Add ${currentPark.name} to Favorites`}
            id="header-fav-btn"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCurrentFav ? 'star' : 'star_border'}
            </span>
          </button>
        </div>

        {/* Center/Right Nav Links (Desktop) - Focused purely on Parks, Maps, Talk to us, Alerts */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          <button
            onClick={() => setActiveTab('parks')}
            className={`font-semibold text-sm pb-1 transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'parks'
                ? 'text-[#006b47] border-b-2 border-[#006b47]'
                : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
            id="nav-parks-btn"
          >
            <span className="material-symbols-outlined text-[16px]">nature_people</span>
            <span>{t('nav.parks', 'Parks')}</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`font-semibold text-sm pb-1 transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'map'
                ? 'text-[#006b47] border-b-2 border-[#006b47]'
                : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
            id="nav-map-btn"
          >
            <span className="material-symbols-outlined text-[16px]">radar</span>
            <span>{t('nav.map', 'Maps')}</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`font-semibold text-sm pb-1 transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'community'
                ? 'text-[#006b47] border-b-2 border-[#006b47]'
                : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
            id="nav-community-btn"
          >
            <span className="material-symbols-outlined text-[16px]">forum</span>
            <span>{t('nav.community', 'Talk to us')}</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`font-semibold text-sm pb-1 transition-all flex items-center gap-1 relative cursor-pointer ${
              activeTab === 'alerts'
                ? 'text-[#006b47] border-b-2 border-[#006b47]'
                : 'text-[#3e4942] hover:text-[#006b47]'
            }`}
            id="nav-alerts-btn"
          >
            <span className="material-symbols-outlined text-[16px]">warning</span>
            <span>{t('nav.alerts', 'Alerts')}</span>
            {alerts.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] inline-block animate-pulse"></span>
            )}
          </button>
        </nav>

        {/* Action Icons (1-Tap Shortcut, QR Code & Notifications) */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative">
          
          {/* Permanent Install App / Shortcut Button */}
          <button
            onClick={handleInstallAppClick}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 bg-[#006b47] hover:bg-[#005235] text-white rounded-full text-xs font-bold transition-all border border-[#005235] cursor-pointer shadow-xs hover:scale-102 active:scale-98"
            title="Install SG ParkWeather App to Home Screen or Desktop"
            id="header-save-shortcut-btn"
          >
            <span className="material-symbols-outlined text-[15px] text-[#71dba6]">
              install_mobile
            </span>
            <span className="whitespace-nowrap font-bold text-[11px] sm:text-xs">
              Install App
            </span>
          </button>
          
          {/* QR Code Pass & Guide */}
          <button
            onClick={onOpenQrPass}
            className="text-[#006b47] hover:bg-[#ebefed] transition-all p-1.5 sm:p-2 rounded-full cursor-pointer flex items-center justify-center"
            title="Park Digital Pass & Eco Guide"
            id="header-qr-btn"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[20px]">qr_code_2</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-[#006b47] hover:bg-[#ebefed] transition-all p-1.5 sm:p-2 rounded-full cursor-pointer relative flex items-center justify-center"
              title="Weather Notifications"
              id="header-notif-btn"
            >
              <span className="material-symbols-outlined text-[19px] sm:text-[20px]">notifications</span>
              {alerts.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifications Dropdown Tray */}
            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-[#c1d0c4] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2"
                id="notifications-tray"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#e0e3e1]">
                  <div className="font-bold text-[#006b47] text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                    Live Meteorological Notices
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#556258] hover:text-black text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {alerts.length === 0 ? (
                  <div className="text-center py-6 text-[#556258] text-xs flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-[#006b47]/50">check_circle</span>
                    <span>No active severe weather or heavy rain warnings in Singapore parks.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-xl border text-xs flex flex-col gap-1 ${
                          alert.severity === 'high'
                            ? 'bg-rose-50 border-rose-200 text-rose-900'
                            : alert.severity === 'medium'
                            ? 'bg-amber-50 border-amber-200 text-amber-900'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">warning</span>
                            {alert.title}
                          </span>
                          <span className="text-[10px] opacity-75">{alert.timestamp || alert.timeWindow}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90">{alert.message || alert.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-[#e0e3e1] flex justify-between items-center text-[11px]">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveTab('alerts');
                    }}
                    className="text-[#006b47] font-bold hover:underline cursor-pointer"
                  >
                    View All Singapore Alerts →
                  </button>
                  <span className="text-[#556258]">Source: NEA & MSS</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Navigation Bar - Symmetrically divided across full screen */}
      <div className="md:hidden flex border-t border-[#bdcac0]/30 bg-white/95">
        <button
          onClick={() => setActiveTab('parks')}
          className={`flex-1 py-2 text-center text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'parks' ? 'text-[#006b47] bg-[#ebefed] font-bold border-b-2 border-[#006b47]' : 'text-[#6e7a71]'
          }`}
        >
          {t('nav.parks', 'Parks')}
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-2 text-center text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'map' ? 'text-[#006b47] bg-[#ebefed] font-bold border-b-2 border-[#006b47]' : 'text-[#6e7a71]'
          }`}
        >
          {t('nav.map', 'Maps')}
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 text-center text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'community' ? 'text-[#006b47] bg-[#ebefed] font-bold border-b-2 border-[#006b47]' : 'text-[#6e7a71]'
          }`}
        >
          {t('nav.community', 'Talk to us')}
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2 text-center text-xs font-semibold relative transition-colors cursor-pointer ${
            activeTab === 'alerts' ? 'text-[#006b47] bg-[#ebefed] font-bold border-b-2 border-[#006b47]' : 'text-[#6e7a71]'
          }`}
        >
          {t('nav.alerts', 'Alerts')}
          {alerts.length > 0 && (
            <span className="inline-block ml-1 w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
          )}
        </button>
      </div>

      {/* COMPREHENSIVE TIERED PARK SELECTION PORTAL MODAL */}
      <ParkDirectoryModal
        isOpen={showParkModal}
        onClose={() => setShowParkModal(false)}
        currentPark={currentPark}
        onSelectPark={onSelectPark}
      />

      {/* SHORTCUT / SAVE WEB APP MODAL */}
      <SaveAppShortcutModal
        isOpen={showShortcutModal}
        onClose={() => setShowShortcutModal(false)}
        park={currentPark}
      />
    </header>
  );
};
