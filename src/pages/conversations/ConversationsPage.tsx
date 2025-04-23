
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactList from "@/components/conversations/ContactList";
import ConversationView from "@/components/conversations/ConversationView";
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
          <ContactList 
            contacts={filteredContacts} 
            activeConversationId={conversationId}
            onChannelChange={handleChannelChange}
            activeChannel={activeChannel}
          />
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          {conversationId ? (
            <ConversationView 
              messages={currentMessages} 
              contact={contacts.find(c => c.conversations.includes(conversationId))}
              onSendMessage={handleSendMessage} 
            />
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;
