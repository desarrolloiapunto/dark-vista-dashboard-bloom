
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { OverviewTabContent, AnalyticsTabContent, ReportsTabContent } from "@/components/dashboard/TabContent";
import { MarketingCampaigns } from "@/components/dashboard/MarketingCampaigns";
import { DashboardReports } from "@/components/dashboard/DashboardReports";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
      </div>
      
      {/* Main Metrics */}
      <MetricsCards />

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('dashboard.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('dashboard.tabs.analytics')}</TabsTrigger>
          <TabsTrigger value="reports">{t('dashboard.tabs.reports')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTabContent />
          <MarketingCampaigns />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTabContent />
        </TabsContent>
        
        <TabsContent value="reports">
          <DashboardReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
