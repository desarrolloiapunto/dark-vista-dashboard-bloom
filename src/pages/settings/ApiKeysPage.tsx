
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { SettingsNavigation } from "@/components/navigation/SettingsNavigation";

const ApiKeysPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.apiKeys')}</h1>
        <p className="text-muted-foreground">{t('settings.apiKeysDescription')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <SettingsNavigation />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.apiIntegrations')}</CardTitle>
              <CardDescription>{t('settings.apiIntegrationsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* API keys management functionality will be implemented later */}
              <p className="text-muted-foreground">{t('common.comingSoon')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;
