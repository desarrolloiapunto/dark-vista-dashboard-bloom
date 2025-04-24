
import { useState } from "react";
import { StageColumn, Opportunity, OpportunityStage } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
import { 
  DndContext, 
  DragEndEvent, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DragOverlay,
  DragStartEvent
} from "@dnd-kit/core";
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
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
  // Procesamos las columnas para distribuir las oportunidades correctamente
  const processedColumns = stageColumns.map(col => ({
    ...col,
    opportunities: opportunities.filter(opp => opp.stage === col.id)
  }));
  
  const [columns, setColumns] = useState<StageColumn[]>(processedColumns);
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  
  // Configuramos los sensores para mejorar la detección de arrastrar
  const mouseSensor = useSensor(MouseSensor, {
    // Reducimos la distancia para activar el arrastre
    activationConstraint: {
      distance: 5,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    // Hacemos más sensible el arrastre en dispositivos táctiles
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);
  
  // Manejamos el inicio del arrastre
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const opportunityId = active.id.toString();
    
    // Encontrar la oportunidad que se está arrastrando
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (opportunity) {
      setActiveOpportunity(opportunity);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveOpportunity(null);
    
    if (!over) return;
    
    const opportunityId = active.id.toString();
    const targetStageId = over.id.toString();
    
    // Verificamos si el targetStageId corresponde a una etapa válida
    const isValidStage = stageColumns.some(col => col.id === targetStageId);
    if (!isValidStage) return;
    
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
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex overflow-x-auto gap-6 pb-8 pt-2">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-[300px]" id={column.id}>
            <div className="bg-muted rounded-t-md p-3 flex items-center justify-between sticky top-0">
              <div>
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <span className="text-xs text-muted-foreground">{column.opportunities.length} oportunidades</span>
              </div>
              <Badge variant="outline" className="bg-background">
                <DollarSign className="h-3 w-3 mr-1" />
                {formatCurrency(getColumnTotalAmount(column.id))}
              </Badge>
            </div>
            
            <div 
              className="flex flex-col bg-muted/30 rounded-b-md p-3 min-h-[600px] gap-3"
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
      
      <DragOverlay>
        {activeOpportunity && (
          <Card className="w-[280px] p-3 opacity-80 shadow-lg">
            <div className="font-medium truncate">{activeOpportunity.name}</div>
            <div className="text-sm text-muted-foreground">{activeOpportunity.company}</div>
            <div className="mt-2 font-medium">{formatCurrency(activeOpportunity.amount)}</div>
          </Card>
        )}
      </DragOverlay>
    </DndContext>
  );
};
