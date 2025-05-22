
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderPlus, Search, Image, FileText, FileVideo, Filter } from "lucide-react";

// Datos de ejemplo para la biblioteca
const libraryItems = [
  { id: 1, type: "image", name: "Banner promocional.png", date: "2023-12-10", size: "1.2 MB", uses: 5 },
  { id: 2, type: "image", name: "Logo principal.png", date: "2023-12-05", size: "0.5 MB", uses: 12 },
  { id: 3, type: "document", name: "Guía de marca.pdf", date: "2023-11-20", size: "2.5 MB", uses: 3 },
  { id: 4, type: "document", name: "Estrategia de contenido.docx", date: "2023-11-15", size: "1.8 MB", uses: 2 },
  { id: 5, type: "video", name: "Video promocional.mp4", date: "2023-10-25", size: "15.6 MB", uses: 8 },
  { id: 6, type: "image", name: "Plantilla post.psd", date: "2023-10-15", size: "4.2 MB", uses: 7 },
];

export default function ContentLibrary() {
  const { t } = useTranslation();
  
  // Función para renderizar el icono según el tipo de archivo
  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-8 w-8 text-blue-500" />;
      case "document":
        return <FileText className="h-8 w-8 text-amber-500" />;
      case "video":
        return <FileVideo className="h-8 w-8 text-red-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('content.library.title')}</h1>
          <p className="text-muted-foreground">{t('content.library.description')}</p>
        </div>
        <Button>
          <FolderPlus size={16} className="mr-2" />
          Subir archivo
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="images">Imágenes</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar en biblioteca..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recursos disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-muted h-32 flex items-center justify-center border-b">
                      {getIcon(item.type)}
                    </div>
                    <CardContent className="p-4">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{item.date}</span>
                        <span>{item.size}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Usado en {item.uses} publicaciones
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryItems.filter(item => item.type === "image").map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-muted h-32 flex items-center justify-center border-b">
                      {getIcon(item.type)}
                    </div>
                    <CardContent className="p-4">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{item.date}</span>
                        <span>{item.size}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryItems.filter(item => item.type === "document").map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-muted h-32 flex items-center justify-center border-b">
                      {getIcon(item.type)}
                    </div>
                    <CardContent className="p-4">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{item.date}</span>
                        <span>{item.size}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryItems.filter(item => item.type === "video").map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="bg-muted h-32 flex items-center justify-center border-b">
                      {getIcon(item.type)}
                    </div>
                    <CardContent className="p-4">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{item.date}</span>
                        <span>{item.size}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
