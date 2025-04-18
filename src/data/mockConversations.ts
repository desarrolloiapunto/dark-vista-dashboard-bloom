
import { Contact, Message, Conversation, Channel } from "@/types/conversations";

// Lista de contactos de muestra
export const mockContacts: Contact[] = [
  {
    id: "contact1",
    name: "Juan Pérez",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "+34 612 345 678",
    channel: "whatsapp",
    conversations: ["conv1"],
    lastMessage: "¿Cuándo estará disponible el producto?",
    lastMessageSender: "them",
    lastMessageTime: "10:34",
    unreadCount: 2
  },
  {
    id: "contact2",
    name: "María López",
    avatar: "https://i.pravatar.cc/150?img=2",
    phone: "+34 623 456 789",
    channel: "facebook",
    conversations: ["conv2"],
    lastMessage: "Gracias por la información",
    lastMessageSender: "them",
    lastMessageTime: "Ayer",
    unreadCount: 0
  },
  {
    id: "contact3",
    name: "Carlos Gómez",
    avatar: "https://i.pravatar.cc/150?img=3",
    phone: "+34 634 567 890",
    channel: "instagram",
    conversations: ["conv3"],
    lastMessage: "Le enviaré los detalles del pedido",
    lastMessageSender: "me",
    lastMessageTime: "9:15",
    unreadCount: 0
  },
  {
    id: "contact4",
    name: "Sofía Martínez",
    avatar: "https://i.pravatar.cc/150?img=4",
    phone: "+34 645 678 901",
    channel: "telegram",
    conversations: ["conv4"],
    lastMessage: "¿Podría revisar mi solicitud?",
    lastMessageSender: "them",
    lastMessageTime: "Ayer",
    unreadCount: 1
  },
  {
    id: "contact5",
    name: "David Rodríguez",
    avatar: "https://i.pravatar.cc/150?img=5",
    phone: "+34 656 789 012",
    channel: "whatsapp",
    conversations: ["conv5"],
    lastMessage: "Perfecto, muchas gracias",
    lastMessageSender: "them",
    lastMessageTime: "Lun",
    unreadCount: 0
  },
  {
    id: "contact6",
    name: "Laura Sánchez",
    avatar: "https://i.pravatar.cc/150?img=6",
    email: "laura@example.com",
    channel: "facebook",
    conversations: ["conv6"],
    lastMessage: "Esperaré su respuesta",
    lastMessageSender: "them",
    lastMessageTime: "Mar",
    unreadCount: 0
  },
  {
    id: "contact7",
    name: "Javier Fernández",
    avatar: "https://i.pravatar.cc/150?img=7",
    phone: "+34 678 901 234",
    channel: "instagram",
    conversations: ["conv7"],
    lastMessage: "¿Tienen envío internacional?",
    lastMessageSender: "them",
    lastMessageTime: "8:45",
    unreadCount: 3
  },
  {
    id: "contact8",
    name: "Ana García",
    avatar: "https://i.pravatar.cc/150?img=8",
    phone: "+34 689 012 345",
    channel: "telegram",
    conversations: ["conv8"],
    lastMessage: "Le he enviado el comprobante de pago",
    lastMessageSender: "me",
    lastMessageTime: "Mié",
    unreadCount: 0
  }
];

// Lista de conversaciones
export const mockConversations: Conversation[] = mockContacts.map((contact) => ({
  id: contact.conversations[0],
  contactId: contact.id,
  channel: contact.channel,
  status: Math.random() > 0.5 ? "active" : Math.random() > 0.5 ? "pending" : "resolved",
  createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  isStarred: Math.random() > 0.8,
  assignedTo: Math.random() > 0.7 ? "user1" : undefined,
  tags: Math.random() > 0.6 ? ["venta", "consulta"] : undefined
}));

// Mensajes de muestra
export const mockMessages: Message[] = [
  // Conversación 1
  {
    id: "msg1-1",
    conversationId: "conv1",
    text: "Hola, ¿tienen disponible el modelo X1?",
    sender: "them",
    timestamp: "2023-05-01T10:30:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg1-2",
    conversationId: "conv1",
    text: "Buenos días, sí, aún nos quedan algunas unidades del modelo X1.",
    sender: "me",
    timestamp: "2023-05-01T10:35:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg1-3",
    conversationId: "conv1",
    text: "¿Cuándo estará disponible el producto?",
    sender: "them",
    timestamp: "2023-05-01T10:40:00",
    status: "delivered",
    isRead: false
  },
  
  // Conversación 2
  {
    id: "msg2-1",
    conversationId: "conv2",
    text: "Hola, quisiera hacer una consulta sobre sus servicios.",
    sender: "them",
    timestamp: "2023-05-02T09:00:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg2-2",
    conversationId: "conv2",
    text: "Claro, estaré encantado de ayudarle. ¿En qué puedo servirle?",
    sender: "me",
    timestamp: "2023-05-02T09:05:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg2-3",
    conversationId: "conv2",
    text: "Gracias por la información",
    sender: "them",
    timestamp: "2023-05-02T09:10:00",
    status: "read",
    isRead: true
  },
  
  // Conversación 3
  {
    id: "msg3-1",
    conversationId: "conv3",
    text: "Necesito información sobre mi pedido #45678.",
    sender: "them",
    timestamp: "2023-05-03T14:20:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg3-2",
    conversationId: "conv3",
    text: "Por supuesto, permítame revisar su pedido. Un momento por favor.",
    sender: "me",
    timestamp: "2023-05-03T14:25:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg3-3",
    conversationId: "conv3",
    text: "Su pedido se encuentra en tránsito y debería llegar en 2-3 días hábiles.",
    sender: "me",
    timestamp: "2023-05-03T14:30:00",
    status: "read",
    isRead: true
  },
  {
    id: "msg3-4",
    conversationId: "conv3",
    text: "Le enviaré los detalles del pedido",
    sender: "me",
    timestamp: "2023-05-03T14:35:00",
    status: "delivered",
    isRead: true
  }
];
