
import { z } from "zod";

export const notificationsFormSchema = z.object({
  enableEmailNotifications: z.boolean().default(true),
  enablePushNotifications: z.boolean().default(true),
  enableSmsNotifications: z.boolean().default(false),
  notifyNewMessages: z.boolean().default(true),
  notifyTaskAssignments: z.boolean().default(true),
  notifyLeads: z.boolean().default(true),
  notifyMentions: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
