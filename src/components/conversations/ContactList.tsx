
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Check, MessageCircle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Channel } from "@/types/conversations";
import { Badge } from "@/components/ui/badge";
import { getChannelIcon, getChannelColor } from "@/lib/conversationUtils";

interface ContactListProps {
  contacts: Contact[];
  activeConversationId?: string;
  onChannelChange: (channel: Channel | "all") => void;
  activeChannel: Channel | "all";
}

const ContactList = ({ 
  contacts, 
  activeConversationId, 
  onChannelChange, 
  activeChannel 
}: ContactListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const channelOptions = [
    { value: "all", label: "Todos los canales" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "telegram", label: "Telegram" },
  ];

  const getChannelLabel = (channel: Channel | "all") => {
    return channelOptions.find(opt => opt.value === channel)?.label || "Todos los canales";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversación..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-3 border-y border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {getChannelLabel(activeChannel)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup 
              value={activeChannel} 
              onValueChange={(value) => onChannelChange(value as Channel | "all")}
            >
              {channelOptions.map(option => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.value !== "all" && (
                      <div className={`text-${getChannelColor(option.value as Channel)}`}>
                        {getChannelIcon(option.value as Channel, { size: 16 })}
                      </div>
                    )}
                    {option.value === "all" && <MessageCircle size={16} />}
                    {option.label}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <Link
            key={contact.id}
            to={`/conversations/${contact.conversations[0]}`}
            className={`flex items-center p-3 hover:bg-accent transition-colors border-b border-border ${
              contact.conversations.includes(activeConversationId || "") ? "bg-accent" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -right-1 -bottom-1 bg-background rounded-full p-0.5">
                {getChannelIcon(contact.channel, { size: 14 })}
              </div>
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{contact.name}</p>
                <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
              </div>
              <div className="flex items-center gap-1">
                {contact.unreadCount > 0 && (
                  <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {contact.unreadCount}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessageSender === "me" && (
                    <span className="inline-flex items-center mr-1">
                      <Check className="h-3 w-3 inline mr-1" />
                    </span>
                  )}
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
