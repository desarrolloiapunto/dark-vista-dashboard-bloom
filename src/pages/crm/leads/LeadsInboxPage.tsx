
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, UserCheck, UserPlus, Filter } from "lucide-react";
import { contacts } from "@/data/crm";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function LeadsInboxPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "cards">("table");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Filter leads based on search term and status
  const leads = contacts.filter(contact => 
    contact.status === "lead" &&
    (currentTab === "all" || (
      currentTab === "recent" && new Date(contact.lastContact || "") >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ))
  );
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "d MMM yyyy", { locale: es });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bandeja de Entrada de Leads</h1>
        <Button asChild>
          <Link to="/crm/leads/new">
            <UserPlus className="mr-2 h-4 w-4" /> Nuevo Lead
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos los Leads</CardTitle>
              <CardDescription>
                Gestiona y realiza seguimiento a todos tus leads.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setView("table")} 
                className={view === "table" ? "bg-accent" : ""}>
                Lista
              </Button>
              <Button variant="outline" size="sm" onClick={() => setView("cards")}
                className={view === "cards" ? "bg-accent" : ""}>
                Tarjetas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filtrar
            </Button>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos los leads</TabsTrigger>
              <TabsTrigger value="recent">Leads recientes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {view === "table" ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Último Contacto</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.company || "-"}</TableCell>
                            <TableCell>{formatDate(lead.lastContact)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Detalles</Button>
                              <Button variant="ghost" size="sm">
                                <UserCheck className="h-4 w-4 mr-1" /> Asignar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            No se encontraron leads
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <Card key={lead.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{lead.name}</h3>
                              <p className="text-sm text-muted-foreground">{lead.email}</p>
                              {lead.company && (
                                <p className="text-sm text-muted-foreground">{lead.company}</p>
                              )}
                              <p className="text-xs mt-2">
                                Último contacto: {formatDate(lead.lastContact)}
                              </p>
                            </div>
                            <Badge>Lead</Badge>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">Detalles</Button>
                            <Button variant="outline" size="sm">
                              <UserCheck className="h-4 w-4 mr-1" /> Asignar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="col-span-3 text-center py-8 text-muted-foreground">
                      No se encontraron leads
                    </p>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              {/* Same structure as above, but filtered for recent leads */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
