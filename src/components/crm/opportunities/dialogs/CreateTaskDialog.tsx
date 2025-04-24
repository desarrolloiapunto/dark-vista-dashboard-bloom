
import { useState } from "react";
import { Task, Opportunity } from "@/types/crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OpportunityForm } from "@/components/crm/opportunities/OpportunityForm";
import { CheckSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity | null;
  onTaskCreate: (task: Task) => void;
}

export const CreateTaskDialog = ({
  open,
  onOpenChange,
  opportunity,
  onTaskCreate,
}: CreateTaskDialogProps) => {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    priority: "medium",
    status: "pending",
  });

  const handleCreateTask = () => {
    if (!opportunity) return;
    
    const newTaskObj: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title || "",
      description: newTask.description,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignedTo: "Usuario Actual",
      relatedTo: {
        type: "opportunity",
        id: opportunity.id,
        name: opportunity.name
      },
      priority: newTask.priority as "low" | "medium" | "high",
      status: newTask.status as "pending" | "in-progress" | "completed" | "canceled",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    onTaskCreate(newTaskObj);
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      priority: "medium",
      status: "pending",
    });
    onOpenChange(false);
    toast({
      title: "Tarea creada",
      description: `La tarea ${newTaskObj.title} ha sido creada y vinculada a la oportunidad.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Tarea para {opportunity?.name}</DialogTitle>
        </DialogHeader>
        <OpportunityForm
          opportunity={newTask}
          companies={[]}
          onOpportunityChange={(updatedTask) => setNewTask({ ...newTask, ...updatedTask })}
          selectedDate={newTask.dueDate ? new Date(newTask.dueDate) : undefined}
          onDateChange={(date) => date && setNewTask({...newTask, dueDate: date.toISOString().split('T')[0]})}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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
  );
};
