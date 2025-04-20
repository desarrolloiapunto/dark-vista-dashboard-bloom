
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Image, Video, Link, FileText } from "lucide-react";

const socialNetworks = [
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
];

const contentTypes = [
  { id: "text", icon: FileText, label: "Texto" },
  { id: "image", icon: Image, label: "Imagen" },
  { id: "video", icon: Video, label: "Video" },
  { id: "link", icon: Link, label: "Enlace" },
];

export function CreateContentForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);

  const handleNetworkToggle = (networkId: string) => {
    setSelectedNetworks(prev =>
      prev.includes(networkId)
        ? prev.filter(id => id !== networkId)
        : [...prev, networkId]
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Crear Nueva Publicación</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Tipo de Contenido</Label>
          <div className="flex gap-2">
            {contentTypes.map(({ id, icon: Icon, label }) => (
              <Button
                key={id}
                variant="outline"
                className="flex-1"
                onClick={() => {}}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Redes Sociales</Label>
          <div className="flex gap-2">
            {socialNetworks.map((network) => (
              <Button
                key={network.id}
                variant={selectedNetworks.includes(network.id) ? "default" : "outline"}
                onClick={() => handleNetworkToggle(network.id)}
              >
                {network.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Contenido</Label>
          <Textarea placeholder="Escribe tu contenido aquí..." className="min-h-[100px]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Fecha de Publicación</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Hora</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar hora" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }).map((_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                    {`${i.toString().padStart(2, '0')}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Programar Publicación</Button>
        </div>
      </div>
    </Card>
  );
}
