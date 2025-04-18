
import { Bell, Settings, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../auth/AuthProvider";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  // Function to get the page title based on the current path
  const getPageTitle = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Special case for root path
    if (pathSegments.length === 0) return 'Dashboard';

    // Map of known routes to their titles
    const routeTitles: {[key: string]: string} = {
      'conversations': 'Conversaciones',
      'emails': 'Correos',
      'crm': 'CRM',
      'marketing': 'Marketing',
      'ads': 'Ads',
      'content': 'Manejo de Contenido',
      'leads': 'Leads',
      'profile': 'Perfil de Usuario',
      'analytics': 'Análisis'
    };

    // First segment is the main route
    const mainRoute = pathSegments[0];
    return routeTitles[mainRoute] || mainRoute.charAt(0).toUpperCase() + mainRoute.slice(1);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex flex-1">
          <span className="text-xl font-bold">{getPageTitle()}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={20} />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
              <AvatarFallback>
                {user?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}
