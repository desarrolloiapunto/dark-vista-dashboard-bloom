
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
  Plus,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { mockLabels } from "@/data/labels";
import { Badge } from "@/components/ui/badge";

export function EmailNavigation() {
  const location = useLocation();
  const { t } = useTranslation();
  const [labelsOpen, setLabelsOpen] = useState(false);

  const emailNavItems = [
    { icon: Inbox, label: "Bandeja de Entrada", path: "/emails/inbox", badge: 3 },
    { icon: Send, label: "Enviados", path: "/emails/sent" },
    { icon: FileText, label: "Borradores", path: "/emails/drafts", badge: 1 },
    { icon: AlertOctagon, label: "Spam", path: "/emails/spam", badge: 2 },
    { icon: Trash2, label: "Papelera", path: "/emails/trash" },
    { icon: Star, label: "Destacados", path: "/emails/starred" },
    { icon: Settings, label: "Configuración", path: "/settings/emails" },
  ];

  return (
    <div className="space-y-1">
      <Button
        variant="default"
        className="w-full justify-start gap-2 mb-4"
        asChild
      >
        <Link to="/emails/compose">
          <Plus size={18} />
          Nuevo Correo
        </Link>
      </Button>
      
      {emailNavItems.map(({ icon: Icon, label, path, badge }) => {
        const isActive = location.pathname === path;
        return (
          <Button
            key={path}
            variant="ghost"
            className={cn(
              "w-full justify-between gap-2",
              isActive && "bg-accent text-accent-foreground"
            )}
            asChild
          >
            <Link to={path}>
              <div className="flex items-center">
                <Icon size={18} className="mr-2" />
                {label}
              </div>
              {badge && (
                <Badge variant="secondary" className="ml-auto">
                  {badge}
                </Badge>
              )}
            </Link>
          </Button>
        );
      })}
      
      <Collapsible
        open={labelsOpen}
        onOpenChange={setLabelsOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between",
              location.pathname === "/emails/labels" && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center">
              <Tag size={18} className="mr-2" />
              Etiquetas
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-1">
          {mockLabels.map((label) => (
            <div key={label.id} className="flex items-center px-2 py-1 text-sm">
              <div className={`w-2 h-2 rounded-full bg-${label.color}-500 mr-2`} />
              <span>{label.name}</span>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
            <Plus size={14} className="mr-2" />
            Crear etiqueta
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
