
import { useState } from "react";
import { contacts } from "@/data/crmData";
import { Contact } from "@/types/crm";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Search, UserPlus, PencilIcon, Trash2 } from "lucide-react";

export default function ContactsPage() {
  const [contactList, setContactList] = useState<Contact[]>(contacts);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    status: "lead"
  });

  const filteredContacts = contactList.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateContact = () => {
    const id = (Math.max(...contactList.map(c => Number(c.id)), 0) + 1).toString();
    const contact: Contact = {
      id,
      name: newContact.name || "",
      email: newContact.email || "",
      phone: newContact.phone,
      company: newContact.company,
      position: newContact.position,
      status: newContact.status as "lead" | "prospect" | "customer" | "inactive",
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    setContactList([...contactList, contact]);
    setNewContact({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      status: "lead"
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditContact = () => {
    if (!currentContact) return;
    
    setContactList(contactList.map(contact => 
      contact.id === currentContact.id ? currentContact : contact
    ));
    
    setIsEditDialogOpen(false);
    setCurrentContact(null);
  };

  const handleDeleteContact = () => {
    if (!currentContact) return;
    
    setContactList(contactList.filter(contact => contact.id !== currentContact.id));
    setIsDeleteDialogOpen(false);
    setCurrentContact(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "lead":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Lead</Badge>;
      case "prospect":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Prospecto</Badge>;
      case "customer":
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Cliente</Badge>;
      case "inactive":
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contactos</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Añadir Contacto
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todos los Contactos</CardTitle>
          <CardDescription>
            Gestiona tus contactos, edita su información y realiza un seguimiento de su estado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contactos..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Posición</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.company || "-"}</TableCell>
                    <TableCell>{contact.position || "-"}</TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentContact(contact);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCurrentContact(contact);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron contactos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Contact Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Contacto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre*</Label>
                <Input 
                  id="name" 
                  value={newContact.name} 
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newContact.email} 
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={newContact.phone} 
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Empresa</Label>
                <Input 
                  id="company" 
                  value={newContact.company} 
                  onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="position">Posición</Label>
                <Input 
                  id="position" 
                  value={newContact.position} 
                  onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Estado</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-lead" 
                      checked={newContact.status === "lead"}
                      onCheckedChange={() => setNewContact({...newContact, status: "lead"})} 
                    />
                    <label htmlFor="status-lead">Lead</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-prospect" 
                      checked={newContact.status === "prospect"}
                      onCheckedChange={() => setNewContact({...newContact, status: "prospect"})} 
                    />
                    <label htmlFor="status-prospect">Prospecto</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-customer" 
                      checked={newContact.status === "customer"}
                      onCheckedChange={() => setNewContact({...newContact, status: "customer"})} 
                    />
                    <label htmlFor="status-customer">Cliente</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateContact} 
              disabled={!newContact.name || !newContact.email}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Contacto</DialogTitle>
          </DialogHeader>
          {currentContact && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Nombre*</Label>
                  <Input 
                    id="edit-name" 
                    value={currentContact.name} 
                    onChange={(e) => setCurrentContact({...currentContact, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-email">Email*</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={currentContact.email} 
                    onChange={(e) => setCurrentContact({...currentContact, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <Input 
                    id="edit-phone" 
                    value={currentContact.phone || ""} 
                    onChange={(e) => setCurrentContact({...currentContact, phone: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-company">Empresa</Label>
                  <Input 
                    id="edit-company" 
                    value={currentContact.company || ""} 
                    onChange={(e) => setCurrentContact({...currentContact, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-position">Posición</Label>
                  <Input 
                    id="edit-position" 
                    value={currentContact.position || ""} 
                    onChange={(e) => setCurrentContact({...currentContact, position: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Estado</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-status-lead" 
                        checked={currentContact.status === "lead"}
                        onCheckedChange={() => setCurrentContact({...currentContact, status: "lead"})} 
                      />
                      <label htmlFor="edit-status-lead">Lead</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-status-prospect" 
                        checked={currentContact.status === "prospect"}
                        onCheckedChange={() => setCurrentContact({...currentContact, status: "prospect"})} 
                      />
                      <label htmlFor="edit-status-prospect">Prospecto</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-status-customer" 
                        checked={currentContact.status === "customer"}
                        onCheckedChange={() => setCurrentContact({...currentContact, status: "customer"})} 
                      />
                      <label htmlFor="edit-status-customer">Cliente</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleEditContact} 
              disabled={!currentContact?.name || !currentContact?.email}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Contact Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Eliminar Contacto</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>¿Estás seguro de que quieres eliminar el contacto {currentContact?.name}?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteContact}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
