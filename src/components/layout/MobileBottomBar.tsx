
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
  Menu
} from "lucide-react";
import * as React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// CONTEXT ICONS (secundario) traídos igual que antes
import {
  Calendar,
  Share2,
  Settings,
  BookOpen,
  BarChart,
  Inbox,
  Zap as ZapIcon,
  FileText
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
      { icon: Mail, path: "/emails", label: "Bandeja" }
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

  // Items contextuales (secundario)
  const secondary = getSecondaryItems(pathname);

  // Iconos principales (siempre los primeros 5 en móvil)
  const mainToShow = PRIMARY_ICONS.slice(0, 5);

  // Mostrar sólo los ICONOS, no etiquetas, en barra inferior
  // Si hay contexto, mostrar botón "menú" (abrir Drawer)
  const showMenuBtn = secondary.length > 0;

  // Si hay menos de 4 iconos primarios, compensar con botón menú para centrar mejor
  let iconsToShow = mainToShow;
  if (mainToShow.length === 4 && showMenuBtn) {
    // Si exactos 4 y contexto, ponemos el menú como central (icono 2)
    iconsToShow = [
      mainToShow[0],
      mainToShow[1],
      { icon: Menu, label: "Contexto", path: "__drawer__" },
      mainToShow[2],
      mainToShow[3]
    ];
  } else if (mainToShow.length >= 5 && showMenuBtn) {
    // Si hay 5, reemplazamos el del medio por el botón menú
    iconsToShow = [
      mainToShow[0],
      mainToShow[1],
      { icon: Menu, label: "Contexto", path: "__drawer__" },
      mainToShow[3],
      mainToShow[4],
    ];
  }

  // Estado para el Drawer
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Drawer de contexto secundario, móvil */}
      {showMenuBtn && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            {/* Hidden button, se maneja por ítem en barra abajo */}
            <button className="hidden" tabIndex={-1}></button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex justify-center py-3">
              <div className="flex gap-4">
                {secondary.slice(0, 5).map(({ icon: Icon, path, label }) => (
                  <button
                    key={path}
                    className="flex flex-col items-center text-muted-foreground hover:text-primary"
                    onClick={() => {
                      setOpen(false);
                      navigate(path);
                    }}
                  >
                    <Icon size={26} />
                    <span className="text-xs mt-1">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <nav className="fixed z-50 bottom-0 left-0 w-full bg-background/95 border-t border-muted shadow-lg flex md:hidden items-center justify-between px-1">
        {iconsToShow.map((item, idx) => {
          // Item Drawer (menú contextual)
          if (item.path === "__drawer__") {
            return showMenuBtn ? (
              <button
                key="drawer"
                aria-label="Menú de contexto"
                className={cn(
                  "flex flex-1 flex-col items-center justify-center py-1 px-2 group",
                  open ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setOpen(true)}
              >
                <Menu size={24} />
                <span className="text-[10px] leading-tight opacity-80">Menú</span>
              </button>
            ) : null;
          }
          // Botón normal principal
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path === "/" && pathname === "/");
          return (
            <button
              key={item.path}
              aria-label={item.label}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1 px-2 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon size={24} className="mx-auto mb-0.5" />
              <span className="text-[10px] leading-tight opacity-80">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default MobileBottomBar;
