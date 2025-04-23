
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const InstagramSettings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    toast({
      title: t('settings.saved'),
      description: t('settings.channelSettingsSaved', { channel: "Instagram" }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.instagramMessaging')}</CardTitle>
        <CardDescription>
          {t('settings.configureInstagram')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="instagram-app-id">{t('settings.appID')}</Label>
            <Input id="instagram-app-id" placeholder="123456789012345" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagram-app-secret">{t('settings.appSecret')}</Label>
            <Input id="instagram-app-secret" type="password" placeholder="••••••••••••••••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram-account-id">{t('settings.instagramAccountID')}</Label>
            <Input id="instagram-account-id" placeholder="123456789012345" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram-access-token">{t('settings.accessToken')}</Label>
            <Input id="instagram-access-token" type="password" placeholder="••••••••••••••••••••••" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram-webhook">{t('settings.webhookURL')}</Label>
          <div className="flex gap-2">
            <Input id="instagram-webhook" readOnly value="https://app.example.com/api/webhook/instagram" />
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText("https://app.example.com/api/webhook/instagram");
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
          <Switch id="instagram-active" />
          <Label htmlFor="instagram-active">{t('settings.active')}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>{t('settings.saveSettings')}</Button>
      </CardFooter>
    </Card>
  );
};
