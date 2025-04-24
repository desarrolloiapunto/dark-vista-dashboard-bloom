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
  DragStartEvent,
  closestCorners,
  pointerWithin
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
  companies: any[];
  onOpenTaskDialog: () => void;
  onOpenQuoteDialog: () => void;
}

export const OpportunityPipeline: React.FC<OpportunityPipelineProps> = ({ 
  stageColumns, 
  opportunities, 
  onOpportunityUpdate,
  companies,
  onOpenTaskDialog,
  onOpenQuoteDialog
}) => {
  const processedColumns = stageColumns.map(col => ({
    ...col,
    opportunities: opportunities.filter(opp => opp.stage === col.id)
  }));
  
  const [columns, setColumns] = useState<StageColumn[]>(processedColumns);
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const opportunityId = active.id.toString();
    
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (opportunity) {
      setActiveOpportunity(opportunity);
    }
  };
  
  const getTargetColumn = (clientOffset: { x: number, y: number }) => {
    const columnElements = stageColumns.map(col => document.getElementById(col.id));
    
    for (const element of columnElements) {
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      if (
        clientOffset.x >= rect.left &&
        clientOffset.x <= rect.right &&
        clientOffset.y >= rect.top &&
        clientOffset.y <= rect.bottom
      ) {
        return element.id as OpportunityStage;
      }
    }
    
    return null;
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveOpportunity(null);
    
    if (!over || !active.rect.current.translated) return;
    
    const opportunityId = active.id.toString();
    
    const centerX = active.rect.current.translated.left + (active.rect.current.translated.width / 2);
    const centerY = active.rect.current.translated.top + (active.rect.current.translated.height / 2);
    
    const targetStageId = getTargetColumn({ x: centerX, y: centerY });
    
    if (!targetStageId) return;
    
    const isValidStage = stageColumns.some(col => col.id === targetStageId);
    if (!isValidStage) return;
    
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    if (!opportunity) return;
    
    if (opportunity.stage === targetStageId) return;
    
    const updatedOpportunity: Opportunity = {
      ...opportunity,
      stage: targetStageId,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    if (targetStageId === "prospecting") updatedOpportunity.probability = 10;
    else if (targetStageId === "qualification") updatedOpportunity.probability = 30;
    else if (targetStageId === "needs_analysis") updatedOpportunity.probability = 40;
    else if (targetStageId === "proposal") updatedOpportunity.probability = 60;
    else if (targetStageId === "negotiation") updatedOpportunity.probability = 80;
    else if (targetStageId === "closed_won") updatedOpportunity.probability = 100;
    else if (targetStageId === "closed_lost") updatedOpportunity.probability = 0;
    
    onOpportunityUpdate(updatedOpportunity);
    
    const newColumns = columns.map(column => {
      if (column.id === opportunity.stage) {
        return {
          ...column,
          opportunities: column.opportunities.filter(opp => opp.id !== opportunityId)
        };
      }
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
      collisionDetection={closestCorners}
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
                    onOpportunityUpdate={onOpportunityUpdate}
                    companies={companies}
                    onOpenTaskDialog={onOpenTaskDialog}
                    onOpenQuoteDialog={onOpenQuoteDialog}
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
