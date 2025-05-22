
import { BarChart, Calendar, FolderLibrary, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const ContentNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const contentActions = [
    { 
      icon: LayoutDashboard, 
      label: t('content.dashboard.title'), 
      path: "/content" 
    },
    { 
      icon: Calendar, 
      label: t('sidebar.content.calendar'), 
      path: "/content/calendar" 
    },
    { 
      icon: FolderLibrary, 
      label: t('sidebar.content.library'), 
      path: "/content/library" 
    },
    { 
      icon: BarChart, 
      label: t('sidebar.content.metrics'), 
      path: "/content/metrics" 
    },
  ];

  return (
    <>
      {contentActions.map(({ icon: Icon, label, path }) => (
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
