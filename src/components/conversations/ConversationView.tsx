
import { useRef, useEffect, useState } from "react";
import { PaperclipIcon, SmileIcon, Send, Mic, Image, File, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Contact, Message } from "@/types/conversations";
import { getChannelIcon } from "@/lib/conversationUtils";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { QuickReplies } from "@/data/quickReplies";

interface ConversationViewProps {
  contact?: Contact;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ConversationView = ({ contact, messages, onSendMessage }: ConversationViewProps) => {
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamps for display
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Apply quick reply template
  const handleQuickReply = (replyText: string) => {
    setMessageText(replyText);
  };

  if (!contact) return <div className="h-full flex items-center justify-center">Conversación no encontrada</div>;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center px-4 py-3 border-b border-border bg-card">
        <Avatar className="h-10 w-10">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="flex items-center gap-2">
            <p className="font-medium">{contact.name}</p>
            <div className="text-muted-foreground">
              {getChannelIcon(contact.channel, { size: 16 })}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {contact.phone || contact.email || "En línea"}
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <p>{message.text}</p>
                <div 
                  className={`text-xs mt-1 flex justify-end ${
                    message.sender === "me"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-border p-3 bg-card">
        <div className="flex items-end gap-2">
          {/* Attachment dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <PaperclipIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem>
                <Image className="h-4 w-4 mr-2" />
                <span>Imagen</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <File className="h-4 w-4 mr-2" />
                <span>Documento</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Quick replies popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <SmileIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-72">
              <div className="space-y-2">
                <h4 className="font-medium">Respuestas rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  {QuickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-2 px-3 justify-start font-normal text-sm"
                      onClick={() => handleQuickReply(reply.text)}
                    >
                      {reply.label}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Text input */}
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            className="min-h-[40px] resize-none flex-1"
            rows={1}
          />
          
          <Button 
            onClick={handleSendMessage} 
            disabled={!messageText.trim()} 
            size="icon" 
            className="rounded-full"
          >
            {messageText.trim() ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
