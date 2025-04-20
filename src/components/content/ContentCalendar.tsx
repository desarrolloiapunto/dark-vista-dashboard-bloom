
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image, FileText, Video, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreateContentForm } from "./CreateContentForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for social media posts
const mockPosts = [
  {
    id: "1",
    content: "🎉 ¡Grandes novedades! Estén atentos a nuestro próximo lanzamiento.",
    type: "text",
    networks: ["facebook", "twitter", "instagram"],
    scheduledDate: new Date("2024-04-21T10:00:00"),
    status: "scheduled",
  },
  {
    id: "2",
    content: "¡Mira nuestra nueva línea de productos! 🌟 #Innovación #Calidad",
    type: "image",
    networks: ["instagram", "facebook"],
    scheduledDate: new Date("2024-04-22T15:30:00"),
    status: "scheduled",
  },
  {
    id: "3",
    content: "Últimas tendencias de la industria para 2024! 📊 #Tendencias",
    type: "text",
    networks: ["linkedin", "twitter"],
    scheduledDate: new Date("2024-04-20T09:00:00"),
    status: "published",
  },
  {
    id: "4",
    content: "Tutorial: Cómo maximizar tu productividad 🎥 #Productividad",
    type: "video",
    networks: ["youtube", "facebook"],
    scheduledDate: new Date("2024-04-23T14:00:00"),
    status: "scheduled",
  },
  {
    id: "5",
    content: "¡No te pierdas nuestro webinar gratuito! 📅 Regístrate ahora.",
    type: "link",
    networks: ["linkedin", "twitter", "facebook"],
    scheduledDate: new Date("2024-04-24T11:00:00"),
    status: "draft",
  }
];

export function ContentCalendar() {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPosts(items);
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(
      (post) => format(post.scheduledDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case "facebook":
        return "bg-blue-500";
      case "twitter":
        return "bg-sky-500";
      case "instagram":
        return "bg-pink-500";
      case "linkedin":
        return "bg-blue-700";
      case "youtube":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-600";
      case "scheduled":
        return "text-blue-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-80">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Calendario</h3>
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Hoy
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <div className="mt-4">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  Crear Nueva Publicación
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <CreateContentForm />
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      <div className="flex-1">
        <Card className="p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="posts">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {selectedDate &&
                    getPostsForDate(selectedDate).map((post, index) => (
                      <Draggable key={post.id} draggableId={post.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3"
                          >
                            <Card className={cn(
                              "p-4 hover:shadow-md transition-shadow",
                              post.status === "published" ? "bg-muted" : "bg-card"
                            )}>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  {getIconForType(post.type)}
                                  <span className="text-sm">{post.content}</span>
                                </div>
                                <div className="flex gap-1">
                                  {post.networks.map((network) => (
                                    <Badge
                                      key={network}
                                      className={cn("capitalize", getNetworkColor(network))}
                                    >
                                      {network}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-2 text-xs flex justify-between items-center">
                                <span className={getStatusColor(post.status)}>
                                  {post.status}
                                </span>
                                <span className="text-muted-foreground">
                                  {format(post.scheduledDate, "HH:mm")}
                                </span>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Card>
      </div>
    </div>
  );
}
