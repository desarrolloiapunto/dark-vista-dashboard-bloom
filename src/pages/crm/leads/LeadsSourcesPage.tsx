
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeadsSourcesPage() {
  const sources = [
    { name: "Sitio Web", count: 45, conversion: "12%" },
    { name: "Redes Sociales", count: 32, conversion: "8%" },
    { name: "Referencias", count: 28, conversion: "15%" },
    { name: "Email Marketing", count: 24, conversion: "10%" },
    { name: "Eventos", count: 18, conversion: "20%" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Origen de Leads</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Fuentes de Leads</CardTitle>
          <CardDescription>
            Análisis de las diferentes fuentes de captación de leads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fuente</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Tasa de Conversión</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>{source.count}</TableCell>
                  <TableCell>{source.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
