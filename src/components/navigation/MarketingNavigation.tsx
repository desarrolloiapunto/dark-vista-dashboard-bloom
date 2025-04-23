
import { TrendingUpIcon, ZapIcon, FileBarChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const MarketingNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const marketingActions = [
    { icon: TrendingUpIcon, label: t('sidebar.marketing.campaigns'), path: "/marketing/campaigns" },
    { icon: ZapIcon, label: t('sidebar.marketing.automation'), path: "/marketing/automation" },
    { icon: FileBarChart, label: t('sidebar.marketing.ads'), path: "/marketing/ads" },
    { icon: BarChart, label: t('sidebar.marketing.reports'), path: "/marketing/reports" },
  ];

  return (
    <>
      {marketingActions.map(({ icon: Icon, label, path }) => (
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
