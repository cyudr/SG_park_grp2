import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LanguageInfo, SUPPORTED_LANGUAGES } from '../i18n/types';
import { TRANSLATIONS } from '../i18n/translations';
import { getSavedLanguage, saveLanguageToCookie, detectSystemLanguage } from '../utils/cookieUtils';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  languagesList: LanguageInfo[];
  detectedLanguage: LanguageCode;
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedLang] = useState<LanguageCode>(() => detectSystemLanguage());

  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // 1. Check if user explicitly manually chose a language
    const isUserExplicit = typeof window !== 'undefined' && localStorage.getItem('sg_park_lang_user_set') === 'true';
    const saved = getSavedLanguage();

    if (isUserExplicit && saved) {
      return saved;
    }

    // 2. Otherwise use detected primary system language (default is 'en' if browser/system is English)
    const detected = detectSystemLanguage();
    if (detected && detected !== 'en') {
      return detected;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    saveLanguageToCookie(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sg_park_lang_user_set', 'true');
      } catch (_) {}
    }
    
    // Update html lang attribute for accessibility and SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    const enDict = TRANSLATIONS['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  const currentLanguageInfo = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languagesList: SUPPORTED_LANGUAGES,
        detectedLanguage: detectedLang,
        currentLanguageInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
