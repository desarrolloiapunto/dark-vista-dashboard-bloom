
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const usePageTitle = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const getPageTitle = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0 || location.pathname === '/auth') return 'Kairos SaaS';

    const routeTitles: {[key: string]: string} = {
      'conversations': t('navigation.conversations'),
      'emails': t('navigation.emails'),
      'crm': t('navigation.crm'),
      'marketing': t('navigation.marketing'),
      'ads': t('navigation.ads'),
      'content': t('navigation.content'),
      'leads': t('sidebar.crm.leads'),
      'profile': t('header.profile'),
      'analytics': t('sidebar.dashboard.analytics')
    };

    const mainRoute = pathSegments[0];
    const sectionTitle = routeTitles[mainRoute] || mainRoute.charAt(0).toUpperCase() + mainRoute.slice(1);
    return `${sectionTitle} | Kairos SaaS`;
  };

  useEffect(() => {
    document.title = getPageTitle();
  }, [location.pathname, t]);

  return getPageTitle();
};
