
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { tasksList } from "@/data/dashboardData";

export const PendingTasks = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tareas Pendientes</CardTitle>
        <CardDescription>Tienes {tasksList.length} tareas para esta semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tasksList.map(task => (
            <div key={task.id} className="flex items-center">
              <CalendarDays className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  Vence: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className={`ml-auto font-medium ${
                task.priority === 'high' ? 'text-red-500' : 
                task.priority === 'medium' ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
