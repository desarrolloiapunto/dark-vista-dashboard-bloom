import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { companies, contacts, opportunities } from "@/data/crmData";
import { formatCurrency } from '@/utils/formatters';

export const DashboardReports = () => {
  // Datos para el gráfico de estado de contactos
  const contactStatusData = [
    { name: "Leads", value: contacts.filter(c => c.status === "lead").length },
    { name: "Prospectos", value: contacts.filter(c => c.status === "prospect").length },
    { name: "Clientes", value: contacts.filter(c => c.status === "customer").length },
    { name: "Inactivos", value: contacts.filter(c => c.status === "inactive").length },
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
  ];

  // Colores para los gráficos
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  return (
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
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
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
  );
};
