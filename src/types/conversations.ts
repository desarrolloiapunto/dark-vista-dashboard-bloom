
export type Channel = "whatsapp" | "facebook" | "instagram" | "telegram";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  channel: Channel;
  conversations: string[];
  lastMessage: string;
  lastMessageSender: "me" | "them";
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
  status: "sent" | "delivered" | "read";
  isRead: boolean;
  attachments?: {
    url: string;
    type: "image" | "document" | "audio" | "video";
    name: string;
  }[];
}

export interface Conversation {
  id: string;
  contactId: string;
  channel: Channel;
  status: "active" | "pending" | "resolved";
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  assignedTo?: string;
  tags?: string[];
}
