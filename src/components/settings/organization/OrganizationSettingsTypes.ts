
import { z } from "zod";

export const currencyOptions = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "AUD - Australian Dollar", value: "AUD" },
  { label: "CNY - Chinese Yuan", value: "CNY" },
  { label: "MXN - Mexican Peso", value: "MXN" }
];

export const orgFormSchema = z.object({
  name: z.string().min(2, { message: "Organization name is required" }),
  logo: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  currency: z.string(),
  timezone: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  subdomain: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, {
    message: "Subdomain can only contain lowercase letters, numbers, and hyphens"
  }).optional().or(z.string().length(0)),
  customDomain: z.string().regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/, {
    message: "Please enter a valid domain"
  }).optional().or(z.string().length(0)),
  enableHelp: z.boolean().default(true),
  taxId: z.string().optional(),
});

export type OrganizationFormValues = z.infer<typeof orgFormSchema>;
