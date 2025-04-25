
import { 
  Home, 
  UsersIcon, 
  Building2, 
  CheckSquare, 
  LineChart, 
  UserCheck, 
  MapPin, 
  Settings, 
  PieChart, 
  Tag, 
  Package,
  UserPlus,
  Inbox,
  Users,
  Star,
  XCircle,
  Plus,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const CrmNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const crmSections = [
    {
      title: "General",
      items: [
        { icon: Home, label: "Dashboard", path: "/crm" },
        { icon: CheckSquare, label: "Tareas", path: "/crm/tasks" },
      ]
    },
    {
      title: "Leads",
      items: [
        { icon: UserPlus, label: "Nuevo Lead", path: "/crm/leads/new" },
        { icon: Inbox, label: "Bandeja de entrada", path: "/crm/leads" },
      ]
    },
    {
      title: "Oportunidades",
      items: [
        { icon: Plus, label: "Nuevas oportunidades", path: "/crm/opportunities/new" },
        { icon: LineChart, label: "Mis oportunidades", path: "/crm/opportunities" },
      ]
    },
    {
      title: "Contactos",
      items: [
        { icon: UsersIcon, label: "Todos los contactos", path: "/crm/contacts" },
        { icon: Building2, label: "Contactos empresas", path: "/crm/contacts/companies" },
        { icon: Building2, label: "Empresas", path: "/crm/companies" },
      ]
    },
    {
      title: "Ventas",
      items: [
        { icon: Tag, label: "Cotizaciones", path: "/crm/quotes" },
        { icon: Package, label: "Productos/Servicios", path: "/crm/products" },
      ]
    },
    {
      title: "Informes",
      items: [
        { icon: PieChart, label: "Informes", path: "/crm/reports" },
      ]
    },
    {
      title: "Configuración",
      items: [
        { icon: MapPin, label: "Fuentes de leads", path: "/crm/leads/sources" },
        { icon: Settings, label: "Etapas de calificación", path: "/crm/settings/qualification-stages" },
        { icon: Settings, label: "Etapas de oportunidad", path: "/crm/settings/opportunity-stages" },
        { icon: Settings, label: "Usuarios y roles", path: "/crm/settings/users" },
        { icon: Settings, label: "Automatizaciones", path: "/crm/leads/automation" },
      ]
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {crmSections.map((section) => (
        <div key={section.title} className="space-y-2">
          <div className="pl-2 text-xs font-medium text-muted-foreground">{section.title}</div>
          {section.items.map(({ icon: Icon, label, path }) => (
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
        </div>
      ))}
    </div>
  );
};

