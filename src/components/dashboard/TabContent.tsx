
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { RecentEmails } from "./RecentEmails";
import { PendingTasks } from "./PendingTasks";

export const OverviewTabContent = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <RecentEmails />
      <PendingTasks />
    </div>
  );
};

export const AnalyticsTabContent = () => {
  return (
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
  );
};

export const ReportsTabContent = () => {
  return (
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
  );
};
