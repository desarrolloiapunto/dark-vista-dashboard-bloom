
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Usuarios Activos</h3>
        <p className="mt-2 text-2xl font-bold">2,853</p>
        <p className="mt-1 text-xs text-muted-foreground">+12.5% desde el último mes</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Ingresos</h3>
        <p className="mt-2 text-2xl font-bold">$45,231</p>
        <p className="mt-1 text-xs text-muted-foreground">+8.2% desde el último mes</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Proyectos</h3>
        <p className="mt-2 text-2xl font-bold">12</p>
        <p className="mt-1 text-xs text-muted-foreground">+2 nuevos esta semana</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Tareas Completadas</h3>
        <p className="mt-2 text-2xl font-bold">89%</p>
        <p className="mt-1 text-xs text-muted-foreground">+5% de mejora</p>
      </Card>
    </div>
  );
};

export default Index;
