
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  BarChart3,
  MessageCircle,
  Inbox,
  Settings,
  ZapIcon,
  UsersIcon,
  Building2,
  CheckSquare,
  LineChart,
  PieChart,
  TrendingUpIcon,
  FileBarChart,
  Calendar,
  Share2,
  BookOpen,
  BarChart,
  UserCheck,
  MapPin,
  History,
  Send,
  FileText,
  AlertOctagon,
  Trash2,
  Star,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmailNavigation } from "@/components/email/EmailNavigation";

export function SecondarySidebar() {
  const location = useLocation();

  // Dashboard actions
  const dashboardActions = [
    { icon: Home, label: "Resumen General", path: "/" },
    { icon: BarChart3, label: "Análisis por Módulos", path: "/analytics" },
  ];

  // Conversations actions
  const conversationsActions = [
    { icon: BarChart3, label: "Dashboard", path: "/conversations/dashboard" },
    { icon: Inbox, label: "Bandeja de Entrada", path: "/conversations" },
    { icon: ZapIcon, label: "Flujos de Trabajo", path: "/conversations/workflows" },
    { icon: Settings, label: "Configuración", path: "/conversations/settings" },
  ];

  // Email actions
  const emailActions = [
    { icon: Inbox, label: "Bandeja de Entrada", path: "/emails/inbox" },
    { icon: Send, label: "Enviados", path: "/emails/sent" },
    { icon: FileText, label: "Borradores", path: "/emails/drafts" },
    { icon: AlertOctagon, label: "Spam", path: "/emails/spam" },
    { icon: Trash2, label: "Papelera", path: "/emails/trash" },
    { icon: Star, label: "Destacados", path: "/emails/starred" },
    { icon: Tag, label: "Etiquetas", path: "/emails/labels" },
    { icon: Settings, label: "Configuración", path: "/emails/settings" },
  ];

  // CRM actions
  const crmActions = [
    { icon: UsersIcon, label: "Contactos", path: "/crm/contacts" },
    { icon: Building2, label: "Empresas", path: "/crm/companies" },
    { icon: CheckSquare, label: "Tareas", path: "/crm/tasks" },
    { icon: LineChart, label: "Oportunidades", path: "/crm/opportunities" },
    { icon: PieChart, label: "Reportes", path: "/crm/reports" },
  ];

  // Marketing actions
  const marketingActions = [
    {
      icon: TrendingUpIcon,
      label: "Campañas Publicitarias",
      path: "/marketing/campaigns",
    },
    { icon: ZapIcon, label: "Automatización", path: "/marketing/automation" },
    { icon: FileBarChart, label: "Anuncios", path: "/marketing/ads" },
    { icon: BarChart, label: "Reportes", path: "/marketing/reports" },
  ];

  // Ads actions
  const adsActions = [
    {
      icon: TrendingUpIcon,
      label: "Campañas de Anuncios",
      path: "/ads/campaigns",
    },
    { icon: Share2, label: "Publicación Unificada", path: "/ads/publish" },
    { icon: LineChart, label: "Optimización", path: "/ads/optimization" },
    { icon: BarChart, label: "Reportes y Métricas", path: "/ads/reports" },
  ];

  // Content management actions
  const contentActions = [
    {
      icon: Calendar,
      label: "Calendario de Publicaciones",
      path: "/content/calendar",
    },
    { icon: Share2, label: "Publicación Unificada", path: "/content/publish" },
    {
      icon: Settings,
      label: "Personalización por Red",
      path: "/content/customize",
    },
    {
      icon: BookOpen,
      label: "Biblioteca de Contenido",
      path: "/content/library",
    },
    {
      icon: BarChart,
      label: "Reportes de Engagement",
      path: "/content/reports",
    },
  ];

  // Leads actions
  const leadsActions = [
    { icon: UsersIcon, label: "Gestión de Leads", path: "/leads/management" },
    { icon: MapPin, label: "Origen de Leads", path: "/leads/sources" },
    {
      icon: UserCheck,
      label: "Asignación de Leads",
      path: "/leads/assignment",
    },
    { icon: History, label: "Seguimiento de Leads", path: "/leads/tracking" },
    { icon: ZapIcon, label: "Automatización", path: "/leads/automation" },
    { icon: BarChart, label: "Reportes", path: "/leads/reports" },
  ];

  // Determine which actions to show
  let actions = dashboardActions;
  let title = "Dashboard";

  if (location.pathname.startsWith("/conversations")) {
    actions = conversationsActions;
    title = "Conversaciones";
  } else if (location.pathname.startsWith("/emails")) {
    return (
      <div className="fixed left-16 top-0 z-30 h-screen w-56 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Correos</h2>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <EmailNavigation />
        </div>
      </div>
    );
  } else if (location.pathname.startsWith("/crm")) {
    actions = crmActions;
    title = "CRM";
  } else if (location.pathname.startsWith("/marketing")) {
    actions = marketingActions;
    title = "Marketing";
  } else if (location.pathname.startsWith("/ads")) {
    actions = adsActions;
    title = "Ads";
  } else if (location.pathname.startsWith("/content")) {
    actions = contentActions;
    title = "Manejo de Contenido";
  } else if (location.pathname.startsWith("/leads")) {
    actions = leadsActions;
    title = "Leads";
  } else if (location.pathname === "/analytics") {
    actions = dashboardActions;
    title = "Análisis";
  }

  return (
    <div className="fixed left-16 top-0 z-30 h-screen w-56 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-4 flex flex-col gap-2">
        {actions.map(({ icon: Icon, label, path }) => (
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
    </div>
  );
}
