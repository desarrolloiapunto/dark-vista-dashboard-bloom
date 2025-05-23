
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { GeneralSettings } from "@/components/settings/GeneralSettings";

const SettingsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Solo mostrar GeneralSettings cuando estamos en la ruta principal de configuración
  const showGeneralSettings = location.pathname === "/settings";
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.generalSettings')}</h1>
        <p className="text-muted-foreground">{t('settings.generalConfigDescription')}</p>
      </div>

      <div>
        {showGeneralSettings && <GeneralSettings />}
        {!showGeneralSettings && <Outlet />}
      </div>
    </div>
  );
};

export default SettingsPage;
