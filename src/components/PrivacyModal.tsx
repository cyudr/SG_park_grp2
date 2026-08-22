import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { deleteCookie, COOKIE_KEYS } from '../utils/cookieUtils';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const [clearedNotice, setClearedNotice] = useState(false);

  if (!isOpen) return null;

  const handleClearCookies = () => {
    deleteCookie(COOKIE_KEYS.FAVORITES);
    deleteCookie(COOKIE_KEYS.SELECTED_PARK);
    deleteCookie(COOKIE_KEYS.RAIN_TREND_MODE);
    setClearedNotice(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="glass-card bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 border border-slate-200 animate-in zoom-in-95 text-[#181c1b]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e3e1] mb-3">
          <h3 className="text-lg font-bold text-[#006b47] flex items-center gap-1.5">
            <span className="material-symbols-outlined">shield</span>
            Privacy Policy & Cookie Statement
          </h3>
          <button onClick={onClose} className="text-[#6e7a71] hover:text-[#181c1b] cursor-pointer">✕</button>
        </div>

        <div className="text-xs text-[#3e4942] space-y-3 leading-relaxed max-h-96 overflow-y-auto pr-1">
          <p>
            <strong>SG ParkWeather</strong> is committed to protecting your privacy and complying with the Singapore Personal Data Protection Act (PDPA) while delivering real-time meteorological insights for Singapore’s nature parks and reservoirs.
          </p>

          <div className="p-3 bg-[#eef7f1] rounded-xl border border-[#006b47]/20 space-y-1.5">
            <div className="font-bold text-[#005235] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">cookie</span>
              <span>Cookie Policy & Functional Storage:</span>
            </div>
            <p className="text-[11px] text-[#003824]">
              We use lightweight first-party functional cookies (<code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[10px]">sg_park_favorites</code>, <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[10px]">sg_park_selected</code>, <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[10px]">sg_park_rain_trend_mode</code>, <code className="bg-white/80 px-1 py-0.2 rounded font-mono text-[10px]">sg_park_view_mode</code>) stored directly in your browser.
            </p>
            <ul className="list-disc pl-4 text-[11px] space-y-0.5 text-[#003824]">
              <li><strong>Favorite Parks:</strong> Remembers the parks you have starred as favorites across sessions.</li>
              <li><strong>Park Selection:</strong> Restores your last viewed park upon returning to the app.</li>
              <li><strong>View Mode Preferences:</strong> Remembers your preferred Mobile or Desktop layout choice.</li>
              <li><strong>Zero Cross-Site Tracking:</strong> First-party functional cookies are non-intrusive and never sold.</li>
            </ul>
          </div>

          <p>
            <strong>Geolocation Privacy:</strong> Location coordinates are requested on an opt-in basis and processed purely within your device's browser to calculate straight-line distances to nearby parks and determine your closest park. GPS coordinates are never stored on any remote server.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">verified</span>
              <span>Google AdSense Programme Policies & Advertising Transparency:</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              This site displays advertisements powered by <strong>Google AdSense</strong> (Publisher ID: <code className="bg-white px-1 py-0.5 rounded font-mono border border-slate-300">pub-8369709738621970</code>). In strict compliance with Google AdSense Programme Policies:
            </p>
            <ul className="list-disc pl-4 text-[11px] space-y-1 text-slate-600">
              <li><strong>Clear Ad Labelling:</strong> All advertising units are clearly labeled with &quot;ADVERTISEMENT&quot; and separated from editorial content.</li>
              <li><strong>Third-Party Vendors & Cookies:</strong> Google and its certified third-party vendors use cookies to serve ads based on your prior visits to this website or other websites on the Internet.</li>
              <li><strong>Google Partner Data Usage:</strong> To understand how Google uses information from sites or apps that use their services, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#006b47] font-semibold underline">How Google uses data when you use partner sites or apps</a>.</li>
              <li><strong>Personalized Ads Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#006b47] font-semibold underline">Google Ads Settings</a> or opt out of third-party vendor cookies via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#006b47] font-semibold underline">aboutads.info</a>.</li>
            </ul>
          </div>

          <p>
            <strong>Meteorological & Transport Data:</strong> Telemetry feeds originate from official Open Data sources by the Meteorological Service Singapore (MSS), National Environment Agency (NEA), and Land Transport Authority (LTA DataMall).
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#e0e3e1] flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={handleClearCookies}
            className="text-[11px] text-red-600 hover:text-red-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            title="Reset saved favorites and cookies"
          >
            <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
            <span>{clearedNotice ? 'Cleared! Reloading...' : 'Clear My Saved Cookies'}</span>
          </button>

          <button
            onClick={onClose}
            className="bg-[#006b47] hover:bg-[#005235] text-white px-4 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
