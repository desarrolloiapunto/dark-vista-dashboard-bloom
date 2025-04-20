
import { BarChart3, Inbox, ZapIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ConversationsNavigation = () => {
  const location = useLocation();
  const conversationsActions = [
    { icon: BarChart3, label: "Dashboard", path: "/conversations/dashboard" },
    { icon: Inbox, label: "Bandeja de Entrada", path: "/conversations" },
    { icon: ZapIcon, label: "Flujos de Trabajo", path: "/conversations/workflows" },
    { icon: Settings, label: "Configuración", path: "/conversations/settings" },
  ];

  return (
    <>
      {conversationsActions.map(({ icon: Icon, label, path }) => (
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
