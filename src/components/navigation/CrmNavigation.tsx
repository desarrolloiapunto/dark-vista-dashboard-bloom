
import { Home, UsersIcon, Building2, CheckSquare, LineChart, UserCheck, MapPin, History, ZapIcon, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const CrmNavigation = () => {
  const location = useLocation();
  const crmActions = [
    { icon: Home, label: "Dashboard CRM", path: "/crm" },
    { icon: UsersIcon, label: "Contactos", path: "/crm/contacts" },
    { icon: Building2, label: "Empresas", path: "/crm/companies" },
    { icon: CheckSquare, label: "Tareas", path: "/crm/tasks" },
    { icon: LineChart, label: "Oportunidades", path: "/crm/opportunities" },
    { icon: UserCheck, label: "Gestión de Leads", path: "/crm/leads" },
    { icon: MapPin, label: "Origen de Leads", path: "/crm/leads/sources" },
    { icon: History, label: "Seguimiento", path: "/crm/leads/tracking" },
    { icon: ZapIcon, label: "Automatización", path: "/crm/leads/automation" },
    { icon: PieChart, label: "Reportes", path: "/crm/reports" },
  ];

  return (
    <>
      {crmActions.map(({ icon: Icon, label, path }) => (
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
