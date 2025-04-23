
import { 
  LayoutDashboard, 
  MessageSquare, 
  Mail, 
  Users, 
  TrendingUp, 
  Zap, 
  Image,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function PrimarySidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const modules = [
    {
      icon: LayoutDashboard,
      path: "/",
      title: t('navigation.dashboard')
    },
    {
      icon: MessageSquare,
      path: "/conversations",
      title: t('navigation.conversations')
    },
    {
      icon: Mail,
      path: "/emails",
      title: t('navigation.emails')
    },
    {
      icon: Users,
      path: "/crm",
      title: t('navigation.crm')
    },
    {
      icon: TrendingUp,
      path: "/marketing",
      title: t('navigation.marketing')
    },
    {
      icon: Zap,
      path: "/ads",
      title: t('navigation.ads')
    },
    {
      icon: Image,
      path: "/content",
      title: t('navigation.content')
    }
  ];

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-16 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-center border-b border-white/10">
        <span className="font-bold text-2xl">M</span>
      </div>
      <nav className="flex flex-col items-center gap-4 p-4">
        {modules.map(({ icon: Icon, path, title }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
              location.pathname.startsWith(path === "/" ? "/analytics" : path) ||
                (path === "/" && location.pathname === "/") 
                ? "bg-primary text-primary-foreground" 
                : ""
            )}
            title={title}
          >
            <Icon size={20} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
