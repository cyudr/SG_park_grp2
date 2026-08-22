import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { language, setLanguage, languagesList, currentLanguageInfo, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  // Update floating menu position relative to trigger button
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 6,
        right: Math.max(8, window.innerWidth - rect.right)
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('resize', handleScrollOrResize);
      window.addEventListener('scroll', handleScrollOrResize, true);
      return () => {
        window.removeEventListener('resize', handleScrollOrResize);
        window.removeEventListener('scroll', handleScrollOrResize, true);
      };
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button - reduced font size & single line fit */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-black/25 hover:bg-black/40 text-white/95 text-[10px] sm:text-[11px] font-medium border border-white/15 hover:border-white/30 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`${t('language.label', 'Language')}: ${currentLanguageInfo.nativeName}`}
        id="language-selector-btn"
      >
        <span className="text-[11px] leading-none">{currentLanguageInfo.flag}</span>
        <span className="font-semibold text-white tracking-tight leading-none">
          {variant === 'compact' ? currentLanguageInfo.shortLabel : currentLanguageInfo.nativeName}
        </span>
        <span className={`material-symbols-outlined text-[13px] text-white/70 transition-transform duration-150 leading-none ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown Menu - Mounted via Portal to document.body with z-[99999] so it is NEVER blocked or clipped */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
            zIndex: 99999
          }}
          className="w-40 sm:w-44 rounded-xl bg-[#002f1d] border border-[#005a39] shadow-[0_12px_36px_rgba(0,0,0,0.65)] py-1 text-xs animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-2.5 py-1 border-b border-white/10 text-[9.5px] font-bold text-emerald-300/90 uppercase tracking-wider flex items-center justify-between">
            <span>{t('language.label', 'Select Language')}</span>
            <span className="material-symbols-outlined text-[11px]">translate</span>
          </div>

          <div className="py-0.5">
            {languagesList.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#006b47] text-white font-bold'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <span className="block text-[11px] leading-tight font-medium truncate">{lang.nativeName}</span>
                      <span className="block text-[9px] text-white/50 truncate">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[13px] text-[#71dba6] shrink-0 ml-1">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
