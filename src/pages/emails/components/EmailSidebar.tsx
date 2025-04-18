
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Inbox, 
  Send, 
  FileText, 
  Trash2, 
  AlertOctagon, 
  Tag, 
  Users, 
  BarChart2, 
  Mail, 
  PlusCircle 
} from "lucide-react";
import type { EmailView } from "../EmailLayout";
import { mockLabels } from "../data/mockEmails";
import { cn } from "@/lib/utils";

interface EmailSidebarProps {
  currentView: EmailView;
  onViewChange: (view: EmailView) => void;
}

export function EmailSidebar({ currentView, onViewChange }: EmailSidebarProps) {
  const menuItems = [
    { icon: Inbox, label: "Bandeja de entrada", view: "inbox" as const, count: 3 },
    { icon: Send, label: "Enviados", view: "sent" as const },
    { icon: FileText, label: "Borradores", view: "drafts" as const, count: 1 },
    { icon: AlertOctagon, label: "Spam", view: "spam" as const, count: 5 },
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
          {menuItems.map(({ icon: Icon, label, view, count }) => (
            <Button
              key={view}
              variant={currentView === view ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onViewChange(view)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{label}</span>
              {count && (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              )}
            </Button>
          ))}

          <div className="py-2">
            <div className="flex items-center justify-between text-sm font-semibold py-2">
              <span>Etiquetas</span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            {mockLabels.map((label) => (
              <Button 
                key={label.id} 
                variant="ghost" 
                className="w-full justify-start gap-2"
              >
                <Tag className={`h-4 w-4 text-${label.color}-500`} />
                {label.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
