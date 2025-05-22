
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export default function MarketingDashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('marketing.dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('marketing.dashboard.description')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('marketing.dashboard.activeCampaigns')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('marketing.dashboard.openRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('marketing.dashboard.subscribers')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,231</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">{t('marketing.tabs.campaigns')}</TabsTrigger>
          <TabsTrigger value="segments">{t('marketing.tabs.segments')}</TabsTrigger>
          <TabsTrigger value="templates">{t('marketing.tabs.templates')}</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('marketing.recentCampaigns')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  t('marketing.campaigns.monthly'),
                  t('marketing.campaigns.summer'),
                  t('marketing.campaigns.product'),
                ].map((campaign) => (
                  <div key={campaign} className="py-3 flex justify-between items-center">
                    <span>{campaign}</span>
                    <span className="text-muted-foreground">{t('marketing.timeAgo')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>{t('marketing.audienceSegments')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  t('marketing.segments.active'),
                  t('marketing.segments.inactive'),
                  t('marketing.segments.new'),
                ].map((segment) => (
                  <div key={segment} className="py-3 flex justify-between items-center">
                    <span>{segment}</span>
                    <span className="text-muted-foreground">{t('marketing.contacts')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>{t('marketing.availableTemplates')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  t('marketing.templates.welcome'),
                  t('marketing.templates.promotion'),
                  t('marketing.templates.newsletter'),
                  t('marketing.templates.reminder')
                ].map((template) => (
                  <div key={template} className="py-3 flex justify-between items-center">
                    <span>{template}</span>
                    <span className="text-muted-foreground">{t('marketing.edit')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
