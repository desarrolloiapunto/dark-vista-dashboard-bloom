
import { TrendingUpIcon, Share2, LineChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const AdsNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const adsActions = [
    { icon: TrendingUpIcon, label: t('sidebar.marketingAds.campaigns'), path: "/ads/campaigns" },
    { icon: Share2, label: t('sidebar.marketingAds.publish'), path: "/ads/publish" },
    { icon: LineChart, label: t('sidebar.marketingAds.optimization'), path: "/ads/optimization" },
    { icon: BarChart, label: t('sidebar.marketingAds.reports'), path: "/ads/reports" },
  ];

  return (
    <>
      {adsActions.map(({ icon: Icon, label, path }) => (
        <Button
          key={path}
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            location.pathname === path && "bg-accent text-accent-foreground"
          )}
          asChild
        >
          <Link to={path}>
            <Icon size={18} />
            {label}
          </Link>
        </Button>
      ))}
    </>
  );
};
