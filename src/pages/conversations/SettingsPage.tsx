
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Send, Settings as SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { WhatsAppSettings } from "@/components/settings/WhatsAppSettings";
import { MetaSettings } from "@/components/settings/MetaSettings";
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
          <TabsTrigger value="meta" className="flex items-center gap-2">
            <SettingsIcon size={16} />
            Meta
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <Send size={16} />
            Telegram
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon size={16} />
            {t('settings.general')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp">
          <WhatsAppSettings />
        </TabsContent>

        <TabsContent value="meta">
          <MetaSettings />
        </TabsContent>

        <TabsContent value="telegram">
          <TelegramSettings />
        </TabsContent>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
