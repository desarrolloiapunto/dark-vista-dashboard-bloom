
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { OverviewTabContent, AnalyticsTabContent, ReportsTabContent } from "@/components/dashboard/TabContent";
import { MarketingCampaigns } from "@/components/dashboard/MarketingCampaigns";

const Index = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Métricas Principales */}
      <MetricsCards />

      {/* Contenido Principal */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewTabContent />
          <MarketingCampaigns />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTabContent />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
