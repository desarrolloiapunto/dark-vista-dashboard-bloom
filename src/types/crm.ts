
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  lastContact?: string;
  status: "lead" | "prospect" | "customer" | "inactive";
  notes?: string;
  tags?: string[];
  avatarUrl?: string;
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
    type: "contact" | "company" | "opportunity";
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
