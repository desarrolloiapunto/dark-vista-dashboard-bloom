
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { marketingCampaigns } from "@/data/dashboardData";

export const MarketingCampaigns = () => {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Campañas de Marketing</CardTitle>
          <CardDescription>Tienes {marketingCampaigns.length} campañas activas</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {marketingCampaigns.map(campaign => (
            <div key={campaign.id} className="flex items-center">
              <Share2 className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{campaign.name}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                    campaign.status === 'planned' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Alcance: {campaign.reach.toLocaleString()}</span>
                  <span>Conversión: {campaign.conversion}%</span>
                  <span>Presupuesto: €{campaign.budget.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
