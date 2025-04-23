
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const WhatsAppSettings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSave = () => {
    toast({
      title: t('settings.saved'),
      description: t('settings.channelSettingsSaved', { channel: "WhatsApp" }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.whatsappBusinessAPI')}</CardTitle>
        <CardDescription>
          {t('settings.configureWhatsApp')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-token">{t('settings.accessToken')}</Label>
            <Input id="whatsapp-token" type="password" placeholder="••••••••••••••••••••••" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp-phone">{t('settings.phoneNumberID')}</Label>
            <Input id="whatsapp-phone" placeholder="1234567890" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp-webhook">{t('settings.webhookURL')}</Label>
          <div className="flex gap-2">
            <Input id="whatsapp-webhook" readOnly value="https://app.example.com/api/webhook/whatsapp" />
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText("https://app.example.com/api/webhook/whatsapp");
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
          <Switch id="whatsapp-active" />
          <Label htmlFor="whatsapp-active">{t('settings.active')}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>{t('settings.saveSettings')}</Button>
      </CardFooter>
    </Card>
  );
};
