
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  MessageSquare,
  Mail, 
  Settings,
  Users,
  Shield, 
  Key
} from "lucide-react";
import { cn } from "@/lib/utils";

export const SettingsNavigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    {
      href: "/settings",
      label: t('settings.general'),
      icon: Settings,
    },
    {
      href: "/settings/channels",
      label: t('settings.channels'),
      icon: MessageSquare,
    },
    {
      href: "/settings/users",
      label: t('settings.users'),
      icon: Users,
    },
    {
      href: "/settings/permissions",
      label: t('settings.permissions'),
      icon: Shield,
    },
    {
      href: "/settings/api",
      label: t('settings.apiKeys'),
      icon: Key,
    },
    {
      href: "/settings/emails",
      label: t('settings.emails'),
      icon: Mail,
    }
  ];

  return (
    <div className="space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-foreground",
            location.pathname === link.href
              ? "gradient-bg text-white"
              : "text-muted-foreground"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};
