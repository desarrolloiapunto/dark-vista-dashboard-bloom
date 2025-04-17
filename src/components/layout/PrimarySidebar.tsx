
import { 
  LayoutDashboard, 
  MessageSquare, 
  Mail, 
  Users, 
  TrendingUp, 
  Zap, 
  Image,
  UserRound
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function PrimarySidebar() {
  const location = useLocation();
  
  const modules = [
    {
      icon: LayoutDashboard,
      path: "/",
      title: "Dashboard"
    },
    {
      icon: MessageSquare,
      path: "/conversations",
      title: "Conversaciones"
    },
    {
      icon: Mail,
      path: "/emails",
      title: "Correos"
    },
    {
      icon: Users,
      path: "/crm",
      title: "CRM"
    },
    {
      icon: TrendingUp,
      path: "/marketing",
      title: "Marketing"
    },
    {
      icon: Zap,
      path: "/ads",
      title: "Ads"
    },
    {
      icon: Image,
      path: "/content",
      title: "Manejo de Contenido"
    },
    {
      icon: UserRound,
      path: "/leads",
      title: "Leads"
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
