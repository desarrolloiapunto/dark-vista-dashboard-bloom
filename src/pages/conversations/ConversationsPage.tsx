
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactList from "@/components/conversations/ContactList";
import ConversationView from "@/components/conversations/ConversationView";
import ConversationDashboard from "@/components/conversations/ConversationDashboard";
import NoConversationSelected from "@/components/conversations/NoConversationSelected";
import { Conversation, Contact, Message, Channel } from "@/types/conversations";
import { mockContacts, mockConversations, mockMessages } from "@/data/mockConversations";

const ConversationsPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | "all">("all");
  const [view, setView] = useState<"chat" | "dashboard">("chat");

  // Filter contacts based on active channel
  const filteredContacts = contacts.filter(contact => 
    activeChannel === "all" ? true : contact.channel === activeChannel
  );

  useEffect(() => {
    // If a conversation is selected, load its messages
    if (conversationId) {
      const selectedMessages = mockMessages.filter(
        message => message.conversationId === conversationId
      );
      setCurrentMessages(selectedMessages);
      setView("chat");
    }
  }, [conversationId]);

  const handleSendMessage = (text: string) => {
    if (!conversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      text,
      sender: "me",
      timestamp: new Date().toISOString(),
      status: "sent",
      isRead: true
    };

    setCurrentMessages(prev => [...prev, newMessage]);
  };

  const handleChannelChange = (channel: Channel | "all") => {
    setActiveChannel(channel);
    // Reset conversation selection when changing channels
    navigate("/conversations");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar with contacts */}
        <div className="w-72 border-r border-border bg-card overflow-y-auto">
          <div className="p-4 border-b border-border">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger 
                  value="chat" 
                  className="flex-1"
                  onClick={() => setView("chat")}
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard" 
                  className="flex-1"
                  onClick={() => setView("dashboard")}
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ContactList 
            contacts={filteredContacts} 
            activeConversationId={conversationId}
            onChannelChange={handleChannelChange}
            activeChannel={activeChannel}
          />
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          {view === "chat" ? (
            conversationId ? (
              <ConversationView 
                messages={currentMessages} 
                contact={contacts.find(c => c.conversations.includes(conversationId))}
                onSendMessage={handleSendMessage} 
              />
            ) : (
              <NoConversationSelected />
            )
          ) : (
            <ConversationDashboard conversations={conversations} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;
