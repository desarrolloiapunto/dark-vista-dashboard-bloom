
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Mail, CalendarDays, LineChart } from "lucide-react";
import { dashboardMetrics, recentEmails, tasksList } from "@/data/dashboardData";

const Index = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Métricas Principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{metric.value}</h3>
                  <div className="flex items-center space-x-1">
                    {metric.change > 0 ? (
                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-rose-500" />
                    )}
                    <span className={metric.change > 0 ? "text-emerald-500" : "text-rose-500"}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{metric.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contenido Principal */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Correos Recientes */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Correos Recientes</CardTitle>
                <CardDescription>Has recibido {recentEmails.length} correos nuevos hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentEmails.map(email => (
                    <div key={email.id} className="flex items-center">
                      <Mail className="h-9 w-9 text-primary" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{email.subject}</p>
                        <p className="text-sm text-muted-foreground">{email.from}</p>
                      </div>
                      <div className="ml-auto font-medium">
                        {new Date(email.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tareas Pendientes */}
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
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas</CardTitle>
              <CardDescription>Análisis detallado de rendimiento</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="flex items-center justify-center h-96">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="text-muted-foreground ml-4">
                  Los gráficos de análisis se mostrarán aquí
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Reportes detallados del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Los reportes detallados se mostrarán aquí
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
