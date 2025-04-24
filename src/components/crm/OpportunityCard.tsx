
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Opportunity } from "@/types/crm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, GripVertical } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: opportunity.id,
    data: {
      type: "opportunity",
      opportunity,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`mb-2 ${isDragging ? 'shadow-lg' : 'shadow-sm'} cursor-grab`}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start text-sm">
          <div className="font-medium truncate" style={{ maxWidth: '80%' }}>{opportunity.name}</div>
          <div {...attributes} {...listeners} className="cursor-grab p-1">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1 truncate">{opportunity.company}</p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="font-medium">{formatCurrency(opportunity.amount)}</div>
          <Badge variant="outline">
            {opportunity.probability}%
          </Badge>
        </div>
        
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {formatDate(opportunity.expectedCloseDate)}
        </div>
      </CardContent>
    </Card>
  );
};
