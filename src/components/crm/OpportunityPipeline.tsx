import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { StageColumn, Opportunity } from "@/types/crm";
import { useOpportunityDragAndDrop } from "@/hooks/useOpportunityDragAndDrop";
import { PipelineColumn } from "./opportunities/PipelineColumn";
import { OpportunityDragOverlay } from "./opportunities/OpportunityDragOverlay";
import { formatCurrency } from '@/utils/formatters';

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
  
  const { columns, activeOpportunity, handleDragStart, handleDragEnd } = useOpportunityDragAndDrop(
    opportunities,
    stageColumns,
    onOpportunityUpdate
  );

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="flex overflow-x-auto gap-6 pb-8 pt-2">
        {columns.map(column => (
          <PipelineColumn
            key={column.id}
            column={column}
            formatCurrency={formatCurrency}
            onOpportunityUpdate={onOpportunityUpdate}
            companies={companies}
            onOpenTaskDialog={onOpenTaskDialog}
            onOpenQuoteDialog={onOpenQuoteDialog}
          />
        ))}
      </div>
      
      <OpportunityDragOverlay 
        activeOpportunity={activeOpportunity}
        formatCurrency={formatCurrency}
      />
    </DndContext>
  );
};
