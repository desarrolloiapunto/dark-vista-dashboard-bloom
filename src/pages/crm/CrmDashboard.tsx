
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { dashboardMetrics, contacts } from "@/data/crm";
import { ArrowUp, ArrowDown, UserCheck, MapPin, LineChart, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CrmDashboard() {
  const leads = contacts.filter(contact => contact.status === "lead");
  const customers = contacts.filter(contact => contact.status === "customer");

  // Calcular las métricas para los leads
  const totalLeads = leads.length;
  const leadsThisMonth = leads.filter(lead => {
    const lastContact = new Date(lead.lastContact || Date.now());
    const thisMonth = new Date();
    return lastContact.getMonth() === thisMonth.getMonth() && 
           lastContact.getFullYear() === thisMonth.getFullYear();
  }).length;

  // Calcular la tasa de conversión (ejemplo)
  const conversionRate = customers.length > 0 ? 
    Math.round((customers.length / (customers.length + leads.length)) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard CRM</h1>

      {/* Tabs para cambiar entre vista de Leads y CRM general */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">Visión General</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Métricas principales del Dashboard */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardMetrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center mt-1 text-xs">
                  {metric.change > 0 ? (
                    <ArrowUp className="mr-1 w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="mr-1 w-4 h-4 text-rose-500" />
                  )}
                  <span className={metric.change > 0 ? "text-emerald-500" : "text-rose-500"}>
                    {Math.abs(metric.change)}% {metric.period}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Resumen unificado CRM + Leads */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Leads</CardTitle>
                <CardDescription>Métricas clave de la gestión de leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Leads Totales</span>
                    <span className="font-bold">{totalLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nuevos Leads este Mes</span>
                    <span className="font-bold">{leadsThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasa de Conversión</span>
                    <span className="font-bold">{conversionRate}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progreso de Conversión</span>
                      <span className="text-sm font-bold">{conversionRate}%</span>
                    </div>
                    <Progress value={conversionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Ventas</CardTitle>
                <CardDescription>Rendimiento general de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Ingresos Totales (Mes)</span>
                    <span className="font-bold">€48.520</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Crecimiento vs Mes Anterior</span>
                    <div className="flex items-center">
                      <ArrowUp className="mr-1 w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">12%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasa de Cierre</span>
                    <span className="font-bold">28%</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progreso Mensual</span>
                      <span className="text-sm font-bold">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4 flex items-center">
              <UserCheck className="w-8 h-8 mr-4 text-primary" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
                <p className="mt-1 text-2xl font-bold">{totalLeads}</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <MapPin className="w-8 h-8 mr-4 text-amber-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fuentes</h3>
                <p className="mt-1 text-2xl font-bold">5</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <LineChart className="w-8 h-8 mr-4 text-emerald-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Conversión</h3>
                <p className="mt-1 text-2xl font-bold">{conversionRate}%</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center">
              <Building2 className="w-8 h-8 mr-4 text-blue-500" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Leads a Clientes</h3>
                <p className="mt-1 text-2xl font-bold">{customers.length}</p>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Leads</CardTitle>
              <CardDescription>Leads más recientes agregados al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{lead.company || 'Sin empresa'}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Sin contacto'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Leads por Fuente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sitio Web</span>
                  <span className="font-bold">45%</span>
                </div>
                <Progress value={45} className="h-2" />

                <div className="flex justify-between">
                  <span>Redes Sociales</span>
                  <span className="font-bold">32%</span>
                </div>
                <Progress value={32} className="h-2" />

                <div className="flex justify-between">
                  <span>Referencias</span>
                  <span className="font-bold">15%</span>
                </div>
                <Progress value={15} className="h-2" />

                <div className="flex justify-between">
                  <span>Email Marketing</span>
                  <span className="font-bold">8%</span>
                </div>
                <Progress value={8} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
