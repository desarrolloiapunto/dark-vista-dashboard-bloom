import { Opportunity, StageColumn } from "@/types/crm";

export const opportunities: Opportunity[] = [
  {
    id: "1",
    name: "Implementación sistema CRM",
    company: "Tecnología SA",
    amount: 15000,
    stage: "proposal",
    probability: 60,
    expectedCloseDate: "2025-05-15",
    owner: "Usuario Actual",
    contacts: ["1"],
    createdAt: "2025-03-20",
    lastUpdated: "2025-04-15",
    quotes: ["1"]
  },
  {
    id: "2",
    name: "Consultoría estratégica",
    company: "Innovaciones SL",
    amount: 8000,
    stage: "needs_analysis",
    probability: 40,
    expectedCloseDate: "2025-05-30",
    owner: "Usuario Actual",
    contacts: ["2"],
    createdAt: "2025-04-01",
    lastUpdated: "2025-04-10"
  },
  {
    id: "3",
    name: "Desarrollo de aplicación web",
    company: "Desarrollos Web",
    amount: 25000,
    stage: "negotiation",
    probability: 80,
    expectedCloseDate: "2025-05-25",
    owner: "Usuario Actual",
    contacts: ["3"],
    createdAt: "2025-03-15",
    lastUpdated: "2025-04-18",
    quotes: ["2"]
  },
  {
    id: "4",
    name: "Implementación de Business Intelligence",
    company: "Consultora Tecnológica",
    amount: 20000,
    stage: "closed_won",
    probability: 100,
    expectedCloseDate: "2025-04-10",
    owner: "Usuario Actual",
    contacts: ["4"],
    createdAt: "2025-02-20",
    lastUpdated: "2025-04-10",
    quotes: ["3"]
  },
  {
    id: "5",
    name: "Campaña de marketing digital",
    company: "Soluciones Digitales",
    amount: 5000,
    stage: "closed_lost",
    probability: 0,
    expectedCloseDate: "2025-03-30",
    owner: "Usuario Actual",
    contacts: ["5"],
    createdAt: "2025-03-01",
    lastUpdated: "2025-03-30"
  },
  {
    id: "6",
    name: "Mantenimiento infraestructura",
    company: "Tecnología SA",
    amount: 12000,
    stage: "prospecting",
    probability: 20,
    expectedCloseDate: "2025-06-15",
    owner: "Usuario Actual",
    contacts: ["1"],
    createdAt: "2025-04-10",
    lastUpdated: "2025-04-10"
  },
  {
    id: "7",
    name: "Servicio de soporte técnico",
    company: "Desarrollos Web",
    amount: 9000,
    stage: "qualification",
    probability: 30,
    expectedCloseDate: "2025-06-01",
    owner: "Usuario Actual",
    contacts: ["3"],
    createdAt: "2025-04-05",
    lastUpdated: "2025-04-15"
  }
];

export const stageColumns: StageColumn[] = [
  { 
    id: "prospecting", 
    title: "Prospección", 
    opportunities: opportunities.filter(o => o.stage === "prospecting") 
  },
  { 
    id: "qualification", 
    title: "Calificación", 
    opportunities: opportunities.filter(o => o.stage === "qualification") 
  },
  { 
    id: "needs_analysis", 
    title: "Análisis de Necesidades", 
    opportunities: opportunities.filter(o => o.stage === "needs_analysis") 
  },
  { 
    id: "proposal", 
    title: "Propuesta", 
    opportunities: opportunities.filter(o => o.stage === "proposal") 
  },
  { 
    id: "negotiation", 
    title: "Negociación", 
    opportunities: opportunities.filter(o => o.stage === "negotiation") 
  },
  { 
    id: "closed_won", 
    title: "Ganado", 
    opportunities: opportunities.filter(o => o.stage === "closed_won") 
  },
  { 
    id: "closed_lost", 
    title: "Perdido", 
    opportunities: opportunities.filter(o => o.stage === "closed_lost") 
  }
];
