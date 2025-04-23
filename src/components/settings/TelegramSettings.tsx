
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const TelegramSettings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    toast({
      title: t('settings.saved'),
      description: t('settings.channelSettingsSaved', { channel: "Telegram" }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.telegramBot')}</CardTitle>
        <CardDescription>
          {t('settings.configureTelegram')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="telegram-bot-token">{t('settings.botToken')}</Label>
            <Input id="telegram-bot-token" type="password" placeholder="••••••••••••••••••••••" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram-bot-username">{t('settings.botUsername')}</Label>
            <Input id="telegram-bot-username" placeholder="@yourbotname" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="telegram-webhook">{t('settings.webhookURL')}</Label>
          <div className="flex gap-2">
            <Input id="telegram-webhook" readOnly value="https://app.example.com/api/webhook/telegram" />
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText("https://app.example.com/api/webhook/telegram");
              toast({
                title: t('settings.copied'),
                description: t('settings.webhookCopied'),
              });
            }}>
              {t('settings.copy')}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="telegram-active" />
          <Label htmlFor="telegram-active">{t('settings.active')}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>{t('settings.saveSettings')}</Button>
      </CardFooter>
    </Card>
  );
};
