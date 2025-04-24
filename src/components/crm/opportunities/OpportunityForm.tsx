
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Opportunity, Company } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";

interface OpportunityFormProps {
  opportunity: Partial<Opportunity>;
  companies: Company[];
  onOpportunityChange: (opportunity: Partial<Opportunity>) => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const OpportunityForm = ({
  opportunity,
  companies,
  onOpportunityChange,
  selectedDate,
  onDateChange,
}: OpportunityFormProps) => {
  return (
    <div className="grid gap-4 py-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nombre*</Label>
        <Input 
          id="name" 
          value={opportunity.name || ""} 
          onChange={(e) => onOpportunityChange({...opportunity, name: e.target.value})}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Empresa*</Label>
        <Select 
          onValueChange={(value) => onOpportunityChange({...opportunity, company: value})}
          value={opportunity.company}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una empresa" />
          </SelectTrigger>
          <SelectContent>
            {companies.map(company => (
              <SelectItem key={company.id} value={company.name}>{company.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">Monto*</Label>
          <Input 
            id="amount" 
            type="number" 
            min="0"
            value={opportunity.amount || ""} 
            onChange={(e) => onOpportunityChange({
              ...opportunity, 
              amount: parseFloat(e.target.value) || 0
            })}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="stage">Etapa</Label>
          <Select 
            onValueChange={(value) => onOpportunityChange({
              ...opportunity, 
              stage: value as any
            })}
            value={opportunity.stage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona etapa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prospecting">Prospección</SelectItem>
              <SelectItem value="qualification">Calificación</SelectItem>
              <SelectItem value="needs_analysis">Análisis de Necesidades</SelectItem>
              <SelectItem value="proposal">Propuesta</SelectItem>
              <SelectItem value="negotiation">Negociación</SelectItem>
              <SelectItem value="closed_won">Ganada</SelectItem>
              <SelectItem value="closed_lost">Perdida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="probability">Probabilidad (%)</Label>
          <Input 
            id="probability" 
            type="number" 
            min="0"
            max="100"
            value={opportunity.probability || ""} 
            onChange={(e) => onOpportunityChange({
              ...opportunity, 
              probability: parseInt(e.target.value) || 0
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="closeDate">Fecha estimada de cierre</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notas</Label>
        <Textarea 
          id="notes" 
          value={opportunity.notes || ""} 
          onChange={(e) => onOpportunityChange({...opportunity, notes: e.target.value})}
        />
      </div>
    </div>
  );
};
