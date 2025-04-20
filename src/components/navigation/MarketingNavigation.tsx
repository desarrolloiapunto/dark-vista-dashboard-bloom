
import { TrendingUpIcon, ZapIcon, FileBarChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MarketingNavigation = () => {
  const location = useLocation();
  const marketingActions = [
    { icon: TrendingUpIcon, label: "Campañas Publicitarias", path: "/marketing/campaigns" },
    { icon: ZapIcon, label: "Automatización", path: "/marketing/automation" },
    { icon: FileBarChart, label: "Anuncios", path: "/marketing/ads" },
    { icon: BarChart, label: "Reportes", path: "/marketing/reports" },
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
