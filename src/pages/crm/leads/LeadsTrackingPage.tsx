
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contacts } from "@/data/crmData";

export default function LeadsTrackingPage() {
  const leads = contacts.filter(contact => contact.status === "lead");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Seguimiento de Leads</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leads.map(lead => (
          <Card key={lead.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{lead.name}</CardTitle>
                  <CardDescription>{lead.email}</CardDescription>
                </div>
                <Badge>Lead</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lead.company && (
                  <p className="text-sm">
                    <span className="font-medium">Empresa:</span> {lead.company}
                  </p>
                )}
                {lead.lastContact && (
                  <p className="text-sm">
                    <span className="font-medium">Último contacto:</span> {new Date(lead.lastContact).toLocaleDateString()}
                  </p>
                )}
                {lead.notes && (
                  <p className="text-sm">
                    <span className="font-medium">Notas:</span> {lead.notes}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
