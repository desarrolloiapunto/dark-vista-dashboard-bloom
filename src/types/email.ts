
export type EmailView = "inbox" | "sent" | "drafts" | "spam" | "trash" | "marketing";

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  attachments?: { name: string; size: string }[];
}

export interface EmailLabel {
  id: string;
  name: string;
  color: string;
}
