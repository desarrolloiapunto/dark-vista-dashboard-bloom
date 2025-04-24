
import { Opportunity } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { DragOverlay } from "@dnd-kit/core";

interface OpportunityDragOverlayProps {
  activeOpportunity: Opportunity | null;
  formatCurrency: (amount: number) => string;
}

export const OpportunityDragOverlay = ({ 
  activeOpportunity,
  formatCurrency 
}: OpportunityDragOverlayProps) => {
  if (!activeOpportunity) return null;

  return (
    <DragOverlay>
      <Card className="w-[280px] p-3 opacity-80 shadow-lg">
        <div className="font-medium truncate">{activeOpportunity.name}</div>
        <div className="text-sm text-muted-foreground">{activeOpportunity.company}</div>
        <div className="mt-2 font-medium">{formatCurrency(activeOpportunity.amount)}</div>
      </Card>
    </DragOverlay>
  );
};
