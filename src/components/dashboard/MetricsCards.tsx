
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { dashboardMetrics } from "@/data/dashboardData";

export const MetricsCards = () => {
  return (
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
  );
};
