
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { OrganizationSettingsForm } from "./OrganizationSettingsForm";

export const OrganizationSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {t('settings.organizationProfile')}
          </CardTitle>
          <CardDescription>
            {t('settings.organizationProfileDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
};
