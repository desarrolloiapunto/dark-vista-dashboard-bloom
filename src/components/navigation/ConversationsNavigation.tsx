
import { BarChart3, Inbox, ZapIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const ConversationsNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const conversationsActions = [
    { icon: BarChart3, label: t('sidebar.conversations.dashboard'), path: "/conversations/dashboard" },
    { icon: Inbox, label: t('sidebar.conversations.inbox'), path: "/conversations" },
    { icon: ZapIcon, label: t('sidebar.conversations.workflows'), path: "/conversations/workflows" },
    { icon: Settings, label: t('sidebar.conversations.settings'), path: "/conversations/settings" },
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
