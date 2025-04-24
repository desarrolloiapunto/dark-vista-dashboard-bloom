
import { useState } from "react";
import { StageColumn, Opportunity, OpportunityStage } from "@/types/crm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, DollarSign } from "lucide-react";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { OpportunityCard } from "./OpportunityCard";
import { toast } from "@/hooks/use-toast";

interface OpportunityPipelineProps {
  stageColumns: StageColumn[];
  opportunities: Opportunity[];
  onOpportunityUpdate: (opportunity: Opportunity) => void;
}

export const OpportunityPipeline: React.FC<OpportunityPipelineProps> = ({ 
  stageColumns, 
  opportunities, 
  onOpportunityUpdate 
}) => {
  const [columns, setColumns] = useState<StageColumn[]>(stageColumns);
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const opportunityId = active.id.toString();
    const targetStageId = over.id.toString();
    
    // Encontrar la oportunidad que se está arrastrando
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    // Si ya estaba en esa etapa, no hacemos nada
    if (opportunity.stage === targetStageId) return;
    
    // Actualizar la etapa de la oportunidad
    const updatedOpportunity: Opportunity = {
      ...opportunity,
      stage: targetStageId as OpportunityStage,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // Actualizar probabilidades basadas en la etapa
    if (targetStageId === "prospecting") updatedOpportunity.probability = 10;
    else if (targetStageId === "qualification") updatedOpportunity.probability = 30;
    else if (targetStageId === "needs_analysis") updatedOpportunity.probability = 40;
    else if (targetStageId === "proposal") updatedOpportunity.probability = 60;
    else if (targetStageId === "negotiation") updatedOpportunity.probability = 80;
    else if (targetStageId === "closed_won") updatedOpportunity.probability = 100;
    else if (targetStageId === "closed_lost") updatedOpportunity.probability = 0;
    
    // Notificar al componente padre
    onOpportunityUpdate(updatedOpportunity);
    
    // Actualizar el estado local
    const newColumns = columns.map(column => {
      // Remover de la columna antigua
      if (column.id === opportunity.stage) {
        return {
          ...column,
          opportunities: column.opportunities.filter(opp => opp.id !== opportunityId)
        };
      }
      // Añadir a la nueva columna
      if (column.id === targetStageId) {
        return {
          ...column,
          opportunities: [...column.opportunities, updatedOpportunity]
        };
      }
      return column;
    });
    
    setColumns(newColumns);
    
    toast({
      title: "Oportunidad actualizada",
      description: `${opportunity.name} movida a ${columns.find(c => c.id === targetStageId)?.title}`,
    });
  };
  
  const getColumnTotalAmount = (columnId: string) => {
    const column = columns.find(c => c.id === columnId);
    if (!column) return 0;
    return column.opportunities.reduce((sum, opp) => sum + opp.amount, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex flex-col min-w-[280px]">
            <div className="bg-muted rounded-t-md p-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">{column.title}</h3>
                <span className="text-xs text-muted-foreground">{column.opportunities.length} oportunidades</span>
              </div>
              <Badge variant="outline" className="bg-background">
                <DollarSign className="h-3 w-3 mr-1" />
                {formatCurrency(getColumnTotalAmount(column.id))}
              </Badge>
            </div>
            
            <div 
              className="flex flex-col bg-muted/30 rounded-b-md p-2 min-h-[400px] gap-2"
              data-column-id={column.id}
            >
              <SortableContext items={column.opportunities.map(opp => opp.id)} strategy={verticalListSortingStrategy}>
                {column.opportunities.map(opportunity => (
                  <OpportunityCard 
                    key={opportunity.id} 
                    opportunity={opportunity} 
                  />
                ))}
              </SortableContext>
              
              {column.opportunities.length === 0 && (
                <div className="flex items-center justify-center h-20 border-2 border-dashed rounded-md text-sm text-muted-foreground">
                  Arrastra oportunidades aquí
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};
