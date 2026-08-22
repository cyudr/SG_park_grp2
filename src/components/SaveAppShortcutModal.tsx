import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Park } from '../types';
import { detectDevice, DeviceInfo } from '../utils/deviceDetection';

interface SaveAppShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  park?: Park;
  isNearestPark?: boolean;
}

export const SaveAppShortcutModal: React.FC<SaveAppShortcutModalProps> = ({
  isOpen,
  onClose,
  park,
  isNearestPark = false,
}) => {
  const [device, setDevice] = useState<DeviceInfo>(detectDevice());
  const [copied, setCopied] = useState(false);
  const [savedAsDefault, setSavedAsDefault] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(() => {
    return typeof window !== 'undefined' ? (window as any).__deferredInstallPrompt : null;
  });
  const [installPromptTriggered, setInstallPromptTriggered] = useState(false);
  const [highlightSteps, setHighlightSteps] = useState(false);

  // Detect device, listen for PWA install event, lock body scroll, and listen for Escape key
  useEffect(() => {
    setDevice(detectDevice());

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).__deferredInstallPrompt = e;
    };

    const handlePromptReady = () => {
      if ((window as any).__deferredInstallPrompt) {
        setDeferredPrompt((window as any).__deferredInstallPrompt);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('pwa-install-available', handlePromptReady);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('pwa-install-available', handlePromptReady);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Main site installation URL
  const mainSiteUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : '/';

  const handleInstallClick = async () => {
    // 1. If native browser PWA install prompt is ready, trigger native prompt dialog
    const promptEvent = deferredPrompt || (typeof window !== 'undefined' ? (window as any).__deferredInstallPrompt : null);
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          (window as any).__deferredInstallPrompt = null;
          setInstallPromptTriggered(true);
          setTimeout(() => onClose(), 1500);
          return;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    
    // 2. If native prompt is not supported by this browser (e.g. iOS Safari, Mac Safari, Firefox),
    // strictly DO NOT open the share sheet. Instead highlight the quick device step directly.
    setHighlightSteps(true);
    setTimeout(() => {
      const stepElem = document.getElementById('platform-install-steps');
      if (stepElem) {
        stepElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(mainSiteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SG ParkWeather - Singapore Parks Weather & Companion',
          text: 'Check live weather, rain radar, UV index, and trail conditions for all Singapore parks!',
          url: mainSiteUrl
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSetDefaultHomePark = () => {
    if (!park) return;
    try {
      localStorage.setItem('sg_parkweather_default_park', park.id);
      document.cookie = `sg_parkweather_home_park=${park.id};path=/;max-age=31536000;SameSite=Lax`;
      setSavedAsDefault(true);
      setTimeout(() => setSavedAsDefault(false), 3000);
    } catch (e) {
      console.warn('Could not save default park', e);
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 max-w-lg w-full overflow-hidden flex flex-col max-h-[88vh] my-auto animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
        id="save-app-shortcut-modal"
      >
        {/* Header with gradient and device badge */}
        <div className="shrink-0 bg-gradient-to-r from-[#005235] via-[#006b47] to-[#00875a] text-white p-4 sm:p-6 relative pr-12">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-white/90 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close modal"
            id="close-shortcut-modal-btn"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="bg-white/20 text-white text-[10.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">
                {device.platform === 'ios' ? 'phone_iphone' : device.platform === 'android' ? 'android' : 'devices'}
              </span>
              Detected: {device.platform === 'ios' ? 'iOS (iPhone / iPad)' : device.platform === 'android' ? 'Android' : device.platform === 'mac' ? 'Mac Desktop' : 'Windows PC'}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
            {device.platform === 'ios' && 'Save SG ParkWeather to iPhone / iPad'}
            {device.platform === 'android' && 'Install SG ParkWeather on Android'}
            {device.platform === 'mac' && 'Save SG ParkWeather to Mac Dock'}
            {(device.platform === 'windows' || device.platform === 'other') && 'Install SG ParkWeather App Shortcut'}
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            1-tap access to live weather, rain radar & visitor guides for all 30+ Singapore parks
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 overscroll-contain">
          
          {/* Permanent Prominent Install App / Shortcut Action Button */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#006b47] text-white flex items-center justify-center shrink-0 shadow-md border border-emerald-400/30 overflow-hidden">
                <img src="/icon.svg" alt="SG ParkWeather App Icon" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#005235]">
                  {deferredPrompt ? '1-Click Native Install Ready' : 'Install SG ParkWeather App'}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600">
                  {device.platform === 'ios' ? 'Add full-screen app icon to your Home Screen' : device.platform === 'android' ? 'Install directly to your apps & home screen' : 'Instant launch from desktop dock or taskbar'}
                </div>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-[#006b47] hover:bg-[#005235] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-102 active:scale-98 transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              id="modal-direct-install-btn"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Install App</span>
            </button>
          </div>

          {/* Success state if installed */}
          {installPromptTriggered && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
              <span className="material-symbols-outlined text-[20px] text-emerald-700">check_circle</span>
              <span>Installation initiated! SG ParkWeather will be added to your device.</span>
            </div>
          )}

          {/* Platform Specific Step-by-Step Instructions */}
          <div 
            id="platform-install-steps"
            className={`border rounded-2xl p-3.5 sm:p-4 transition-all duration-300 ${
              highlightSteps 
                ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300 shadow-sm' 
                : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#006b47]">checklist</span>
                <span>Quick Installation Steps</span>
              </div>
              {highlightSteps && (
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  Follow steps below
                </span>
              )}
            </div>

            {/* iOS Safari Steps */}
            {device.platform === 'ios' && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">1</span>
                  <div>
                    In <strong>Safari</strong>, tap the <strong>Share</strong> icon at the bottom toolbar (
                    <span className="inline-flex items-center text-blue-600 font-semibold align-middle px-0.5">
                      <span className="material-symbols-outlined text-[14px]">ios_share</span> Share
                    </span>
                    ).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">2</span>
                  <div>
                    Scroll down in the action sheet and tap <strong>&quot;Add to Home Screen&quot;</strong> (
                    <span className="inline-flex items-center text-slate-800 font-semibold align-middle px-0.5">
                      <span className="material-symbols-outlined text-[14px]">add_box</span>
                    </span>
                    ).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">3</span>
                  <div>
                    Tap <strong>&quot;Add&quot;</strong> in the top right. The SG ParkWeather app icon will appear on your Home Screen!
                  </div>
                </div>
              </div>
            )}

            {/* Android Steps */}
            {device.platform === 'android' && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">1</span>
                  <div>
                    Tap the <strong>browser menu (⋮)</strong> in the top-right corner of Chrome or Samsung Internet.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">2</span>
                  <div>
                    Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">3</span>
                  <div>
                    Confirm <strong>&quot;Install&quot;</strong>. SG ParkWeather will be installed directly to your device.
                  </div>
                </div>
              </div>
            )}

            {/* Mac Desktop Steps */}
            {device.platform === 'mac' && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">1</span>
                  <div>
                    <strong>Add to Dock (Safari):</strong> In Safari menu bar, click <strong>File &gt; Add to Dock</strong>.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">2</span>
                  <div>
                    <strong>Install in Chrome:</strong> Click the <strong>Install App</strong> icon in the address bar.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">3</span>
                  <div>
                    <strong>Bookmark:</strong> Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">⌘ Cmd + D</kbd> to bookmark the main site.
                  </div>
                </div>
              </div>
            )}

            {/* Windows / Other Desktop Steps */}
            {(device.platform === 'windows' || device.platform === 'other') && (
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">1</span>
                  <div>
                    <strong>Install Web App:</strong> In Chrome or Edge, click the <strong>Install SG ParkWeather</strong> icon in the address bar.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005235] font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">2</span>
                  <div>
                    <strong>Add to Favorites / Bookmarks:</strong> Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + D</kbd> on your keyboard.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Handy Action Buttons */}
          <div className="space-y-2 pt-1">
            {park && (
              <button
                onClick={handleSetDefaultHomePark}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  savedAsDefault
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white hover:bg-emerald-50 text-[#006b47] border-[#006b47]/30 shadow-xs'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {savedAsDefault ? 'check_circle' : 'home_pin'}
                </span>
                <span>{savedAsDefault ? `✓ Saved ${park.name} as Default!` : `Set ${park.name} as Default Launch Park`}</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'App Link Copied!' : 'Copy Main App Link'}</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
                <span>Share App</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="shrink-0 bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-[11px]">
            <img src="/favicon.svg" alt="" className="w-3.5 h-3.5" />
            <span>SG ParkWeather • Singapore Open Data PWA</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#006b47] hover:text-[#005235] px-3 py-1 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  // Render using createPortal directly to document.body to prevent parent CSS clipping
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

