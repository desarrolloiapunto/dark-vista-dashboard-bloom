import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck } from "lucide-react";
import { contacts } from "@/data/crm";

export default function LeadsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const leads = contacts.filter(contact => contact.status === "lead");
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Leads</h1>
        <Button>
          <UserCheck className="mr-2 h-4 w-4" /> Nuevo Lead
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todos los Leads</CardTitle>
          <CardDescription>
            Gestiona y realiza seguimiento a tus leads potenciales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredLeads.map(lead => (
              <Card key={lead.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{lead.name}</h3>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    {lead.company && (
                      <p className="text-sm text-muted-foreground">{lead.company}</p>
                    )}
                  </div>
                  <Badge variant="secondary">Lead</Badge>
                </div>
              </Card>
            ))}
            {filteredLeads.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No se encontraron leads
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
