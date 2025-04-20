
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function LeadsAutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Automatización de Leads</h1>
        <Button>Crear Nueva Automatización</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email de Bienvenida</CardTitle>
            <CardDescription>
              Envía automáticamente un email cuando se registra un nuevo lead
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="welcome-email" />
              <Label htmlFor="welcome-email">Activar</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguimiento Automático</CardTitle>
            <CardDescription>
              Crea tareas de seguimiento para leads inactivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="auto-followup" />
              <Label htmlFor="auto-followup">Activar</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calificación Automática</CardTitle>
            <CardDescription>
              Califica leads basado en su interacción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="auto-scoring" />
              <Label htmlFor="auto-scoring">Activar</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Notifica al equipo sobre nuevos leads calificados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">Activar</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
