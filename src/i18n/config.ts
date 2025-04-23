
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      }
    },
    lng: localStorage.getItem('language') || 'es', // Default language is Spanish
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
