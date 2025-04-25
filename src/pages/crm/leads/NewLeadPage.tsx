
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NewLeadPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    notes: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would usually send the data to your backend
    toast({
      title: "Lead creado con éxito",
      description: `Se ha creado un nuevo lead para ${formData.name}`,
    });
    
    // Navigate back to the leads list
    navigate("/crm/leads");
  };
  
  const sourceOptions = [
    { value: "web", label: "Sitio Web" },
    { value: "social", label: "Redes Sociales" },
    { value: "referral", label: "Referencias" },
    { value: "email", label: "Email Marketing" },
    { value: "event", label: "Eventos" },
    { value: "other", label: "Otro" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/crm/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Nuevo Lead</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Lead</CardTitle>
            <CardDescription>
              Introduce los datos de contacto del nuevo lead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Nombre completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="correo@ejemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="+34 600 000 000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Nombre de la empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange} 
                  placeholder="Cargo en la empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Origen del Lead *</Label>
                <Select 
                  name="source" 
                  value={formData.source} 
                  onValueChange={(value) => handleSelectChange("source", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un origen" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                placeholder="Información adicional sobre el lead..."
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" asChild>
              <Link to="/crm/leads">Cancelar</Link>
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Guardar Lead
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
