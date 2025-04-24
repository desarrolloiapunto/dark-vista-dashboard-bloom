
import { useState } from "react";
import { Opportunity } from "@/types/crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OpportunityForm } from "@/components/crm/opportunities/OpportunityForm";
import { toast } from "@/hooks/use-toast";

interface CreateOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpportunityCreate: (opportunity: Opportunity) => void;
  companies: any[];
}

export const CreateOpportunityDialog = ({
  open,
  onOpenChange,
  onOpportunityCreate,
  companies,
}: CreateOpportunityDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newOpportunity, setNewOpportunity] = useState<Partial<Opportunity>>({
    name: "",
    company: "",
    amount: 0,
    stage: "prospecting",
    probability: 10,
    expectedCloseDate: new Date().toISOString().split('T')[0],
    notes: "",
    owner: "Usuario Actual"
  });

  const handleCreateOpportunity = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const opportunity: Opportunity = {
      id,
      name: newOpportunity.name || "",
      company: newOpportunity.company || "",
      amount: newOpportunity.amount || 0,
      stage: newOpportunity.stage as any,
      probability: newOpportunity.probability || 10,
      expectedCloseDate: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      notes: newOpportunity.notes,
      owner: "Usuario Actual",
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    onOpportunityCreate(opportunity);
    setNewOpportunity({
      name: "",
      company: "",
      amount: 0,
      stage: "prospecting",
      probability: 10,
      expectedCloseDate: new Date().toISOString().split('T')[0],
      notes: "",
      owner: "Usuario Actual"
    });
    setSelectedDate(new Date());
    onOpenChange(false);
    toast({
      title: "Oportunidad creada",
      description: `La oportunidad ${opportunity.name} ha sido creada con éxito.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir Nueva Oportunidad</DialogTitle>
        </DialogHeader>
        <OpportunityForm
          opportunity={newOpportunity}
          companies={companies}
          onOpportunityChange={setNewOpportunity}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCreateOpportunity} 
            disabled={!newOpportunity.name || !newOpportunity.company || !newOpportunity.amount}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
