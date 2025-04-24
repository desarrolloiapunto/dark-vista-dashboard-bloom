
import { useState } from "react";
import { Quote } from "@/types/crm";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, PencilIcon, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface QuotesListProps {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (quote: Quote) => void;
  onExportPDF: (quote: Quote) => void;
}

export const QuotesList = ({ quotes, onEdit, onDelete, onExportPDF }: QuotesListProps) => {
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

  const getQuoteStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Borrador</Badge>;
      case "sent":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Enviada</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Aceptada</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rechazada</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Expirada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Válido hasta</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.length > 0 ? (
            quotes.map(quote => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {quote.name}
                  </div>
                </TableCell>
                <TableCell>{quote.clientName}</TableCell>
                <TableCell>{formatCurrency(quote.totalAmount)}</TableCell>
                <TableCell>{getQuoteStatusBadge(quote.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {formatDate(quote.validUntil)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onExportPDF(quote)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(quote)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(quote)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No se encontraron cotizaciones
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
