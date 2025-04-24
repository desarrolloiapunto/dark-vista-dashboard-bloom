
import { useState } from "react";
import { Opportunity, Task, Quote } from "@/types/crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { OpportunityForm } from "@/components/crm/opportunities/OpportunityForm";
import { OpportunityTasks } from "@/components/crm/opportunities/OpportunityTasks";
import { OpportunityQuotes } from "@/components/crm/opportunities/OpportunityQuotes";
import { toast } from "@/hooks/use-toast";

interface EditOpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity | null;
  companies: any[];
  relatedTasks: Task[];
  relatedQuotes: Quote[];
  onOpportunityUpdate: (opportunity: Opportunity) => void;
  onOpenTaskDialog: () => void;
  onOpenQuoteDialog: () => void;
}

export const EditOpportunityDialog = ({
  open,
  onOpenChange,
  opportunity,
  companies,
  relatedTasks,
  relatedQuotes,
  onOpportunityUpdate,
  onOpenTaskDialog,
  onOpenQuoteDialog,
}: EditOpportunityDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    opportunity ? new Date(opportunity.expectedCloseDate) : undefined
  );
  const [currentOpportunity, setCurrentOpportunity] = useState<Opportunity | null>(opportunity);

  const handleEditOpportunity = () => {
    if (!currentOpportunity) return;
    
    const updatedOpportunity = {
      ...currentOpportunity,
      expectedCloseDate: selectedDate ? selectedDate.toISOString().split('T')[0] : currentOpportunity.expectedCloseDate,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    onOpportunityUpdate(updatedOpportunity);
    onOpenChange(false);
    toast({
      title: "Oportunidad actualizada",
      description: `La oportunidad ${updatedOpportunity.name} ha sido actualizada con éxito.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Oportunidad</DialogTitle>
        </DialogHeader>
        <div className="pb-4">
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="tasks">Tareas</TabsTrigger>
              <TabsTrigger value="quotes">Cotizaciones</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              {currentOpportunity && (
                <OpportunityForm
                  opportunity={currentOpportunity}
                  companies={companies}
                  onOpportunityChange={(updatedOpp) => setCurrentOpportunity({ ...currentOpportunity, ...updatedOpp })}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              )}
            </TabsContent>
            
            <TabsContent value="tasks">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Tareas relacionadas</h3>
                  <Button size="sm" onClick={onOpenTaskDialog}>
                    <Plus className="mr-2 h-4 w-4" /> Nueva tarea
                  </Button>
                </div>
                <OpportunityTasks tasks={relatedTasks} />
              </div>
            </TabsContent>
            
            <TabsContent value="quotes">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Cotizaciones</h3>
                  <Button size="sm" onClick={onOpenQuoteDialog}>
                    <Plus className="mr-2 h-4 w-4" /> Nueva cotización
                  </Button>
                </div>
                <OpportunityQuotes quotes={relatedQuotes} />
              </div>
            </TabsContent>
            
            <TabsContent value="notes">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notas</h3>
                <Textarea 
                  value={currentOpportunity?.notes || ""} 
                  onChange={(e) => currentOpportunity && setCurrentOpportunity({
                    ...currentOpportunity, 
                    notes: e.target.value
                  })}
                  className="min-h-[200px]"
                  placeholder="Añade notas sobre esta oportunidad..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleEditOpportunity} 
            disabled={!currentOpportunity?.name || !currentOpportunity?.company || !currentOpportunity?.amount}
          >
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
