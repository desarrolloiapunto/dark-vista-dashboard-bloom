
import { useState } from "react";
import { companies } from "@/data/crmData";
import { Company } from "@/types/crm";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Building, PencilIcon, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CompaniesPage() {
  const [companyList, setCompanyList] = useState<Company[]>(companies);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: "",
    industry: "",
    website: "",
    employees: undefined,
    revenue: "",
    country: "España",
    status: "prospect"
  });

  const filteredCompanies = companyList.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompany = () => {
    const id = (Math.max(...companyList.map(c => Number(c.id)), 0) + 1).toString();
    const company: Company = {
      id,
      name: newCompany.name || "",
      industry: newCompany.industry || "",
      website: newCompany.website,
      employees: newCompany.employees,
      revenue: newCompany.revenue,
      country: newCompany.country,
      status: newCompany.status as "prospect" | "client" | "partner" | "inactive",
    };
    
    setCompanyList([...companyList, company]);
    setNewCompany({
      name: "",
      industry: "",
      website: "",
      employees: undefined,
      revenue: "",
      country: "España",
      status: "prospect"
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditCompany = () => {
    if (!currentCompany) return;
    
    setCompanyList(companyList.map(company => 
      company.id === currentCompany.id ? currentCompany : company
    ));
    
    setIsEditDialogOpen(false);
    setCurrentCompany(null);
  };

  const handleDeleteCompany = () => {
    if (!currentCompany) return;
    
    setCompanyList(companyList.filter(company => company.id !== currentCompany.id));
    setIsDeleteDialogOpen(false);
    setCurrentCompany(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "prospect":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Prospecto</Badge>;
      case "client":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Cliente</Badge>;
      case "partner":
        return <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">Socio</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const revenues = ["<€1M", "€1M - €5M", "€5M - €10M", "€10M - €50M", ">€50M"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Empresas</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Building className="mr-2 h-4 w-4" /> Añadir Empresa
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todas las Empresas</CardTitle>
          <CardDescription>
            Gestiona tus empresas, sus datos y clasificación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empresas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Industria</TableHead>
                  <TableHead>Empleados</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.employees || "-"}</TableCell>
                    <TableCell>{company.revenue || "-"}</TableCell>
                    <TableCell>{getStatusBadge(company.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentCompany(company);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentCompany(company);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCompanies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron empresas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Company Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir Nueva Empresa</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre*</Label>
                <Input 
                  id="name" 
                  value={newCompany.name} 
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="industry">Industria*</Label>
                <Input 
                  id="industry" 
                  value={newCompany.industry} 
                  onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="website">Sitio Web</Label>
                <Input 
                  id="website" 
                  value={newCompany.website || ""} 
                  onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="employees">Empleados</Label>
                <Input 
                  id="employees" 
                  type="number" 
                  min="0"
                  value={newCompany.employees || ""} 
                  onChange={(e) => setNewCompany({...newCompany, employees: parseInt(e.target.value) || undefined})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="revenue">Ingresos</Label>
                <Select 
                  onValueChange={(value) => setNewCompany({...newCompany, revenue: value})}
                  defaultValue={newCompany.revenue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ingresos" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenues.map((revenue) => (
                      <SelectItem key={revenue} value={revenue}>{revenue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select 
                  onValueChange={(value) => setNewCompany({
                    ...newCompany, 
                    status: value as "prospect" | "client" | "partner" | "inactive"
                  })}
                  defaultValue={newCompany.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospecto</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="partner">Socio</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateCompany} 
              disabled={!newCompany.name || !newCompany.industry}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Company Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
          </DialogHeader>
          {currentCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Nombre*</Label>
                  <Input 
                    id="edit-name" 
                    value={currentCompany.name} 
                    onChange={(e) => setCurrentCompany({...currentCompany, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-industry">Industria*</Label>
                  <Input 
                    id="edit-industry" 
                    value={currentCompany.industry} 
                    onChange={(e) => setCurrentCompany({...currentCompany, industry: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-website">Sitio Web</Label>
                  <Input 
                    id="edit-website" 
                    value={currentCompany.website || ""} 
                    onChange={(e) => setCurrentCompany({...currentCompany, website: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-employees">Empleados</Label>
                  <Input 
                    id="edit-employees" 
                    type="number" 
                    min="0"
                    value={currentCompany.employees || ""} 
                    onChange={(e) => setCurrentCompany({
                      ...currentCompany, 
                      employees: parseInt(e.target.value) || undefined
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-revenue">Ingresos</Label>
                  <Select 
                    onValueChange={(value) => setCurrentCompany({...currentCompany, revenue: value})}
                    defaultValue={currentCompany.revenue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona ingresos" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenues.map((revenue) => (
                        <SelectItem key={revenue} value={revenue}>{revenue}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select 
                    onValueChange={(value) => setCurrentCompany({
                      ...currentCompany, 
                      status: value as "prospect" | "client" | "partner" | "inactive"
                    })}
                    defaultValue={currentCompany.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospecto</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
                      <SelectItem value="partner">Socio</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditCompany} 
              disabled={!currentCompany?.name || !currentCompany?.industry}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Company Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Empresa</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar la empresa {currentCompany?.name}?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
