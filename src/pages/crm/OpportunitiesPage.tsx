
import { useState } from "react";
import { opportunities, companies, stageColumns, tasks, quotes } from "@/data/crmData";
import { Opportunity, Task } from "@/types/crm";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, TrendingUp, PencilIcon, Trash2, CalendarIcon, 
  ListIcon, KanbanIcon, CheckSquare, FileText, Plus 
} from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { OpportunityPipeline } from "@/components/crm/OpportunityPipeline";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OpportunitiesPage() {
  const [opportunityList, setOpportunityList] = useState<Opportunity[]>(opportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState<string>("all");
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
  
  // Estados para tareas relacionadas
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    priority: "medium",
    status: "pending",
  });
  
  const [relatedTasks, setRelatedTasks] = useState<Task[]>(
    tasks.filter(task => 
      task.relatedTo?.type === "opportunity" && 
      task.relatedTo.id === currentOpportunity?.id
    )
  );
  
  // Estado para cotizaciones
  const [relatedQuotes, setRelatedQuotes] = useState<any[]>([]);

  const filteredOpportunities = opportunityList
    .filter(opp => {
      const matchesSearch = 
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStage === "all") {
        return matchesSearch;
      } else if (filterStage === "open") {
        return matchesSearch && !["closed_won", "closed_lost"].includes(opp.stage);
      } else if (filterStage === "closed") {
        return matchesSearch && ["closed_won", "closed_lost"].includes(opp.stage);
      } else {
        return matchesSearch && opp.stage === filterStage;
      }
    })
    .sort((a, b) => new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime());

  const handleCreateOpportunity = () => {
    const id = (Math.max(...opportunityList.map(o => Number(o.id)), 0) + 1).toString();
    const opportunity: Opportunity = {
      id,
      name: newOpportunity.name || "",
      company: newOpportunity.company || "",
      amount: newOpportunity.amount || 0,
      stage: newOpportunity.stage as any,
      probability: newOpportunity.probability || 10,
      expectedCloseDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : new Date().toISOString().split('T')[0],
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
      expectedCloseDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : currentOpportunity.expectedCloseDate,
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
    
    // En un entorno real, aquí se haría una llamada a la API para crear la tarea
    // Por ahora simulamos añadiéndola al estado local
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
    
    // En un entorno real, aquí se redireccionaría a la vista de crear cotización
    // Por ahora, cerraremos el diálogo y mostraremos un toast
    setIsQuoteDialogOpen(false);
    toast({
      title: "Crear cotización",
      description: "Funcionalidad en desarrollo. Pronto podrás crear cotizaciones para esta oportunidad."
    });
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "prospecting":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Prospección</Badge>;
      case "qualification":
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Calificación</Badge>;
      case "needs_analysis":
        return <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">Análisis de Necesidades</Badge>;
      case "proposal":
        return <Badge variant="outline" className="bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200">Propuesta</Badge>;
      case "negotiation":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Negociación</Badge>;
      case "closed_won":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Ganado</Badge>;
      case "closed_lost":
        return <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-200">Perdido</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
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
            <div className="flex mb-4 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar oportunidades..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select 
                value={filterStage} 
                onValueChange={setFilterStage}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="open">Abiertas</SelectItem>
                  <SelectItem value="closed">Cerradas</SelectItem>
                  <SelectItem value="prospecting">Prospección</SelectItem>
                  <SelectItem value="qualification">Calificación</SelectItem>
                  <SelectItem value="needs_analysis">Análisis de Necesidades</SelectItem>
                  <SelectItem value="proposal">Propuesta</SelectItem>
                  <SelectItem value="negotiation">Negociación</SelectItem>
                  <SelectItem value="closed_won">Ganadas</SelectItem>
                  <SelectItem value="closed_lost">Perdidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Etapa</TableHead>
                    <TableHead>Prob.</TableHead>
                    <TableHead>Fecha de cierre</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOpportunities.map(opp => (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp.name}</TableCell>
                      <TableCell>{opp.company}</TableCell>
                      <TableCell>{formatCurrency(opp.amount)}</TableCell>
                      <TableCell>{getStageBadge(opp.stage)}</TableCell>
                      <TableCell>{opp.probability}%</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(opp.expectedCloseDate)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentOpportunity(opp);
                            setSelectedDate(new Date(opp.expectedCloseDate));
                            
                            // Cargar tareas relacionadas
                            setRelatedTasks(tasks.filter(task => 
                              task.relatedTo?.type === "opportunity" && 
                              task.relatedTo.id === opp.id
                            ));
                            
                            // Cargar cotizaciones relacionadas
                            setRelatedQuotes(quotes.filter(quote => quote.opportunityId === opp.id));
                            
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentOpportunity(opp);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOpportunities.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No se encontraron oportunidades
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
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
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre*</Label>
              <Input 
                id="name" 
                value={newOpportunity.name} 
                onChange={(e) => setNewOpportunity({...newOpportunity, name: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Empresa*</Label>
              <Select 
                onValueChange={(value) => setNewOpportunity({...newOpportunity, company: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company.id} value={company.name}>{company.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Monto*</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  min="0"
                  value={newOpportunity.amount || ""} 
                  onChange={(e) => setNewOpportunity({...newOpportunity, amount: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="stage">Etapa</Label>
                <Select 
                  onValueChange={(value) => setNewOpportunity({...newOpportunity, stage: value as any})}
                  defaultValue={newOpportunity.stage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospecting">Prospección</SelectItem>
                    <SelectItem value="qualification">Calificación</SelectItem>
                    <SelectItem value="needs_analysis">Análisis de Necesidades</SelectItem>
                    <SelectItem value="proposal">Propuesta</SelectItem>
                    <SelectItem value="negotiation">Negociación</SelectItem>
                    <SelectItem value="closed_won">Ganada</SelectItem>
                    <SelectItem value="closed_lost">Perdida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="probability">Probabilidad (%)</Label>
                <Input 
                  id="probability" 
                  type="number" 
                  min="0"
                  max="100"
                  value={newOpportunity.probability || ""} 
                  onChange={(e) => setNewOpportunity({...newOpportunity, probability: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="closeDate">Fecha estimada de cierre</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea 
                id="notes" 
                value={newOpportunity.notes || ""} 
                onChange={(e) => setNewOpportunity({...newOpportunity, notes: e.target.value})}
              />
            </div>
          </div>
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
                  <div className="grid gap-4 py-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="edit-name">Nombre*</Label>
                      <Input 
                        id="edit-name" 
                        value={currentOpportunity.name} 
                        onChange={(e) => setCurrentOpportunity({...currentOpportunity, name: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="edit-company">Empresa*</Label>
                      <Select 
                        onValueChange={(value) => setCurrentOpportunity({...currentOpportunity, company: value})}
                        defaultValue={currentOpportunity.company}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies.map(company => (
                            <SelectItem key={company.id} value={company.name}>{company.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-amount">Monto*</Label>
                        <Input 
                          id="edit-amount" 
                          type="number" 
                          min="0"
                          value={currentOpportunity.amount} 
                          onChange={(e) => setCurrentOpportunity({
                            ...currentOpportunity, 
                            amount: parseFloat(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-stage">Etapa</Label>
                        <Select 
                          onValueChange={(value) => setCurrentOpportunity({
                            ...currentOpportunity, 
                            stage: value as any
                          })}
                          defaultValue={currentOpportunity.stage}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona etapa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prospecting">Prospección</SelectItem>
                            <SelectItem value="qualification">Calificación</SelectItem>
                            <SelectItem value="needs_analysis">Análisis de Necesidades</SelectItem>
                            <SelectItem value="proposal">Propuesta</SelectItem>
                            <SelectItem value="negotiation">Negociación</SelectItem>
                            <SelectItem value="closed_won">Ganada</SelectItem>
                            <SelectItem value="closed_lost">Perdida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-probability">Probabilidad (%)</Label>
                        <Input 
                          id="edit-probability" 
                          type="number" 
                          min="0"
                          max="100"
                          value={currentOpportunity.probability} 
                          onChange={(e) => setCurrentOpportunity({
                            ...currentOpportunity, 
                            probability: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-closeDate">Fecha estimada de cierre</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "d MMM yyyy", { locale: es }) : "Seleccionar fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              locale={es}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
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
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Prioridad</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatedTasks.length > 0 ? (
                          relatedTasks.map(task => (
                            <TableRow key={task.id}>
                              <TableCell className="font-medium">{task.title}</TableCell>
                              <TableCell>{formatDate(task.dueDate)}</TableCell>
                              <TableCell>
                                {task.priority === "high" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Alta</Badge>}
                                {task.priority === "medium" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Media</Badge>}
                                {task.priority === "low" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Baja</Badge>}
                              </TableCell>
                              <TableCell>
                                {task.status === "pending" && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Pendiente</Badge>}
                                {task.status === "in-progress" && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">En progreso</Badge>}
                                {task.status === "completed" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Completada</Badge>}
                                {task.status === "canceled" && <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Cancelada</Badge>}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                              No hay tareas relacionadas
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
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
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Válida hasta</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {relatedQuotes.length > 0 ? (
                          relatedQuotes.map(quote => (
                            <TableRow key={quote.id}>
                              <TableCell className="font-medium">{quote.name}</TableCell>
                              <TableCell>{formatCurrency(quote.totalAmount)}</TableCell>
                              <TableCell>
                                {quote.status === "draft" && <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Borrador</Badge>}
                                {quote.status === "sent" && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Enviada</Badge>}
                                {quote.status === "accepted" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Aceptada</Badge>}
                                {quote.status === "rejected" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Rechazada</Badge>}
                                {quote.status === "expired" && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Expirada</Badge>}
                              </TableCell>
                              <TableCell>{formatDate(quote.validUntil)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                              No hay cotizaciones relacionadas
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
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
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="task-title">Título*</Label>
              <Input 
                id="task-title" 
                value={newTask.title} 
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="task-description">Descripción</Label>
              <Textarea 
                id="task-description" 
                value={newTask.description} 
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="task-dueDate">Fecha de vencimiento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.dueDate ? formatDate(newTask.dueDate) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate ? new Date(newTask.dueDate) : undefined}
                      onSelect={(date) => date && setNewTask({...newTask, dueDate: format(date, "yyyy-MM-dd")})}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="task-priority">Prioridad</Label>
                <Select 
                  defaultValue={newTask.priority}
                  onValueChange={(value) => setNewTask({...newTask, priority: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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
