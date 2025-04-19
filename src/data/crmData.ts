
import { Contact, Company, Task, Opportunity, StageColumn, DashboardMetric } from "@/types/crm";

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    phone: "+34 612 345 678",
    company: "Tecnología SA",
    position: "Director de Marketing",
    status: "customer",
    lastContact: "2025-04-12",
    avatarUrl: "https://i.pravatar.cc/150?u=carlos"
  },
  {
    id: "2",
    name: "Ana Martínez",
    email: "ana@innovaciones.es",
    phone: "+34 623 456 789",
    company: "Innovaciones SL",
    position: "CEO",
    status: "prospect",
    lastContact: "2025-04-05",
    avatarUrl: "https://i.pravatar.cc/150?u=ana"
  },
  {
    id: "3",
    name: "Luis García",
    email: "luis@desarrollos.com",
    phone: "+34 634 567 890",
    company: "Desarrollos Web",
    position: "CTO",
    status: "lead",
    lastContact: "2025-04-15",
    avatarUrl: "https://i.pravatar.cc/150?u=luis"
  },
  {
    id: "4",
    name: "Elena Gómez",
    email: "elena@consultora.com",
    phone: "+34 645 678 901",
    company: "Consultora Tecnológica",
    position: "Consultora",
    status: "customer",
    lastContact: "2025-04-10",
    avatarUrl: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: "5",
    name: "Miguel Fernández",
    email: "miguel@soluciones.es",
    phone: "+34 656 789 012",
    company: "Soluciones Digitales",
    position: "Director de Ventas",
    status: "inactive",
    lastContact: "2025-03-20",
    avatarUrl: "https://i.pravatar.cc/150?u=miguel"
  }
];

export const companies: Company[] = [
  {
    id: "1",
    name: "Tecnología SA",
    industry: "Tecnología",
    website: "https://tecnologia.com",
    employees: 120,
    revenue: "€5M - €10M",
    country: "España",
    status: "client",
    logoUrl: "https://i.pravatar.cc/150?u=tech"
  },
  {
    id: "2",
    name: "Innovaciones SL",
    industry: "Consultoría",
    website: "https://innovaciones.es",
    employees: 45,
    revenue: "€1M - €5M",
    country: "España",
    status: "prospect",
    logoUrl: "https://i.pravatar.cc/150?u=innova"
  },
  {
    id: "3",
    name: "Desarrollos Web",
    industry: "Tecnología",
    website: "https://desarrollosweb.com",
    employees: 35,
    revenue: "€1M - €5M",
    country: "España",
    status: "client",
    logoUrl: "https://i.pravatar.cc/150?u=web"
  },
  {
    id: "4",
    name: "Consultora Tecnológica",
    industry: "Consultoría",
    website: "https://consultoratec.com",
    employees: 80,
    revenue: "€5M - €10M",
    country: "España",
    status: "partner",
    logoUrl: "https://i.pravatar.cc/150?u=consult"
  },
  {
    id: "5",
    name: "Soluciones Digitales",
    industry: "Marketing Digital",
    website: "https://solucionesdigitales.es",
    employees: 25,
    revenue: "<€1M",
    country: "España",
    status: "inactive",
    logoUrl: "https://i.pravatar.cc/150?u=soluciones"
  }
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "Llamar a Carlos para seguimiento",
    description: "Discutir propuesta de marketing digital",
    dueDate: "2025-04-25",
    assignedTo: "Usuario Actual",
    relatedTo: {
      type: "contact",
      id: "1",
      name: "Carlos Rodríguez"
    },
    priority: "high",
    status: "pending",
    createdAt: "2025-04-15"
  },
  {
    id: "2",
    title: "Enviar propuesta a Innovaciones SL",
    description: "Propuesta para servicios de consultoría",
    dueDate: "2025-04-23",
    assignedTo: "Usuario Actual",
    relatedTo: {
      type: "company",
      id: "2",
      name: "Innovaciones SL"
    },
    priority: "medium",
    status: "in-progress",
    createdAt: "2025-04-14"
  },
  {
    id: "3",
    title: "Reunión con Luis García",
    description: "Presentación de nuevos servicios",
    dueDate: "2025-04-28",
    assignedTo: "Usuario Actual",
    relatedTo: {
      type: "contact",
      id: "3",
      name: "Luis García"
    },
    priority: "medium",
    status: "pending",
    createdAt: "2025-04-16"
  },
  {
    id: "4",
    title: "Seguimiento de oportunidad con Tecnología SA",
    description: "Verificar estado de la propuesta",
    dueDate: "2025-04-22",
    assignedTo: "Usuario Actual",
    relatedTo: {
      type: "opportunity",
      id: "1",
      name: "Implementación sistema CRM"
    },
    priority: "high",
    status: "pending",
    createdAt: "2025-04-15"
  },
  {
    id: "5",
    title: "Actualizar información de Soluciones Digitales",
    description: "Verificar si hay cambios en la estructura organizativa",
    dueDate: "2025-04-30",
    assignedTo: "Usuario Actual",
    relatedTo: {
      type: "company",
      id: "5",
      name: "Soluciones Digitales"
    },
    priority: "low",
    status: "completed",
    createdAt: "2025-04-10"
  }
];

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
    lastUpdated: "2025-04-15"
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
    lastUpdated: "2025-04-18"
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
    lastUpdated: "2025-04-10"
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

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: "Contactos activos",
    value: contacts.filter(c => c.status !== "inactive").length,
    change: 12.5,
    period: "desde el último mes"
  },
  {
    title: "Empresas",
    value: companies.length,
    change: 25,
    period: "desde el último mes"
  },
  {
    title: "Tareas pendientes",
    value: tasks.filter(t => t.status === "pending" || t.status === "in-progress").length,
    change: -5,
    period: "desde la semana pasada"
  },
  {
    title: "Oportunidades abiertas",
    value: `€${opportunities
      .filter(o => !["closed_won", "closed_lost"].includes(o.stage))
      .reduce((sum, opp) => sum + opp.amount, 0).toLocaleString('es-ES')}`,
    change: 15.8,
    period: "desde el último mes"
  }
];
