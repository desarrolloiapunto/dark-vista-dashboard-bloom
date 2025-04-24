
import { Home, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const DashboardNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const dashboardActions = [
    { icon: Home, label: t('sidebar.dashboard.summary'), path: "/" },
    { icon: BarChart3, label: t('sidebar.dashboard.analytics'), path: "/analytics" },
  ];

  return (
    <>
      {dashboardActions.map(({ icon: Icon, label, path }) => (
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
