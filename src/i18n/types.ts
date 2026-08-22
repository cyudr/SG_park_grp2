export type LanguageCode = 'en' | 'zh' | 'ms' | 'ta' | 'ko' | 'ja';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  shortLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', shortLabel: 'EN' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', shortLabel: '中文' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', shortLabel: 'BM' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', shortLabel: 'தமிழ்' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', shortLabel: '한국어' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', shortLabel: '日本語' },
];
