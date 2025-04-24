import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { contacts, opportunities, companies } from "@/data/crm";

export default function ReportsPage() {
  // Datos para el gráfico de estado de contactos
  const contactStatusData = [
    { name: "Leads", value: contacts.filter(c => c.status === "lead").length },
    { name: "Prospectos", value: contacts.filter(c => c.status === "prospect").length },
    { name: "Clientes", value: contacts.filter(c => c.status === "customer").length },
    { name: "Inactivos", value: contacts.filter(c => c.status === "inactive").length },
  ];

  // Datos para el gráfico de estado de empresas
  const companyStatusData = [
    { name: "Prospectos", value: companies.filter(c => c.status === "prospect").length },
    { name: "Clientes", value: companies.filter(c => c.status === "client").length },
    { name: "Socios", value: companies.filter(c => c.status === "partner").length },
    { name: "Inactivos", value: companies.filter(c => c.status === "inactive").length },
  ];

  // Datos para el gráfico de etapas de oportunidades
  const opportunityStageData = [
    { name: "Prospección", value: opportunities.filter(o => o.stage === "prospecting").length },
    { name: "Calificación", value: opportunities.filter(o => o.stage === "qualification").length },
    { name: "Análisis", value: opportunities.filter(o => o.stage === "needs_analysis").length },
    { name: "Propuesta", value: opportunities.filter(o => o.stage === "proposal").length },
    { name: "Negociación", value: opportunities.filter(o => o.stage === "negotiation").length },
    { name: "Ganado", value: opportunities.filter(o => o.stage === "closed_won").length },
    { name: "Perdido", value: opportunities.filter(o => o.stage === "closed_lost").length },
  ];
  
  // Datos para el gráfico de valor de oportunidades por etapa
  const opportunityValueData = [
    { 
      name: "Prospección", 
      value: opportunities
        .filter(o => o.stage === "prospecting")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
    { 
      name: "Calificación", 
      value: opportunities
        .filter(o => o.stage === "qualification")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
    { 
      name: "Análisis", 
      value: opportunities
        .filter(o => o.stage === "needs_analysis")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
    { 
      name: "Propuesta", 
      value: opportunities
        .filter(o => o.stage === "proposal")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
    { 
      name: "Negociación", 
      value: opportunities
        .filter(o => o.stage === "negotiation")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
    { 
      name: "Ganado", 
      value: opportunities
        .filter(o => o.stage === "closed_won")
        .reduce((sum, opp) => sum + opp.amount, 0)
    },
  ];

  // Simular datos para el gráfico de rendimiento mensual
  const monthlyPerformanceData = [
    { name: "Ene", ventas: 12000, oportunidades: 15 },
    { name: "Feb", ventas: 15000, oportunidades: 18 },
    { name: "Mar", ventas: 18000, oportunidades: 20 },
    { name: "Abr", ventas: 22000, oportunidades: 22 },
    { name: "May", ventas: 19000, oportunidades: 20 },
    { name: "Jun", ventas: 24000, oportunidades: 25 },
    { name: "Jul", ventas: 21000, oportunidades: 22 },
    { name: "Ago", ventas: 25000, oportunidades: 24 },
    { name: "Sep", ventas: 28000, oportunidades: 28 },
    { name: "Oct", ventas: 30000, oportunidades: 30 },
    { name: "Nov", ventas: 35000, oportunidades: 35 },
    { name: "Dic", ventas: 40000, oportunidades: 40 },
  ];

  // Colores para los gráficos
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reportes y Métricas</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="companies">Empresas</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
        </TabsList>

        {/* Vista General */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento Mensual</CardTitle>
                <CardDescription>Ingresos y oportunidades por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthlyPerformanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === "ventas" ? formatCurrency(value as number) : value, 
                      name === "ventas" ? "Ventas" : "Oportunidades"
                    ]} />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="ventas" 
                      name="Ventas" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="oportunidades" 
                      name="Oportunidades" 
                      stroke="#82ca9d" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Oportunidades por Etapa</CardTitle>
                <CardDescription>Distribución de oportunidades en el pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={opportunityStageData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Oportunidades" fill="#8884d8">
                      {opportunityStageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estado de Contactos</CardTitle>
                <CardDescription>Distribución por estado de contactos</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contactStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contactStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor de Oportunidades</CardTitle>
                <CardDescription>Valor monetario por etapa del pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={opportunityValueData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `€${value / 1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="value" name="Valor" fill="#82ca9d">
                      {opportunityValueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reportes de Contactos */}
        <TabsContent value="contacts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Contactos</CardTitle>
                <CardDescription>Proporción de contactos por estado</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contactStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contactStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Contactos</CardTitle>
                <CardDescription>Números clave sobre tus contactos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total de Contactos:</span>
                    <span className="font-medium">{contacts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Leads:</span>
                    <span className="font-medium">{contacts.filter(c => c.status === "lead").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Prospectos:</span>
                    <span className="font-medium">{contacts.filter(c => c.status === "prospect").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Clientes:</span>
                    <span className="font-medium">{contacts.filter(c => c.status === "customer").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tasa de Conversión:</span>
                    <span className="font-medium">
                      {(contacts.filter(c => c.status === "customer").length / contacts.length * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reportes de Empresas */}
        <TabsContent value="companies">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Empresas</CardTitle>
                <CardDescription>Proporción de empresas por estado</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={companyStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {companyStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empresas por Industria</CardTitle>
                <CardDescription>Distribución de empresas por sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[...new Set(companies.map(c => c.industry))].map(industry => ({
                      name: industry,
                      value: companies.filter(c => c.industry === industry).length
                    }))}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Empresas" fill="#8884d8">
                      {[...new Set(companies.map(c => c.industry))].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reportes de Oportunidades */}
        <TabsContent value="opportunities">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades por Etapa</CardTitle>
                <CardDescription>Distribución en el pipeline de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={opportunityStageData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Oportunidades" fill="#8884d8">
                      {opportunityStageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor de Oportunidades</CardTitle>
                <CardDescription>Valor monetario por etapa del pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={opportunityValueData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `€${value / 1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="value" name="Valor" fill="#82ca9d">
                      {opportunityValueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Oportunidades</CardTitle>
                <CardDescription>Números clave sobre tus oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total de Oportunidades:</span>
                    <span className="font-medium">{opportunities.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Oportunidades Abiertas:</span>
                    <span className="font-medium">
                      {opportunities.filter(o => !["closed_won", "closed_lost"].includes(o.stage)).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Oportunidades Ganadas:</span>
                    <span className="font-medium">{opportunities.filter(o => o.stage === "closed_won").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Valor total de Oportunidades:</span>
                    <span className="font-medium">
                      {formatCurrency(opportunities.reduce((sum, opp) => sum + opp.amount, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tasa de Conversión:</span>
                    <span className="font-medium">
                      {(opportunities.filter(o => o.stage === "closed_won").length / 
                        (opportunities.filter(o => ["closed_won", "closed_lost"].includes(o.stage)).length || 1) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
