import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en';
import es from './translations/es';
import fr from './translations/fr';
import zh from './translations/zh';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4', // required for React Native / Hermes
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    zh: { translation: zh },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React Native handles escaping
  },
});

export default i18n;

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'zh';

export const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇦🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];
