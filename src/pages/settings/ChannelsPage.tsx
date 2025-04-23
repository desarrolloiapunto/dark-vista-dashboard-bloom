
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Send, Settings as SettingsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { WhatsAppSettings } from "@/components/settings/WhatsAppSettings";
import { MetaSettings } from "@/components/settings/MetaSettings";
import { TelegramSettings } from "@/components/settings/TelegramSettings";

const ChannelsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("whatsapp");
  
  // Parse tab from URL or use default
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['whatsapp', 'meta', 'telegram'].includes(tab)) {
      setActiveTab(tab);
    } else {
      // Set default tab if none specified
      setActiveTab('whatsapp');
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/settings/channels?tab=${value}`, { replace: true });
  };

  console.log('ChannelsPage rendering, active tab:', activeTab);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.channelConfiguration')}</h1>
        <p className="text-muted-foreground">{t('settings.configureIntegrations')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8 flex flex-wrap">
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
        </TabsList>

        <div className="mt-6">
          <TabsContent value="whatsapp" className="mt-0">
            <WhatsAppSettings />
          </TabsContent>

          <TabsContent value="meta" className="mt-0">
            <MetaSettings />
          </TabsContent>

          <TabsContent value="telegram" className="mt-0">
            <TelegramSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ChannelsPage;
