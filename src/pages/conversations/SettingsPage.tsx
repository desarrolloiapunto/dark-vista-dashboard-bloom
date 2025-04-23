
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Facebook, Instagram, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { WhatsAppSettings } from "@/components/settings/WhatsAppSettings";
import { FacebookSettings } from "@/components/settings/FacebookSettings";
import { InstagramSettings } from "@/components/settings/InstagramSettings";
import { TelegramSettings } from "@/components/settings/TelegramSettings";
import { GeneralSettings } from "@/components/settings/GeneralSettings";

const SettingsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("whatsapp");

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
          <WhatsAppSettings />
        </TabsContent>

        <TabsContent value="facebook">
          <FacebookSettings />
        </TabsContent>

        <TabsContent value="instagram">
          <InstagramSettings />
        </TabsContent>

        <TabsContent value="telegram">
          <TelegramSettings />
        </TabsContent>
      </Tabs>

      <GeneralSettings />
    </div>
  );
};

export default SettingsPage;
