
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationSettings } from "./organization/OrganizationSettings";
import { NotificationSettings } from "./NotificationSettings";
import { DisplaySettings } from "./DisplaySettings";

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("organization");

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="organization" className="text-sm">
            {t('settings.organization')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">
            {t('settings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="display" className="text-sm">
            {t('settings.display')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="organization" className="mt-6">
          <OrganizationSettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="display" className="mt-6">
          <DisplaySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
