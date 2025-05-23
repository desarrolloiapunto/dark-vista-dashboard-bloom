
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const EmailsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.emailConfiguration')}</h1>
        <p className="text-muted-foreground">{t('settings.emailConfigurationDescription')}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.emailSettings')}</CardTitle>
          <CardDescription>{t('settings.emailSettingsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Email configuration functionality will be implemented later */}
          <p className="text-muted-foreground">{t('common.comingSoon')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailsPage;
