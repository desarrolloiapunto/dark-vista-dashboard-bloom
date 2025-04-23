import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { BarChart, LineChart, PieChart } from "lucide-react";
import ConversationDashboard from "@/components/conversations/ConversationDashboard";
import { mockConversations } from "@/data/mockConversations";

const DashboardPage = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("7d");

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('dashboard.conversationsAnalytics')}</h1>
        <p className="text-muted-foreground">{t('dashboard.analyticsDescription')}</p>
      </div>

      <div className="flex justify-end mb-6">
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="7d">{t('dashboard.last7Days')}</TabsTrigger>
            <TabsTrigger value="30d">{t('dashboard.last30Days')}</TabsTrigger>
            <TabsTrigger value="90d">{t('dashboard.last90Days')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">
                {t('dashboard.totalConversations')}
              </CardTitle>
              <CardDescription>
                {period === "7d" ? "+12% vs last week" : 
                 period === "30d" ? "+8% vs last month" : 
                 "+15% vs last quarter"}
              </CardDescription>
            </div>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {period === "7d" ? "243" : 
               period === "30d" ? "1,289" : 
               "3,847"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">
                {t('dashboard.responseRate')}
              </CardTitle>
              <CardDescription>
                {period === "7d" ? "+5% vs last week" : 
                 period === "30d" ? "+2% vs last month" : 
                 "+7% vs last quarter"}
              </CardDescription>
            </div>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {period === "7d" ? "94.2%" : 
               period === "30d" ? "92.7%" : 
               "89.5%"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">
                {t('dashboard.avgResponseTime')}
              </CardTitle>
              <CardDescription>
                {period === "7d" ? "-18% vs last week" : 
                 period === "30d" ? "-10% vs last month" : 
                 "-12% vs last quarter"}
              </CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {period === "7d" ? "3.2m" : 
               period === "30d" ? "4.5m" : 
               "5.1m"}
            </div>
          </CardContent>
        </Card>
      </div>

      <ConversationDashboard conversations={mockConversations} />
    </div>
  );
};

export default DashboardPage;
