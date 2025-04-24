
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Opportunity, OpportunityStage, StageColumn } from "@/types/crm";
import { toast } from "@/hooks/use-toast";

export const useOpportunityDragAndDrop = (
  opportunities: Opportunity[],
  stageColumns: StageColumn[],
  onOpportunityUpdate: (opportunity: Opportunity) => void
) => {
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  const [columns, setColumns] = useState<StageColumn[]>(
    stageColumns.map(col => ({
      ...col,
      opportunities: opportunities.filter(opp => opp.stage === col.id)
    }))
  );

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
    
    if (!over || !active.rect.current?.translated) return;
    
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
      lastUpdated: new Date().toISOString().split('T')[0],
      probability: getProbabilityForStage(targetStageId)
    };
    
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

  const getProbabilityForStage = (stage: OpportunityStage): number => {
    switch (stage) {
      case "prospecting": return 10;
      case "qualification": return 30;
      case "needs_analysis": return 40;
      case "proposal": return 60;
      case "negotiation": return 80;
      case "closed_won": return 100;
      case "closed_lost": return 0;
      default: return 0;
    }
  };

  return {
    columns,
    activeOpportunity,
    handleDragStart,
    handleDragEnd
  };
};
