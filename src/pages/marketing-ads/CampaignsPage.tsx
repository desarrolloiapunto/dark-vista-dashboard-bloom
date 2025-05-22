import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CampaignsPage() {
  const { t } = useTranslation();

  const campaigns = [
    { 
      id: 1, 
      name: t('marketing.campaigns.monthly'), 
      status: 'active', 
      reach: 15000, 
      engagement: '12.5%',
      platform: 'Instagram, Facebook'
    },
    { 
      id: 2, 
      name: t('marketing.campaigns.summer'), 
      status: 'scheduled', 
      reach: 20000, 
      engagement: '0%',
      platform: 'Email, Facebook'
    },
    { 
      id: 3, 
      name: t('marketing.campaigns.product'), 
      status: 'completed', 
      reach: 12500, 
      engagement: '10.2%',
      platform: 'Instagram, Twitter'
    },
    { 
      id: 4, 
      name: t('marketing.campaigns.seasonal'), 
      status: 'draft', 
      reach: 0, 
      engagement: '0%',
      platform: 'Facebook, LinkedIn'
    },
  ];
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('marketing.campaigns.title')}</h1>
          <p className="text-muted-foreground">{t('marketing.campaigns.description')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {t('marketing.campaigns.create')}
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">{t('marketing.campaigns.tabs.all')}</TabsTrigger>
            <TabsTrigger value="active">{t('marketing.campaigns.tabs.active')}</TabsTrigger>
            <TabsTrigger value="scheduled">{t('marketing.campaigns.tabs.scheduled')}</TabsTrigger>
            <TabsTrigger value="completed">{t('marketing.campaigns.tabs.completed')}</TabsTrigger>
            <TabsTrigger value="drafts">{t('marketing.campaigns.tabs.drafts')}</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> {t('marketing.filter')}
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{campaign.name}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                      campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 
                      campaign.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'
                    }`}>
                      {t(`marketing.campaigns.status.${campaign.status}`)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.platform')}</p>
                      <p className="font-medium">{campaign.platform}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.reach')}</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.engagement')}</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4">
            {campaigns.filter(c => c.status === 'active').map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{campaign.name}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {t('marketing.campaigns.status.active')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.platform')}</p>
                      <p className="font-medium">{campaign.platform}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.reach')}</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.engagement')}</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-4">
          <div className="grid gap-4">
            {campaigns.filter(c => c.status === 'scheduled').map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{campaign.name}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      {t('marketing.campaigns.status.scheduled')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.platform')}</p>
                      <p className="font-medium">{campaign.platform}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.reach')}</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.engagement')}</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4">
            {campaigns.filter(c => c.status === 'completed').map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{campaign.name}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                      {t('marketing.campaigns.status.completed')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.platform')}</p>
                      <p className="font-medium">{campaign.platform}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.reach')}</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.engagement')}</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-4">
          <div className="grid gap-4">
            {campaigns.filter(c => c.status === 'draft').map(campaign => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{campaign.name}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                      {t('marketing.campaigns.status.draft')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.platform')}</p>
                      <p className="font-medium">{campaign.platform}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.reach')}</p>
                      <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t('marketing.campaigns.engagement')}</p>
                      <p className="font-medium">{campaign.engagement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
