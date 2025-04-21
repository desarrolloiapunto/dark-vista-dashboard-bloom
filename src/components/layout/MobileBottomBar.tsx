
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Users,
  TrendingUp,
  Zap,
  Image,
  Calendar,
  Share2,
  Settings,
  BookOpen,
  BarChart,
  Inbox,
  Zap as ZapIcon,
  FileText,
  Grid,
  List
} from "lucide-react";

const PRIMARY_ICONS = [
  { icon: LayoutDashboard, path: "/", label: "Dashboard" },
  { icon: MessageSquare, path: "/conversations", label: "Conversaciones" },
  { icon: Mail, path: "/emails", label: "Correos" },
  { icon: Users, path: "/crm", label: "CRM" },
  { icon: TrendingUp, path: "/marketing", label: "Marketing" },
  { icon: Zap, path: "/ads", label: "Ads" },
  { icon: Image, path: "/content", label: "Contenido" }
];

const SECONDARY_CONTEXT = [
  {
    start: "/content",
    items: [
      { icon: Calendar, path: "/content", label: "Calendario" },
      { icon: Share2, path: "/content/publish", label: "Publicar" },
      { icon: Settings, path: "/content/customize", label: "Personalizar" },
      { icon: BookOpen, path: "/content/library", label: "Biblioteca" },
      { icon: BarChart, path: "/content/reports", label: "Reportes" }
    ]
  },
  {
    start: "/conversations",
    items: [
      { icon: BarChart, path: "/conversations/dashboard", label: "Dashboard" },
      { icon: Inbox, path: "/conversations", label: "Bandeja" },
      { icon: ZapIcon, path: "/conversations/workflows", label: "Flujos" },
      { icon: Settings, path: "/conversations/settings", label: "Config" }
    ]
  },
  {
    start: "/crm",
    items: [
      { icon: Users, path: "/crm/contacts", label: "Contactos" },
      { icon: Users, path: "/crm/companies", label: "Empresas" },
      { icon: FileText, path: "/crm/tasks", label: "Tareas" },
      { icon: ZapIcon, path: "/crm/opportunities", label: "Oportunid." },
      { icon: BarChart, path: "/crm/reports", label: "Reportes" }
    ]
  },
  {
    start: "/marketing",
    items: [
      { icon: TrendingUp, path: "/marketing/campaigns", label: "Campañas" },
      { icon: Zap, path: "/marketing/automation", label: "Auto." },
      { icon: FileText, path: "/marketing/ads", label: "Anuncios" },
      { icon: BarChart, path: "/marketing/reports", label: "Reportes" }
    ]
  },
  {
    start: "/ads",
    items: [
      { icon: TrendingUp, path: "/ads/campaigns", label: "Campañas" },
      { icon: Share2, path: "/ads/publish", label: "Publicar" },
      { icon: BarChart, path: "/ads/optimization", label: "Optimizar" },
      { icon: BarChart, path: "/ads/reports", label: "Reportes" }
    ]
  },
  {
    start: "/emails",
    items: [
      { icon: Mail, path: "/emails", label: "Bandeja" },
    ]
  }
];

function getSecondaryItems(pathname: string) {
  const match = SECONDARY_CONTEXT.find((ctx) => pathname.startsWith(ctx.start));
  return match ? match.items : [];
}

export function MobileBottomBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Solo muestra barra en móviles (md:hidden)
  // Se muestran los iconos principales y el contexto actual a la derecha (hasta 4 de cada uno).
  const secondary = getSecondaryItems(pathname);

  // Prioridad: Módulos principales, luego atajos contexto
  const mainToShow = PRIMARY_ICONS.slice(0, 4);
  const contextToShow = secondary.slice(0, 4);

  // Muestra hasta 4 iconos principales y hasta 4 contexto
  const items = [
    ...mainToShow.map((i) => ({ ...i, context: false })),
    ...contextToShow.map((i) => ({ ...i, context: true })),
  ];

  // Oculta duplicados (por si el icono de contexto también se muestra como principal)
  const uniqueItems = items.filter(
    (item, idx, arr) =>
      arr.findIndex((it) => it.path === item.path) === idx
  );

  return (
    <nav className="fixed z-50 bottom-0 left-0 w-full bg-background/90 border-t border-muted shadow-lg flex md:hidden">
      {uniqueItems.map(({ icon: Icon, path, label, context }) => (
        <button
          key={path}
          aria-label={label}
          className={cn(
            "flex-1 flex flex-col items-center justify-center py-1 px-2 group",
            pathname === path
              ? "text-primary"
              : "text-muted-foreground"
          )}
          onClick={() => navigate(path)}
        >
          <Icon size={22} className="mx-auto mb-0.5" />
          <span className={cn("text-[10px] leading-tight", context && "opacity-70")}>
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default MobileBottomBar;
