
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Calendar, 
  Settings,
  PieChart,
  TrendingUp,
  Activity
} from "lucide-react";

export function SecondarySidebar() {
  const location = useLocation();
  
  const dashboardActions = [
    { icon: Home, label: "Inicio" },
    { icon: Users, label: "Usuarios" },
    { icon: Calendar, label: "Calendario" },
    { icon: Settings, label: "Configuración" }
  ];

  const analyticsActions = [
    { icon: PieChart, label: "Métricas" },
    { icon: TrendingUp, label: "Tendencias" },
    { icon: Activity, label: "Actividad" }
  ];

  const actions = location.pathname === "/analytics" ? analyticsActions : dashboardActions;

  return (
    <div className="fixed left-16 top-0 z-30 h-screen w-56 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">
          {location.pathname === "/analytics" ? "Análisis" : "Dashboard"}
        </h2>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {actions.map(({ icon: Icon, label }) => (
          <Button
            key={label}
            variant="ghost"
            className="w-full justify-start gap-2"
          >
            <Icon size={18} />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
