
import { Card, CardContent } from "@/components/ui/card";

interface MetricGridProps {
  metrics: Array<{
    value: string;
    label: string;
  }>;
}

export const MetricsGrid = ({ metrics }: MetricGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
