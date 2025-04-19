
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { stageColumns, dashboardMetrics } from "@/data/crmData";
import { OpportunityStage, Opportunity, StageColumn } from "@/types/crm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function CrmDashboard() {
  const [columns, setColumns] = useState<StageColumn[]>(stageColumns);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Si no hay destino o el destino es el mismo que la fuente
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);
    
    if (!sourceColumn || !destColumn) return;

    const opportunity = sourceColumn.opportunities.find(o => o.id === draggableId);
    if (!opportunity) return;
    
    // Crear nuevas copias de los arrays
    const newSourceOpportunities = [...sourceColumn.opportunities];
    newSourceOpportunities.splice(source.index, 1);
    
    const newDestOpportunities = [...destColumn.opportunities];
    
    // Actualizar la etapa de la oportunidad al moverla
    const updatedOpportunity = {
      ...opportunity,
      stage: destination.droppableId as OpportunityStage,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    newDestOpportunities.splice(destination.index, 0, updatedOpportunity);
    
    const newColumns = columns.map(col => {
      if (col.id === source.droppableId) {
        return {
          ...col,
          opportunities: newSourceOpportunities
        };
      }
      if (col.id === destination.droppableId) {
        return {
          ...col,
          opportunities: newDestOpportunities
        };
      }
      return col;
    });
    
    setColumns(newColumns);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard CRM</h1>

      {/* Métricas del Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
            <p className="mt-2 text-2xl font-bold">{metric.value}</p>
            <div className="flex items-center mt-1 text-xs">
              {metric.change > 0 ? (
                <ArrowUp className="mr-1 w-4 h-4 text-emerald-500" />
              ) : (
                <ArrowDown className="mr-1 w-4 h-4 text-rose-500" />
              )}
              <span className={metric.change > 0 ? "text-emerald-500" : "text-rose-500"}>
                {Math.abs(metric.change)}% {metric.period}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline de Oportunidades (Drag and Drop) */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Pipeline de Oportunidades</CardTitle>
          <CardDescription>
            Arrastra las oportunidades entre las etapas para actualizar su estado
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {columns.map((column) => (
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided) => (
                    <div 
                      className="bg-muted p-2 rounded-md min-w-[250px] max-w-[250px]"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h3 className="font-semibold mb-2 p-2">{column.title}</h3>
                      
                      {column.opportunities.map((opportunity, index) => (
                        <Draggable 
                          key={opportunity.id} 
                          draggableId={opportunity.id} 
                          index={index}
                        >
                          {(provided) => (
                            <Card 
                              className="p-3 mb-2 bg-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <p className="font-medium truncate">{opportunity.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{opportunity.company}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-bold">€{opportunity.amount.toLocaleString('es-ES')}</span>
                                <span className="text-xs">{opportunity.probability}%</span>
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
}
