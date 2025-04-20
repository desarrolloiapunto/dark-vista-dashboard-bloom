
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { stageColumns, dashboardMetrics, contacts } from "@/data/crmData";
import { OpportunityStage, Opportunity, StageColumn } from "@/types/crm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ArrowUp, ArrowDown, UserCheck, MapPin, LineChart, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CrmDashboard() {
  const [columns, setColumns] = useState<StageColumn[]>(stageColumns);
  const leads = contacts.filter(contact => contact.status === "lead");
  const customers = contacts.filter(contact => contact.status === "customer");

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

  // Calcular las métricas para los leads
  const totalLeads = leads.length;
  const leadsThisMonth = leads.filter(lead => {
    const lastContact = new Date(lead.lastContact || Date.now());
    const thisMonth = new Date();
    return lastContact.getMonth() === thisMonth.getMonth() && 
           lastContact.getFullYear() === thisMonth.getFullYear();
  }).length;

  // Calcular las métricas para las oportunidades
  const totalOpportunities = columns.reduce(
    (sum, column) => sum + column.opportunities.length, 
    0
  );
  const totalValue = columns.reduce(
    (sum, column) => sum + column.opportunities.reduce(
      (colSum, opp) => colSum + opp.amount, 
      0
    ), 
    0
  );

  // Calcular la tasa de conversión (ejemplo)
  const conversionRate = customers.length > 0 ? 
    Math.round((customers.length / (customers.length + leads.length)) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard CRM</h1>

      {/* Tabs para cambiar entre vista de Leads y CRM general */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Visión General</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Métricas principales del Dashboard */}
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

          {/* Resumen unificado CRM + Leads */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Leads</CardTitle>
                <CardDescription>Métricas clave de la gestión de leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Leads Totales</span>
                    <span className="font-bold">{totalLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nuevos Leads este Mes</span>
                    <span className="font-bold">{leadsThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasa de Conversión</span>
                    <span className="font-bold">{conversionRate}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progreso de Conversión</span>
                      <span className="text-sm font-bold">{conversionRate}%</span>
                    </div>
                    <Progress value={conversionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oportunidades</CardTitle>
                <CardDescription>Resumen de oportunidades activas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Oportunidades Totales</span>
                    <span className="font-bold">{totalOpportunities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Valor Total</span>
                    <span className="font-bold">€{totalValue.toLocaleString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Promedio por Oportunidad</span>
                    <span className="font-bold">
                      €{totalOpportunities > 0 ? 
                          Math.round(totalValue / totalOpportunities).toLocaleString('es-ES') : 0}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Probab. Cierre (Prom.)</span>
                      <span className="text-sm font-bold">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 flex items-center">
              <UserCheck className="w-8 h-8 mr-4 text-primary" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
                <p className="mt-1 text-2xl font-bold">{totalLeads}</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <MapPin className="w-8 h-8 mr-4 text-amber-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fuentes</h3>
                <p className="mt-1 text-2xl font-bold">5</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <LineChart className="w-8 h-8 mr-4 text-emerald-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Conversión</h3>
                <p className="mt-1 text-2xl font-bold">{conversionRate}%</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <Building2 className="w-8 h-8 mr-4 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Leads a Clientes</h3>
                <p className="mt-1 text-2xl font-bold">{customers.length}</p>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Leads</CardTitle>
              <CardDescription>Leads más recientes agregados al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{lead.company || 'Sin empresa'}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Sin contacto'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Leads por Fuente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sitio Web</span>
                  <span className="font-bold">45%</span>
                </div>
                <Progress value={45} className="h-2" />

                <div className="flex justify-between">
                  <span>Redes Sociales</span>
                  <span className="font-bold">32%</span>
                </div>
                <Progress value={32} className="h-2" />

                <div className="flex justify-between">
                  <span>Referencias</span>
                  <span className="font-bold">15%</span>
                </div>
                <Progress value={15} className="h-2" />

                <div className="flex justify-between">
                  <span>Email Marketing</span>
                  <span className="font-bold">8%</span>
                </div>
                <Progress value={8} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Pipeline de Oportunidades (Drag and Drop) */}
          <Card>
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
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Distribución por Etapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columns.map((column) => (
                    <div key={column.id} className="flex justify-between items-center">
                      <span className="text-sm">{column.title}</span>
                      <span className="font-medium">{column.opportunities.length}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Valor por Etapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columns.map((column) => {
                    const totalValue = column.opportunities.reduce(
                      (sum, opp) => sum + opp.amount, 0
                    );
                    return (
                      <div key={column.id} className="flex justify-between items-center">
                        <span className="text-sm">{column.title}</span>
                        <span className="font-medium">€{totalValue.toLocaleString('es-ES')}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Probabilidad Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columns.map((column) => {
                    const avgProbability = column.opportunities.length > 0
                      ? Math.round(
                          column.opportunities.reduce((sum, opp) => sum + opp.probability, 0) / 
                          column.opportunities.length
                        )
                      : 0;
                    return (
                      <div key={column.id} className="flex justify-between items-center">
                        <span className="text-sm">{column.title}</span>
                        <span className="font-medium">{avgProbability}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
