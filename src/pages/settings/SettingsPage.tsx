
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { SettingsNavigation } from "@/components/navigation/SettingsNavigation";

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <SettingsNavigation />
          </div>
        </div>
        <div className="md:col-span-3">
          {showGeneralSettings && <GeneralSettings />}
          {!showGeneralSettings && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
