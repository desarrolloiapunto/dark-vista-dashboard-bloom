
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, Facebook, Instagram, Send, Bell, Server } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("whatsapp");

  const handleSaveSettings = (channel: string) => {
    toast({
      title: t('settings.saved'),
      description: t('settings.channelSettingsSaved', { channel }),
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.channelConfiguration')}</h1>
        <p className="text-muted-foreground">{t('settings.configureIntegrations')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageCircle size={16} />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook size={16} />
            Facebook
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram size={16} />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <Send size={16} />
            Telegram
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
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
              <Button onClick={() => handleSaveSettings("WhatsApp")}>{t('settings.saveSettings')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="facebook">
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
              <Button onClick={() => handleSaveSettings("Facebook")}>{t('settings.saveSettings')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="instagram">
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
              <Button onClick={() => handleSaveSettings("Instagram")}>{t('settings.saveSettings')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="telegram">
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
              <Button onClick={() => handleSaveSettings("Telegram")}>{t('settings.saveSettings')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

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
    </div>
  );
};

export default SettingsPage;
