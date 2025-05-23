
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";
import { DisplaySettingsForm } from "./display/DisplaySettingsForm";

export const DisplaySettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            {t('settings.displaySettings')}
          </CardTitle>
          <CardDescription>
            {t('settings.displaySettingsDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DisplaySettingsForm />
        </CardContent>
      </Card>
    </div>
  );
};
