
import { Email, EmailView } from "@/types/email";

export const filterEmails = (emails: Email[], view: EmailView): Email[] => {
  switch (view) {
    case "inbox":
      return emails.filter(email => !email.labels.includes("sent"));
    case "sent":
      return emails.filter(email => email.labels.includes("sent"));
    case "drafts":
      return emails.filter(email => email.labels.includes("borradores"));
    case "spam":
      return emails.filter(email => email.labels.includes("spam"));
    case "trash":
      return emails.filter(email => email.labels.includes("trash"));
    case "marketing":
      return emails.filter(email => email.labels.includes("promociones"));
    default:
      return emails;
  }
};

export const formatEmailDate = (date: string): string => {
  const emailDate = new Date(date);
  const now = new Date();
  
  if (emailDate.toDateString() === now.toDateString()) {
    return emailDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }
  
  if (emailDate.getFullYear() === now.getFullYear()) {
    return emailDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  }
  
  return emailDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
};
