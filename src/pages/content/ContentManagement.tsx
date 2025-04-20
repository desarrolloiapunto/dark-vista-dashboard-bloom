
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentCalendar } from "@/components/content/ContentCalendar";
import { Calendar, Share2, Settings } from "lucide-react";

export default function ContentManagement() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manejo de Contenido</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Vista Calendario
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Publicar
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>
      
      <ContentCalendar />
    </div>
  );
}
