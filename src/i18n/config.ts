
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations - English
import enCommon from './locales/modules/en/common.json';
import enSidebar from './locales/modules/en/sidebar.json';
import enContent from './locales/modules/en/content.json';
import enMarketing from './locales/modules/en/marketing.json';
import enConversation from './locales/modules/en/conversation.json';
import enDashboard from './locales/modules/en/dashboard.json';
import enSettings from './locales/modules/en/settings.json';
import enWorkflows from './locales/modules/en/workflows.json';
import enEmail from './locales/modules/en/email.json';
import enCrm from './locales/modules/en/crm.json';

// Import translations - Spanish
import esCommon from './locales/modules/es/common.json';
import esSidebar from './locales/modules/es/sidebar.json';
import esContent from './locales/modules/es/content.json';
import esMarketing from './locales/modules/es/marketing.json';
import esConversation from './locales/modules/es/conversation.json';
import esDashboard from './locales/modules/es/dashboard.json';
import esSettings from './locales/modules/es/settings.json';
import esWorkflows from './locales/modules/es/workflows.json';
import esEmail from './locales/modules/es/email.json';
import esCrm from './locales/modules/es/crm.json';

// Get saved language from localStorage or use browser language
const savedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language.split('-')[0];
const defaultLanguage = savedLanguage || (browserLanguage === 'es' ? 'es' : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enCommon,
          sidebar: enSidebar,
          content: enContent,
          marketing: enMarketing,
          conversation: enConversation,
          dashboard: enDashboard,
          settings: enSettings,
          workflows: enWorkflows,
          email: enEmail,
          crm: enCrm
        }
      },
      es: {
        translation: {
          ...esCommon,
          sidebar: esSidebar,
          content: esContent,
          marketing: esMarketing,
          conversation: esConversation,
          dashboard: esDashboard,
          settings: esSettings,
          workflows: esWorkflows,
          email: esEmail,
          crm: esCrm
        }
      }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
