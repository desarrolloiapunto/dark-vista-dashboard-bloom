
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

export const GeneralSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">{t('settings.generalSettings')}</h2>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">{t('settings.enableNotifications')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.notificationsDescription')}</p>
            </div>
            <Switch id="notifications" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-reply">{t('settings.enableAutoReplies')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.autoRepliesDescription')}</p>
            </div>
            <Switch id="auto-reply" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="chatbot">{t('settings.enableChatbot')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.chatbotDescription')}</p>
            </div>
            <Switch id="chatbot" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
