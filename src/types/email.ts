
export type EmailView = "inbox" | "sent" | "drafts" | "spam" | "trash" | "marketing" | "starred" | "labels";

export interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  attachments?: { name: string; size: string; type: string }[];
  folder: EmailView;
}

export interface EmailLabel {
  id: string;
  name: string;
  color: string;
}

export interface EmailFolder {
  id: EmailView;
  name: string;
  icon: React.ComponentType;
  count?: number;
}

export type EmailAction = "reply" | "replyAll" | "forward" | "delete" | "markAsRead" | "markAsUnread" | "star" | "unstar";
