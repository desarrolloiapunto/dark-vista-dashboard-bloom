
import { TrendingUpIcon, ZapIcon, Share2, LineChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const MarketingAdsNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const marketingAdsActions = [
    // Campaigns (combined from both)
    { icon: TrendingUpIcon, label: t('sidebar.marketingAds.campaigns'), path: "/marketing-ads/campaigns" },
    // Automation (from marketing)
    { icon: ZapIcon, label: t('sidebar.marketingAds.automation'), path: "/marketing-ads/automation" },
    // Publish (from ads)
    { icon: Share2, label: t('sidebar.marketingAds.publish'), path: "/marketing-ads/publish" },
    // Optimization (from ads)
    { icon: LineChart, label: t('sidebar.marketingAds.optimization'), path: "/marketing-ads/optimization" },
    // Reports (combined from both)
    { icon: BarChart, label: t('sidebar.marketingAds.reports'), path: "/marketing-ads/reports" },
  ];

  return (
    <>
      {marketingAdsActions.map(({ icon: Icon, label, path }) => (
        <Button
          key={path}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            location.pathname === path && "bg-accent text-accent-foreground font-medium"
          )}
          asChild
        >
          <Link to={path}>
            <Icon size={18} className="flex-shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        </Button>
      ))}
    </>
  );
};
