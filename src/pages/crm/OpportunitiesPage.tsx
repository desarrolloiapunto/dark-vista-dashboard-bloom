import { useState } from "react";
import { opportunities, companies, stageColumns, tasks, quotes } from "@/data/crmData";
import { Opportunity, Task } from "@/types/crm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ListIcon,
  KanbanIcon,
  TrendingUp,
  Plus,
  CheckSquare,
  FileText
} from "lucide-react";
import { OpportunityForm } from "@/components/crm/opportunities/OpportunityForm";
import { OpportunityList } from "@/components/crm/opportunities/OpportunityList";
import { OpportunityTasks } from "@/components/crm/opportunities/OpportunityTasks";
import { OpportunityQuotes } from "@/components/crm/opportunities/OpportunityQuotes";
import { OpportunityPipeline } from "@/components/crm/OpportunityPipeline";
import { toast } from "@/hooks/use-toast";

export default function OpportunitiesPage() {
  const [opportunityList, setOpportunityList] = useState<Opportunity[]>(opportunities);
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("list");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  
  const [currentOpportunity, setCurrentOpportunity] = useState<Opportunity | null>(null);
  const [newOpportunity, setNewOpportunity] = useState<Partial<Opportunity>>({
    name: "",
    company: "",
    amount: 0,
    stage: "prospecting",
    probability: 10,
    expectedCloseDate: new Date().toISOString().split('T')[0],
    notes: "",
    owner: "Usuario Actual"
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    priority: "medium",
    status: "pending",
  });
  
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
  const [relatedQuotes, setRelatedQuotes] = useState<any[]>([]);

  const handleCreateOpportunity = () => {
    const id = (Math.max(...opportunityList.map(o => Number(o.id)), 0) + 1).toString();
    const opportunity: Opportunity = {
      id,
      name: newOpportunity.name || "",
      company: newOpportunity.company || "",
      amount: newOpportunity.amount || 0,
      stage: newOpportunity.stage as any,
      probability: newOpportunity.probability || 10,
      expectedCloseDate: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      notes: newOpportunity.notes,
      owner: "Usuario Actual",
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setOpportunityList([...opportunityList, opportunity]);
    setNewOpportunity({
      name: "",
      company: "",
      amount: 0,
      stage: "prospecting",
      probability: 10,
      expectedCloseDate: new Date().toISOString().split('T')[0],
      notes: "",
      owner: "Usuario Actual"
    });
    setSelectedDate(new Date());
    setIsCreateDialogOpen(false);
    toast({
      title: "Oportunidad creada",
      description: `La oportunidad ${opportunity.name} ha sido creada con éxito.`,
    });
  };

  const handleEditOpportunity = () => {
    if (!currentOpportunity) return;
    
    const updatedOpportunity = {
      ...currentOpportunity,
      expectedCloseDate: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : currentOpportunity.expectedCloseDate,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setOpportunityList(opportunityList.map(opp => 
      opp.id === currentOpportunity.id ? updatedOpportunity : opp
    ));
    
    setIsEditDialogOpen(false);
    setCurrentOpportunity(null);
    toast({
      title: "Oportunidad actualizada",
      description: `La oportunidad ${updatedOpportunity.name} ha sido actualizada con éxito.`
    });
  };

  const handleDeleteOpportunity = () => {
    if (!currentOpportunity) return;
    
    setOpportunityList(opportunityList.filter(opp => opp.id !== currentOpportunity.id));
    setIsDeleteDialogOpen(false);
    setCurrentOpportunity(null);
    toast({
      title: "Oportunidad eliminada",
      description: `La oportunidad ${currentOpportunity.name} ha sido eliminada.`,
      variant: "destructive"
    });
  };

  const handleCreateTask = () => {
    if (!currentOpportunity) return;
    
    const newTaskObj: Task = {
      id: (Math.max(...tasks.map(t => Number(t.id)), 0) + 1).toString(),
      title: newTask.title || "",
      description: newTask.description,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignedTo: "Usuario Actual",
      relatedTo: {
        type: "opportunity",
        id: currentOpportunity.id,
        name: currentOpportunity.name
      },
      priority: newTask.priority as "low" | "medium" | "high",
      status: newTask.status as "pending" | "in-progress" | "completed" | "canceled",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setRelatedTasks([...relatedTasks, newTaskObj]);
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      priority: "medium",
      status: "pending",
    });
    setIsTaskDialogOpen(false);
    toast({
      title: "Tarea creada",
      description: `La tarea ${newTaskObj.title} ha sido creada y vinculada a la oportunidad.`
    });
  };

  const handleCreateQuote = () => {
    if (!currentOpportunity) return;
    setIsQuoteDialogOpen(false);
    toast({
      title: "Crear cotización",
      description: "Funcionalidad en desarrollo. Pronto podrás crear cotizaciones para esta oportunidad."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Oportunidades</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className={`${viewMode === "list" ? "bg-secondary" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="mr-2 h-4 w-4" />
            Lista
          </Button>
          <Button
            variant="outline"
            className={`${viewMode === "pipeline" ? "bg-secondary" : ""}`}
            onClick={() => setViewMode("pipeline")}
          >
            <KanbanIcon className="mr-2 h-4 w-4" />
            Pipeline
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <TrendingUp className="mr-2 h-4 w-4" /> Añadir Oportunidad
          </Button>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Todas las Oportunidades</CardTitle>
            <CardDescription>
              Gestiona el pipeline de ventas y realiza seguimiento de tus oportunidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OpportunityList 
              opportunities={opportunityList}
              onEdit={(opp) => {
                setCurrentOpportunity(opp);
                setSelectedDate(new Date(opp.expectedCloseDate));
                setRelatedTasks(tasks.filter(task => 
                  task.relatedTo?.type === "opportunity" && 
                  task.relatedTo.id === opp.id
                ));
                setRelatedQuotes(quotes.filter(quote => quote.opportunityId === opp.id));
                setIsEditDialogOpen(true);
              }}
              onDelete={(opp) => {
                setCurrentOpportunity(opp);
                setIsDeleteDialogOpen(true);
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Oportunidades</CardTitle>
            <CardDescription>
              Visualiza y arrastra tus oportunidades a través de las diferentes etapas del pipeline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OpportunityPipeline 
              stageColumns={stageColumns} 
              opportunities={opportunityList} 
              onOpportunityUpdate={(updatedOpp) => {
                setOpportunityList(opportunityList.map(opp => 
                  opp.id === updatedOpp.id ? updatedOpp : opp
                ));
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Create Opportunity Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir Nueva Oportunidad</DialogTitle>
          </DialogHeader>
          <OpportunityForm
            opportunity={newOpportunity}
            companies={companies}
            onOpportunityChange={setNewOpportunity}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateOpportunity} 
              disabled={!newOpportunity.name || !newOpportunity.company || !newOpportunity.amount}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Opportunity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Oportunidad</DialogTitle>
          </DialogHeader>
          <div className="pb-4">
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="tasks">Tareas</TabsTrigger>
                <TabsTrigger value="quotes">Cotizaciones</TabsTrigger>
                <TabsTrigger value="notes">Notas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                {currentOpportunity && (
                  <OpportunityForm
                    opportunity={currentOpportunity}
                    companies={companies}
                    onOpportunityChange={(updatedOpp) => setCurrentOpportunity({ ...currentOpportunity, ...updatedOpp })}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="tasks">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Tareas relacionadas</h3>
                    <Button 
                      size="sm" 
                      onClick={() => setIsTaskDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Nueva tarea
                    </Button>
                  </div>
                  <OpportunityTasks tasks={relatedTasks} />
                </div>
              </TabsContent>
              
              <TabsContent value="quotes">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Cotizaciones</h3>
                    <Button 
                      size="sm"
                      onClick={() => setIsQuoteDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Nueva cotización
                    </Button>
                  </div>
                  <OpportunityQuotes quotes={relatedQuotes} />
                </div>
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notas</h3>
                  <Textarea 
                    value={currentOpportunity?.notes || ""} 
                    onChange={(e) => currentOpportunity && setCurrentOpportunity({
                      ...currentOpportunity, 
                      notes: e.target.value
                    })}
                    className="min-h-[200px]"
                    placeholder="Añade notas sobre esta oportunidad..."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditOpportunity} 
              disabled={!currentOpportunity?.name || !currentOpportunity?.company || !currentOpportunity?.amount}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Opportunity Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Oportunidad</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar la oportunidad "{currentOpportunity?.name}"?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteOpportunity}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Tarea para {currentOpportunity?.name}</DialogTitle>
          </DialogHeader>
          <OpportunityForm
            opportunity={newTask}
            companies={[]}
            onOpportunityChange={(updatedTask) => setNewTask({ ...newTask, ...updatedTask })}
            selectedDate={newTask.dueDate ? new Date(newTask.dueDate) : undefined}
            onDateChange={(date) => date && setNewTask({...newTask, dueDate: date.toISOString().split('T')[0]})}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateTask} 
              disabled={!newTask.title}
            >
              <CheckSquare className="mr-2 h-4 w-4" /> Crear Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Create Quote Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear Cotización para {currentOpportunity?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Esta acción te llevará al formulario de creación de cotizaciones.</p>
            <p className="text-sm text-muted-foreground mt-2">La cotización estará vinculada a esta oportunidad.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuoteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateQuote}>
              <FileText className="mr-2 h-4 w-4" /> Crear Cotización
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
