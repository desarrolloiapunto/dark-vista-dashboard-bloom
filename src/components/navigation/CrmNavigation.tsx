
import { Home, UsersIcon, Building2, CheckSquare, LineChart, UserCheck, MapPin, History, ZapIcon, PieChart, Tag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const CrmNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const crmActions = [
    { icon: Home, label: t('sidebar.crm.dashboard'), path: "/crm" },
    { icon: UsersIcon, label: t('sidebar.crm.contacts'), path: "/crm/contacts" },
    { icon: Building2, label: t('sidebar.crm.companies'), path: "/crm/companies" },
    { icon: CheckSquare, label: t('sidebar.crm.tasks'), path: "/crm/tasks" },
    { icon: LineChart, label: t('sidebar.crm.opportunities'), path: "/crm/opportunities" },
    { icon: Tag, label: "Cotizaciones", path: "/crm/quotes" },
    { icon: Package, label: "Productos", path: "/crm/products" },
    { icon: UserCheck, label: t('sidebar.crm.leads'), path: "/crm/leads" },
    { icon: MapPin, label: t('sidebar.crm.leadsSources'), path: "/crm/leads/sources" },
    { icon: History, label: t('sidebar.crm.leadsTracking'), path: "/crm/leads/tracking" },
    { icon: ZapIcon, label: t('sidebar.crm.leadsAutomation'), path: "/crm/leads/automation" },
    { icon: PieChart, label: t('sidebar.crm.reports'), path: "/crm/reports" },
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
