
import { Quote } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface OpportunityQuotesProps {
  quotes: Quote[];
}

export const OpportunityQuotes = ({ quotes }: OpportunityQuotesProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Válida hasta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.length > 0 ? (
            quotes.map(quote => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">{quote.name}</TableCell>
                <TableCell>{formatCurrency(quote.totalAmount)}</TableCell>
                <TableCell>
                  {quote.status === "draft" && <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Borrador</Badge>}
                  {quote.status === "sent" && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Enviada</Badge>}
                  {quote.status === "accepted" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Aceptada</Badge>}
                  {quote.status === "rejected" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Rechazada</Badge>}
                  {quote.status === "expired" && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Expirada</Badge>}
                </TableCell>
                <TableCell>{formatDate(quote.validUntil)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No hay cotizaciones relacionadas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
