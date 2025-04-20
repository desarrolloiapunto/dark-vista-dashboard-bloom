
import { Calendar, Share2, Settings, BookOpen, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ContentNavigation = () => {
  const location = useLocation();
  const contentActions = [
    { icon: Calendar, label: "Calendario de Publicaciones", path: "/content/calendar" },
    { icon: Share2, label: "Publicación Unificada", path: "/content/publish" },
    { icon: Settings, label: "Personalización por Red", path: "/content/customize" },
    { icon: BookOpen, label: "Biblioteca de Contenido", path: "/content/library" },
    { icon: BarChart, label: "Reportes de Engagement", path: "/content/reports" },
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
