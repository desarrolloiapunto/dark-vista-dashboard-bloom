
import { useTranslation } from "react-i18next";

const PermissionsPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.permissions')}</h1>
        <p className="text-muted-foreground">{t('settings.managePermissions')}</p>
      </div>
      
      <div className="p-8 text-center text-muted-foreground">
        <p>{t('common.comingSoon')}</p>
      </div>
    </div>
  );
};

export default PermissionsPage;
