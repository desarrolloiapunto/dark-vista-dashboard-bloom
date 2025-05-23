
import { z } from "zod";

export const displayFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "es"]),
  timezone: z.string(),
  dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]),
  timeFormat: z.enum(["12h", "24h"]),
  compactMode: z.boolean().default(false),
  highContrast: z.boolean().default(false),
  animationsEnabled: z.boolean().default(true),
});

export type DisplayFormValues = z.infer<typeof displayFormSchema>;
