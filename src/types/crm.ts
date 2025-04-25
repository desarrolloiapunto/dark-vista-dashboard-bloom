export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  lastContact?: string;
  status: "lead" | "prospect" | "customer" | "inactive" | "qualified" | "unqualified";
  notes?: string;
  tags?: string[];
  avatarUrl?: string;
  assignedTo?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website?: string;
  employees?: number;
  revenue?: string;
  address?: string;
  country?: string;
  phone?: string;
  email?: string;
  contactPerson?: string;
  status: "prospect" | "client" | "partner" | "inactive";
  notes?: string;
  logoUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  assignedTo?: string;
  relatedTo?: {
    type: "contact" | "company" | "opportunity" | "quote";
    id: string;
    name: string;
  };
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "canceled";
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  company: string;
  amount: number;
  stage: OpportunityStage;
  probability: number;
  expectedCloseDate: string;
  owner?: string;
  contacts?: string[];
  products?: string[];
  notes?: string;
  createdAt: string;
  lastUpdated: string;
  quotes?: string[]; // IDs de cotizaciones relacionadas
}

export type OpportunityStage = 
  | "prospecting" 
  | "qualification" 
  | "needs_analysis" 
  | "proposal" 
  | "negotiation" 
  | "closed_won" 
  | "closed_lost";

export interface StageColumn {
  id: OpportunityStage;
  title: string;
  opportunities: Opportunity[];
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  period: string;
}

// Nuevos tipos para cotizaciones y productos

export interface Quote {
  id: string;
  name: string;
  opportunityId: string;
  clientId: string;
  clientName: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  amount: number;
  discount?: number;
  tax?: number;
  totalAmount: number;
  validUntil: string;
  items: QuoteItem[];
  notes?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  totalPrice: number;
}

export interface Product {
  id: string;
  type: "product" | "service" | "package";
  name: string;
  description?: string;
  sku?: string;
  price: number;
  cost?: number;
  taxRate?: number;
  category?: string;
  hasVariants: boolean;
  variants?: ProductVariant[];
  packageItems?: PackageItem[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  attributes: { [key: string]: string };
  price: number;
  cost?: number;
  active: boolean;
}

export interface PackageItem {
  productId: string;
  productName: string;
  quantity: number;
}
