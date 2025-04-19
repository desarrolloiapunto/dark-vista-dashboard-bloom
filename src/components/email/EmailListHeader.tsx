
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function EmailListHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12"></TableHead>
        <TableHead className="w-56">Remitente</TableHead>
        <TableHead>Asunto</TableHead>
        <TableHead className="w-32">Etiquetas</TableHead>
        <TableHead className="text-right w-24">Fecha</TableHead>
      </TableRow>
    </TableHeader>
  );
}
