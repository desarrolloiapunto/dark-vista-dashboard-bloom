
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { CalendarDays, FolderIcon, TrendingUp, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

// Datos simulados para el panel
const engagementData = [
  { name: "Lun", value: 400 },
  { name: "Mar", value: 300 },
  { name: "Mié", value: 500 },
  { name: "Jue", value: 700 },
  { name: "Vie", value: 400 },
  { name: "Sáb", value: 300 },
  { name: "Dom", value: 200 },
];

const ContentDashboard = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('content.dashboard.title')}</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          {t('content.dashboard.createContent')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('content.dashboard.scheduledPosts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">
                  {t('content.dashboard.nextWeek')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('content.dashboard.libraryAssets')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FolderIcon className="h-8 w-8 text-amber-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">143</p>
                <p className="text-xs text-muted-foreground">
                  {t('content.dashboard.totalAssets')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('content.dashboard.engagement')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">+24%</p>
                <p className="text-xs text-muted-foreground">
                  {t('content.dashboard.vsLastWeek')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('content.dashboard.weeklyEngagement')}</CardTitle>
          <CardDescription>
            {t('content.dashboard.engagementDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('content.dashboard.recentPosts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {Array.from({length: 3}).map((_, i) => (
                <li key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs">IMG</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {t('content.dashboard.postTitle')} {i + 1}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('content.dashboard.publishedOn')} {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('content.dashboard.upcomingPosts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {Array.from({length: 3}).map((_, i) => (
                <li key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <CalendarDays size={24} className="text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {t('content.dashboard.scheduledPostTitle')} {i + 1}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() + 86400000 * (i + 1)).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDashboard;
