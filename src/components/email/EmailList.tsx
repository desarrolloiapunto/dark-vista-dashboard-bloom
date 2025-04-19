import { format, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, StarOff, Paperclip } from "lucide-react";
import type { EmailView } from "@/types/email";
import { mockEmails, mockLabels } from "@/data/emails";

interface EmailListProps {
  view: EmailView;
}

export function EmailList({ view }: EmailListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return "Ayer";
    }
    return format(date, "d MMM", { locale: es });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead className="w-56">Remitente</TableHead>
          <TableHead>Asunto</TableHead>
          <TableHead className="w-32">Etiquetas</TableHead>
          <TableHead className="text-right w-24">Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockEmails.map((email) => (
          <TableRow 
            key={email.id} 
            className={`cursor-pointer hover:bg-muted/50 ${!email.isRead ? 'font-medium' : ''}`}
          >
            <TableCell className="flex gap-2">
              {email.isStarred ? (
                <Star className="h-4 w-4 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4 text-muted-foreground" />
              )}
              {email.attachments && (
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              )}
            </TableCell>
            <TableCell>{email.from}</TableCell>
            <TableCell>
              <div className="font-medium">{email.subject}</div>
              <div className="text-sm text-muted-foreground">{email.preview}</div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1 flex-wrap">
                {email.labels.map((labelId) => {
                  const label = mockLabels.find((l) => l.id === labelId);
                  return label ? (
                    <Badge 
                      key={label.id} 
                      variant="secondary"
                      className={`bg-${label.color}-100 text-${label.color}-800 hover:bg-${label.color}-200`}
                    >
                      {label.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {formatDate(email.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
