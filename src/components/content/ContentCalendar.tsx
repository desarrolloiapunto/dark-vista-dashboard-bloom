
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Image, FileText, Video, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data for social media posts
const mockPosts = [
  {
    id: "1",
    content: "🎉 Exciting news coming soon! Stay tuned for our latest product launch.",
    type: "text",
    networks: ["facebook", "twitter", "instagram"],
    scheduledDate: new Date("2024-04-21T10:00:00"),
    status: "scheduled",
  },
  {
    id: "2",
    content: "Check out our new product line! 🌟",
    type: "image",
    networks: ["instagram", "facebook"],
    scheduledDate: new Date("2024-04-22T15:30:00"),
    status: "scheduled",
  },
  {
    id: "3",
    content: "Breaking: Industry insights for 2024! 📊",
    type: "text",
    networks: ["linkedin", "twitter"],
    scheduledDate: new Date("2024-04-20T09:00:00"),
    status: "published",
  },
];

export function ContentCalendar() {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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
      default:
        return "bg-gray-500";
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
                              <div className="mt-2 text-xs text-muted-foreground">
                                {format(post.scheduledDate, "HH:mm")} - {post.status}
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
