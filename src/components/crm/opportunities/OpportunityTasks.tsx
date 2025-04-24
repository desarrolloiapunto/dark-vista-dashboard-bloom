
import { Task } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface OpportunityTasksProps {
  tasks: Task[];
}

export const OpportunityTasks = ({ tasks }: OpportunityTasksProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: es });
  };

  return (
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
          {tasks.length > 0 ? (
            tasks.map(task => (
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
  );
};
