
import { StageColumn } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { OpportunityCard } from "../OpportunityCard";

interface PipelineColumnProps {
  column: StageColumn;
  formatCurrency: (amount: number) => string;
  onOpportunityUpdate: (opportunity: any) => void;
  companies: any[];
  onOpenTaskDialog: () => void;
  onOpenQuoteDialog: () => void;
}

export const PipelineColumn = ({ 
  column,
  formatCurrency,
  onOpportunityUpdate,
  companies,
  onOpenTaskDialog,
  onOpenQuoteDialog
}: PipelineColumnProps) => {
  const columnTotalAmount = column.opportunities.reduce((sum, opp) => sum + opp.amount, 0);

  return (
    <div key={column.id} className="flex-shrink-0 w-[300px]" id={column.id}>
      <div className="bg-muted rounded-t-md p-3 flex items-center justify-between sticky top-0">
        <div>
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <span className="text-xs text-muted-foreground">
            {column.opportunities.length} oportunidades
          </span>
        </div>
        <Badge variant="outline" className="bg-background">
          <DollarSign className="h-3 w-3 mr-1" />
          {formatCurrency(columnTotalAmount)}
        </Badge>
      </div>
      
      <div className="flex flex-col bg-muted/30 rounded-b-md p-3 min-h-[600px] gap-3">
        <SortableContext 
          items={column.opportunities.map(opp => opp.id)} 
          strategy={verticalListSortingStrategy}
        >
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
  );
};
