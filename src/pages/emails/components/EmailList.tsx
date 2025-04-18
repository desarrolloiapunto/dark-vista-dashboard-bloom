
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, StarOff } from "lucide-react";
import type { EmailView } from "../EmailLayout";

interface EmailListProps {
  view: EmailView;
}

export function EmailList({ view }: EmailListProps) {
  const emails = [
    {
      id: 1,
      from: "Juan Pérez",
      subject: "Reunión de proyecto",
      preview: "Buenos días, quisiera confirmar la reunión...",
      date: "10:30 AM",
      starred: true,
    },
    {
      id: 2,
      from: "María García",
      subject: "Informe mensual",
      preview: "Adjunto el informe del mes de...",
      date: "Ayer",
      starred: false,
    },
    // More emails...
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Remitente</TableHead>
          <TableHead>Asunto</TableHead>
          <TableHead className="text-right">Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((email) => (
          <TableRow key={email.id} className="cursor-pointer hover:bg-muted/50">
            <TableCell>
              {email.starred ? (
                <Star className="h-4 w-4 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4 text-muted-foreground" />
              )}
            </TableCell>
            <TableCell>{email.from}</TableCell>
            <TableCell>
              <div className="font-medium">{email.subject}</div>
              <div className="text-sm text-muted-foreground">{email.preview}</div>
            </TableCell>
            <TableCell className="text-right">{email.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
