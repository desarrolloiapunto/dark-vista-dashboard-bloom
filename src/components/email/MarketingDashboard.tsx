import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MarketingDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campañas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suscriptores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,231</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="segments">Segmentación</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campañas Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  "Newsletter Mensual",
                  "Promoción de Verano",
                  "Actualización de Producto",
                ].map((campaign) => (
                  <div key={campaign} className="py-3 flex justify-between items-center">
                    <span>{campaign}</span>
                    <span className="text-muted-foreground">Hace 2 días</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle>Segmentos de Audiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  "Clientes Activos",
                  "Clientes Inactivos",
                  "Nuevos Suscriptores",
                ].map((segment) => (
                  <div key={segment} className="py-3 flex justify-between items-center">
                    <span>{segment}</span>
                    <span className="text-muted-foreground">2,145 contactos</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  "Bienvenida",
                  "Promoción",
                  "Newsletter",
                  "Recordatorio"
                ].map((template) => (
                  <div key={template} className="py-3 flex justify-between items-center">
                    <span>{template}</span>
                    <span className="text-muted-foreground">Editar</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
