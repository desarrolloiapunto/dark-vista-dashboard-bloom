
import { useState } from "react";
import { tasks } from "@/data/crm";
import { Task } from "@/types/crm";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, CheckSquare, PencilIcon, Trash2, CalendarIcon } from "lucide-react";
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

export default function TasksPage() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    priority: "medium",
    status: "pending"
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredTasks = taskList
    .filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.relatedTo && task.relatedTo.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filterStatus === "all") {
        return matchesSearch;
      } else {
        return matchesSearch && task.status === filterStatus;
      }
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const handleCreateTask = () => {
    const id = (Math.max(...taskList.map(t => Number(t.id)), 0) + 1).toString();
    const task: Task = {
      id,
      title: newTask.title || "",
      description: newTask.description,
      dueDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : new Date().toISOString().split('T')[0],
      priority: newTask.priority as "low" | "medium" | "high",
      status: newTask.status as "pending" | "in-progress" | "completed" | "canceled",
      createdAt: new Date().toISOString().split('T')[0],
      assignedTo: "Usuario Actual"
    };
    
    setTaskList([...taskList, task]);
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      priority: "medium",
      status: "pending"
    });
    setSelectedDate(new Date());
    setIsCreateDialogOpen(false);
  };

  const handleEditTask = () => {
    if (!currentTask) return;
    
    const updatedTask = {
      ...currentTask,
      dueDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : currentTask.dueDate
    };
    
    setTaskList(taskList.map(task => 
      task.id === currentTask.id ? updatedTask : task
    ));
    
    setIsEditDialogOpen(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = () => {
    if (!currentTask) return;
    
    setTaskList(taskList.filter(task => task.id !== currentTask.id));
    setIsDeleteDialogOpen(false);
    setCurrentTask(null);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">Baja</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Media</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-200">Alta</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pendiente</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">En Progreso</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Completada</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "completed" && status !== "canceled";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tareas</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <CheckSquare className="mr-2 h-4 w-4" /> Añadir Tarea
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todas las Tareas</CardTitle>
          <CardDescription>
            Organiza y gestiona tus tareas pendientes y completadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tareas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="in-progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="canceled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Relacionado Con</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(task => (
                  <TableRow key={task.id} className={isOverdue(task.dueDate, task.status) ? "bg-rose-50" : ""}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      {task.relatedTo ? `${task.relatedTo.name} (${task.relatedTo.type})` : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className={isOverdue(task.dueDate, task.status) ? "text-rose-600 font-medium" : ""}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentTask(task);
                          setSelectedDate(new Date(task.dueDate));
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentTask(task);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron tareas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Task Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir Nueva Tarea</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Título*</Label>
              <Input 
                id="title" 
                value={newTask.title} 
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description" 
                value={newTask.description || ""} 
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select 
                  onValueChange={(value) => setNewTask({...newTask, priority: value as "low" | "medium" | "high"})}
                  defaultValue={newTask.priority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select 
                onValueChange={(value) => setNewTask({
                  ...newTask, 
                  status: value as "pending" | "in-progress" | "completed" | "canceled"
                })}
                defaultValue={newTask.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="canceled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateTask} 
              disabled={!newTask.title}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-title">Título*</Label>
                <Input 
                  id="edit-title" 
                  value={currentTask.title} 
                  onChange={(e) => setCurrentTask({...currentTask, title: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea 
                  id="edit-description" 
                  value={currentTask.description || ""} 
                  onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-dueDate">Fecha de Vencimiento</Label>
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
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-priority">Prioridad</Label>
                  <Select 
                    onValueChange={(value) => setCurrentTask({...currentTask, priority: value as "low" | "medium" | "high"})}
                    defaultValue={currentTask.priority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select 
                  onValueChange={(value) => setCurrentTask({
                    ...currentTask, 
                    status: value as "pending" | "in-progress" | "completed" | "canceled"
                  })}
                  defaultValue={currentTask.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="in-progress">En Progreso</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="canceled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditTask} 
              disabled={!currentTask?.title}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Tarea</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar la tarea "{currentTask?.title}"?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
