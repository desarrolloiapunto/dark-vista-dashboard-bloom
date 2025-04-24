
import { useState } from "react";
import { Opportunity } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, PencilIcon, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface OpportunityListProps {
  opportunities: Opportunity[];
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (opportunity: Opportunity) => void;
}

export const OpportunityList = ({ 
  opportunities,
  onEdit,
  onDelete,
}: OpportunityListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");

  const filteredOpportunities = opportunities
    .filter(opp => {
      const matchesSearch = 
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStage === "all") {
        return matchesSearch;
      } else if (filterStage === "open") {
        return matchesSearch && !["closed_won", "closed_lost"].includes(opp.stage);
      } else if (filterStage === "closed") {
        return matchesSearch && ["closed_won", "closed_lost"].includes(opp.stage);
      } else {
        return matchesSearch && opp.stage === filterStage;
      }
    })
    .sort((a, b) => new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime());

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "prospecting":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Prospección</Badge>;
      case "qualification":
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Calificación</Badge>;
      case "needs_analysis":
        return <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">Análisis de Necesidades</Badge>;
      case "proposal":
        return <Badge variant="outline" className="bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200">Propuesta</Badge>;
      case "negotiation":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Negociación</Badge>;
      case "closed_won":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Ganado</Badge>;
      case "closed_lost":
        return <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-200">Perdido</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

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
    <div>
      <div className="flex mb-4 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar oportunidades..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          value={filterStage} 
          onValueChange={setFilterStage}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por etapa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="open">Abiertas</SelectItem>
            <SelectItem value="closed">Cerradas</SelectItem>
            <SelectItem value="prospecting">Prospección</SelectItem>
            <SelectItem value="qualification">Calificación</SelectItem>
            <SelectItem value="needs_analysis">Análisis de Necesidades</SelectItem>
            <SelectItem value="proposal">Propuesta</SelectItem>
            <SelectItem value="negotiation">Negociación</SelectItem>
            <SelectItem value="closed_won">Ganadas</SelectItem>
            <SelectItem value="closed_lost">Perdidas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead>Prob.</TableHead>
              <TableHead>Fecha de cierre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.map(opp => (
              <TableRow key={opp.id}>
                <TableCell className="font-medium">{opp.name}</TableCell>
                <TableCell>{opp.company}</TableCell>
                <TableCell>{formatCurrency(opp.amount)}</TableCell>
                <TableCell>{getStageBadge(opp.stage)}</TableCell>
                <TableCell>{opp.probability}%</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {formatDate(opp.expectedCloseDate)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(opp)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(opp)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOpportunities.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron oportunidades
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
