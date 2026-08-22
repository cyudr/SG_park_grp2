import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ViewMode } from './ViewModeSwitcher';
import { AppTab } from '../types';

interface FooterProps {
  currentParkId: string;
  onSelectPark: (parkId: string) => void;
  onOpenPrivacyModal?: () => void;
  viewMode?: ViewMode;
  onToggleViewMode?: (mode: ViewMode) => void;
  onNavigateTab?: (tab: AppTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentParkId, 
  onSelectPark, 
  onOpenPrivacyModal,
  viewMode,
  onToggleViewMode,
  onNavigateTab
}) => {
  const { t } = useLanguage();

  const handleOpenDataSource = () => {
    if (onNavigateTab) {
      onNavigateTab('datasource');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="bg-[#f1f4f2] border-t border-[#bdcac0]/50 w-full mt-12 py-10 transition-colors"
      id="app-footer"
    >
      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
        
        {/* Dedicated Government Data Sources Entry Point Card at the bottom */}
        <div 
          className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-[#006b47]/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          id="footer-datasource-banner"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eef7f1] text-[#006b47] flex items-center justify-center shrink-0 border border-[#006b47]/20">
              <span className="material-symbols-outlined text-[24px]">dataset</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#005235] flex items-center gap-2">
                <span>{t('nav.dataSource', 'Government & Open Data Feeds')}</span>
                <span className="text-[10px] bg-[#006b47] text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  12 Active APIs
                </span>
              </h3>
              <p className="text-xs text-[#556258] mt-0.5 max-w-xl">
                Real-time meteorological, radar, UV, air quality, bus arrivals, and biodiversity datasets powered directly by NEA, MSS, LTA DataMall, and data.gov.sg.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenDataSource}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#006b47] hover:bg-[#005235] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer shrink-0 w-full sm:w-auto justify-center"
            id="footer-open-datasource-btn"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>View All Data Sources & API Health</span>
          </button>
        </div>

        {/* Brand, Copyright, and Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-[#bdcac0]/30 pt-6">
          {/* Left Column: Brand & Copyright */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <div className="font-bold text-xl text-[#006b47] flex items-center justify-center md:justify-start gap-1.5">
              <span className="material-symbols-outlined text-[22px]">nature</span>
              <span>SG ParkWeather</span>
            </div>
            <p className="text-sm text-[#006b47]/80">
              {t('footer.copyright', '© 2026 SG ParkWeather. Nature-inspired meteorological data.')}
            </p>
            <p className="text-[11px] text-[#556258] mt-0.5">
              AdSense Publisher ID: ca-pub-8369709738621970 • Open Government Data
            </p>
          </div>

          {/* Right Column: Park Quick Links & Privacy */}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 items-center justify-center md:justify-end text-sm">
            {viewMode && onToggleViewMode && (
              <li>
                <button
                  onClick={() => onToggleViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')}
                  className="text-[#006b47] font-semibold hover:underline cursor-pointer transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {viewMode === 'mobile' ? 'desktop_windows' : 'phone_iphone'}
                  </span>
                  <span>
                    {viewMode === 'mobile' ? t('view.switchToDesktop', 'Switch to Desktop View') : t('view.switchToMobile', 'Switch to Mobile View')}
                  </span>
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => onSelectPark('east-coast-park')}
                className={`underline cursor-pointer transition-colors ${
                  currentParkId === 'east-coast-park'
                    ? 'text-[#00629d] font-bold hover:text-[#006b47]'
                    : 'text-[#3e4942] hover:text-[#006b47]'
                }`}
              >
                East Coast Park
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPark('gardens-by-the-bay')}
                className={`underline cursor-pointer transition-colors ${
                  currentParkId === 'gardens-by-the-bay'
                    ? 'text-[#00629d] font-bold hover:text-[#006b47]'
                    : 'text-[#3e4942] hover:text-[#006b47]'
                }`}
              >
                Gardens by the Bay
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPark('bishan-ang-mo-kio')}
                className={`underline cursor-pointer transition-colors ${
                  currentParkId === 'bishan-ang-mo-kio'
                    ? 'text-[#00629d] font-bold hover:text-[#006b47]'
                    : 'text-[#3e4942] hover:text-[#006b47]'
                }`}
              >
                Bishan Park
              </button>
            </li>
            <li>
              <button
                onClick={onOpenPrivacyModal}
                className="text-[#3e4942] hover:text-[#006b47] underline cursor-pointer transition-colors"
              >
                {t('footer.privacy', 'AdSense & Privacy Policy')}
              </button>
            </li>
          </ul>

        </div>

      </div>
    </footer>
  );
};
