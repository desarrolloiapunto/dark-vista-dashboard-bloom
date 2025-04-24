
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { recentEmails } from "@/data/dashboardData";

export const RecentEmails = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Correos Recientes</CardTitle>
        <CardDescription>Has recibido {recentEmails.length} correos nuevos hoy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentEmails.map(email => (
            <div key={email.id} className="flex items-center">
              <Mail className="h-9 w-9 text-primary" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{email.subject}</p>
                <p className="text-sm text-muted-foreground">{email.from}</p>
              </div>
              <div className="ml-auto font-medium">
                {new Date(email.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
