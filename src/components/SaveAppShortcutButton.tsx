import React, { useState, useEffect } from 'react';
import { Park } from '../types';
import { detectDevice } from '../utils/deviceDetection';
import { SaveAppShortcutModal } from './SaveAppShortcutModal';

interface SaveAppShortcutButtonProps {
  park?: Park;
  isNearestPark?: boolean;
  className?: string;
  variant?: 'pill' | 'primary' | 'compact' | 'hero';
  labelOverride?: string;
}

export const SaveAppShortcutButton: React.FC<SaveAppShortcutButtonProps> = ({
  park,
  isNearestPark = false,
  className = '',
  variant = 'pill',
  labelOverride
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const device = detectDevice();

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleClick = async () => {
    // If native 1-tap PWA install is ready and supported, trigger directly
    const promptEvent = deferredPrompt || (typeof window !== 'undefined' ? (window as any).__deferredInstallPrompt : null);
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          (window as any).__deferredInstallPrompt = null;
          return;
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }
    // Otherwise open guided 1-tap shortcut modal with clear device instructions
    setIsModalOpen(true);
  };

  const buttonText = labelOverride || (
    device.isStandalone 
      ? 'App Active' 
      : 'Install App'
  );

  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs border cursor-pointer hover:scale-102 active:scale-98 ${
            isNearestPark
              ? 'bg-[#005235] hover:bg-[#006b47] text-white border-emerald-400/40 ring-1 ring-emerald-400/30'
              : 'bg-[#eef7f1] hover:bg-[#dcf0e2] text-[#006b47] border-[#006b47]/30'
          } ${className}`}
          title="Install SG ParkWeather App to Home Screen or Desktop"
          id="hero-save-app-shortcut-btn"
        >
          <span className="material-symbols-outlined text-[16px] text-emerald-600">
            install_mobile
          </span>
          <span className="whitespace-nowrap font-bold">{buttonText}</span>
        </button>

        <SaveAppShortcutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          park={park}
          isNearestPark={isNearestPark}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs border cursor-pointer hover:scale-102 active:scale-98 ${
          isNearestPark
            ? 'bg-[#005235] hover:bg-[#006b47] text-white border-emerald-400/40 ring-1 ring-emerald-400/30'
            : 'bg-[#eef7f1] hover:bg-[#dcf0e2] text-[#006b47] border-[#006b47]/30 hover:border-[#006b47]'
        } ${className}`}
        title="Install SG ParkWeather App Shortcut"
        id="save-app-shortcut-btn"
      >
        <span className="material-symbols-outlined text-[13px] text-emerald-700">
          install_mobile
        </span>
        <span className="whitespace-nowrap">{buttonText}</span>
      </button>

      <SaveAppShortcutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        park={park}
        isNearestPark={isNearestPark}
      />
    </>
  );
};

