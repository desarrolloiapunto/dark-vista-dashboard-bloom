
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const FacebookSettings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    toast({
      title: t('settings.saved'),
      description: t('settings.channelSettingsSaved', { channel: "Facebook" }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.facebookMessenger')}</CardTitle>
        <CardDescription>
          {t('settings.configureFacebook')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="facebook-app-id">{t('settings.appID')}</Label>
            <Input id="facebook-app-id" placeholder="123456789012345" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facebook-app-secret">{t('settings.appSecret')}</Label>
            <Input id="facebook-app-secret" type="password" placeholder="••••••••••••••••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook-page-id">{t('settings.pageID')}</Label>
            <Input id="facebook-page-id" placeholder="123456789012345" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook-page-token">{t('settings.pageToken')}</Label>
            <Input id="facebook-page-token" type="password" placeholder="••••••••••••••••••••••" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook-webhook">{t('settings.webhookURL')}</Label>
          <div className="flex gap-2">
            <Input id="facebook-webhook" readOnly value="https://app.example.com/api/webhook/facebook" />
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText("https://app.example.com/api/webhook/facebook");
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
          <Switch id="facebook-active" />
          <Label htmlFor="facebook-active">{t('settings.active')}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>{t('settings.saveSettings')}</Button>
      </CardFooter>
    </Card>
  );
};
