
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartCard } from "@/components/analytics/BarChartCard";
import { PieChartCard } from "@/components/analytics/PieChartCard";
import { LineChartCard } from "@/components/analytics/LineChartCard";
import { MetricsGrid } from "@/components/analytics/MetricsGrid";

const barData = [
  { name: "Ene", ventas: 4000, visitas: 2400 },
  { name: "Feb", ventas: 3000, visitas: 1398 },
  { name: "Mar", ventas: 2000, visitas: 9800 },
  { name: "Abr", ventas: 2780, visitas: 3908 },
  { name: "May", ventas: 1890, visitas: 4800 },
  { name: "Jun", ventas: 2390, visitas: 3800 },
];

const lineData = [
  { name: "Sem 1", usuarios: 400 },
  { name: "Sem 2", usuarios: 300 },
  { name: "Sem 3", usuarios: 500 },
  { name: "Sem 4", usuarios: 280 },
  { name: "Sem 5", usuarios: 590 },
  { name: "Sem 6", usuarios: 390 },
];

const pieData = [
  { name: "Mobile", value: 400 },
  { name: "Desktop", value: 300 },
  { name: "Tablet", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const userMetrics = [
  { value: "2,853", label: "Usuarios Activos" },
  { value: "15.2m", label: "Tiempo Promedio" },
  { value: "89%", label: "Tasa de Retención" },
  { value: "4.6", label: "Satisfacción" },
];

const Analytics = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Análisis</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <BarChartCard 
              title="Ventas vs Visitas" 
              description="Comparativa mensual" 
              data={barData} 
              dataKeys={["ventas", "visitas"]} 
              colors={["#8884d8", "#82ca9d"]} 
            />
            <PieChartCard 
              title="Distribución de Dispositivos" 
              description="Accesos por tipo de dispositivo" 
              data={pieData} 
              colors={COLORS} 
            />
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <LineChartCard 
            title="Análisis de Ventas" 
            description="Tendencia de ventas por período" 
            data={lineData} 
            dataKey="usuarios" 
            color="#8884d8" 
          />
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-4">
            <MetricsGrid metrics={userMetrics} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
