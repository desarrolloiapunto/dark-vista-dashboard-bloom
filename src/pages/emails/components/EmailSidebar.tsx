
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inbox, Send, FileText, Trash2, AlertOctagon, Tag, Users, BarChart2, Mail } from "lucide-react";
import type { EmailView } from "../EmailLayout";

interface EmailSidebarProps {
  currentView: EmailView;
  onViewChange: (view: EmailView) => void;
}

export function EmailSidebar({ currentView, onViewChange }: EmailSidebarProps) {
  const menuItems = [
    { icon: Inbox, label: "Bandeja de entrada", view: "inbox" as const },
    { icon: Send, label: "Enviados", view: "sent" as const },
    { icon: FileText, label: "Borradores", view: "drafts" as const },
    { icon: AlertOctagon, label: "Spam", view: "spam" as const },
    { icon: Trash2, label: "Papelera", view: "trash" as const },
  ];

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Button className="w-full gap-2">
        <Mail className="h-4 w-4" />
        Nuevo Correo
      </Button>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          {menuItems.map(({ icon: Icon, label, view }) => (
            <Button
              key={view}
              variant={currentView === view ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onViewChange(view)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
          <div className="py-2">
            <div className="text-sm font-semibold py-2">Etiquetas</div>
            {["Personal", "Trabajo", "Facturas", "Importante"].map((label) => (
              <Button key={label} variant="ghost" className="w-full justify-start gap-2">
                <Tag className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
          <div className="py-2">
            <div className="text-sm font-semibold py-2">Marketing</div>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart2 className="h-4 w-4" />
              Campañas
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Segmentación
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
