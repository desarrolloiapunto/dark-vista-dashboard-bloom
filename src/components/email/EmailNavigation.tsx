
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Inbox,
  Send,
  FileText,
  AlertOctagon,
  Trash2,
  Star,
  Tag,
  Settings,
} from "lucide-react";

export const emailNavItems = [
  { icon: Inbox, label: "Bandeja de Entrada", path: "/emails/inbox" },
  { icon: Send, label: "Enviados", path: "/emails/sent" },
  { icon: FileText, label: "Borradores", path: "/emails/drafts" },
  { icon: AlertOctagon, label: "Spam", path: "/emails/spam" },
  { icon: Trash2, label: "Papelera", path: "/emails/trash" },
  { icon: Star, label: "Destacados", path: "/emails/starred" },
  { icon: Tag, label: "Etiquetas", path: "/emails/labels" },
  { icon: Settings, label: "Configuración", path: "/emails/settings" },
];

export function EmailNavigation() {
  const location = useLocation();

  return (
    <>
      {emailNavItems.map(({ icon: Icon, label, path }) => (
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
}
