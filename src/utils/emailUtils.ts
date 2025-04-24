
import { Email, EmailView } from "@/types/email";

export const filterEmails = (emails: Email[], view: EmailView): Email[] => {
  switch (view) {
    case "inbox":
      return emails.filter(email => email.folder === "inbox");
    case "sent":
      return emails.filter(email => email.folder === "sent");
    case "drafts":
      return emails.filter(email => email.folder === "drafts");
    case "spam":
      return emails.filter(email => email.folder === "spam");
    case "trash":
      return emails.filter(email => email.folder === "trash");
    case "starred":
      return emails.filter(email => email.isStarred);
    case "labels":
      return emails.filter(email => email.labels && email.labels.length > 0);
    default:
      return emails;
  }
};

export const formatEmailDate = (date: string, detailed = false): string => {
  const emailDate = new Date(date);
  const now = new Date();
  
  if (!detailed) {
    // Simple date formatting for lists
    if (emailDate.toDateString() === now.toDateString()) {
      return emailDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    
    if (emailDate.getFullYear() === now.getFullYear()) {
      return emailDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }
    
    return emailDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  } else {
    // Detailed date formatting for email view
    return emailDate.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export const getEmailById = (emailId: string, emails: Email[]): Email | undefined => {
  return emails.find(email => email.id === emailId);
};
