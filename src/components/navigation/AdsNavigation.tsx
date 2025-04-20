
import { TrendingUpIcon, Share2, LineChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const AdsNavigation = () => {
  const location = useLocation();
  const adsActions = [
    { icon: TrendingUpIcon, label: "Campañas de Anuncios", path: "/ads/campaigns" },
    { icon: Share2, label: "Publicación Unificada", path: "/ads/publish" },
    { icon: LineChart, label: "Optimización", path: "/ads/optimization" },
    { icon: BarChart, label: "Reportes y Métricas", path: "/ads/reports" },
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
