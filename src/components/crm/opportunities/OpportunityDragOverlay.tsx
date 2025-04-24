
import { formatCurrency } from '@/utils/formatters';

// Remove the formatCurrency prop from the interface
interface OpportunityDragOverlayProps {
  activeOpportunity: Opportunity | null;
}

export const OpportunityDragOverlay = ({ 
  activeOpportunity
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
