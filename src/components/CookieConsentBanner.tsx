import React, { useState, useEffect } from 'react';
import { getSavedCookieConsent, saveCookieConsent } from '../utils/cookieUtils';
import { useLanguage } from '../context/LanguageContext';

interface CookieConsentBannerProps {
  onOpenPrivacyModal: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyModal
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if consent has already been granted
    const hasConsented = getSavedCookieConsent();
    if (!hasConsented) {
      // Small delay so it transitions in smoothly
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    saveCookieConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    saveCookieConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[99990] p-3 sm:p-4 bg-[#003824]/95 text-white backdrop-blur-md border-t border-[#71dba6]/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
      id="cookie-consent-banner"
      role="dialog"
      aria-label="Cookie & Advertising Preferences"
    >
      <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        
        <div className="flex items-start gap-2.5 max-w-3xl">
          <span className="material-symbols-outlined text-[20px] text-[#71dba6] shrink-0 mt-0.5">
            cookie
          </span>
          <div className="text-white/90 leading-relaxed text-[11px] sm:text-xs">
            <span>
              <strong>SG ParkWeather & Google AdSense Notice:</strong>{' '}
              {t('cookie.consentText', 'We use cookies and Google AdSense to personalize content and analyze traffic in accordance with PDPA and Google policies.')}{' '}
            </span>
            <button
              onClick={onOpenPrivacyModal}
              className="text-[#71dba6] hover:underline font-semibold underline cursor-pointer inline-flex items-center gap-0.5"
            >
              {t('cookie.learnMore', 'Google AdSense Programme Policies & Privacy Statement')}
            </button>
            .
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={onOpenPrivacyModal}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/20"
          >
            {t('cookie.essentialOnly', 'Preferences')}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg text-[11px] font-bold bg-[#71dba6] hover:bg-[#58c991] text-[#003824] transition-all shadow-xs hover:scale-102 cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[13px]">check</span>
            <span>{t('cookie.acceptAll', 'Accept All')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

