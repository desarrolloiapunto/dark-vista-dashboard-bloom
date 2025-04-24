
import { Contact, Company, Task, Opportunity, StageColumn, DashboardMetric, Product, Quote } from "@/types/crm";

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

// Nuevos datos para productos
export const products: Product[] = [
  {
    id: "1",
    type: "product",
    name: "Licencia CRM Básico",
    description: "Licencia básica para 10 usuarios",
    sku: "CRM-BASIC-10",
    price: 2500,
    cost: 500,
    taxRate: 21,
    category: "Software",
    hasVariants: false,
    active: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15"
  },
  {
    id: "2",
    type: "product",
    name: "Licencia CRM Premium",
    description: "Licencia premium con todas las funcionalidades para 25 usuarios",
    sku: "CRM-PREM-25",
    price: 6000,
    cost: 1200,
    taxRate: 21,
    category: "Software",
    hasVariants: true,
    variants: [
      {
        id: "2-1",
        name: "10 usuarios",
        sku: "CRM-PREM-10",
        attributes: { "usuarios": "10" },
        price: 3000,
        cost: 600,
        active: true
      },
      {
        id: "2-2",
        name: "25 usuarios",
        sku: "CRM-PREM-25",
        attributes: { "usuarios": "25" },
        price: 6000,
        cost: 1200,
        active: true
      },
      {
        id: "2-3",
        name: "50 usuarios",
        sku: "CRM-PREM-50",
        attributes: { "usuarios": "50" },
        price: 10000,
        cost: 2000,
        active: true
      }
    ],
    active: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-03-20"
  },
  {
    id: "3",
    type: "service",
    name: "Implementación CRM",
    description: "Servicio de implementación y configuración del CRM",
    price: 5000,
    cost: 3000,
    taxRate: 21,
    category: "Servicios",
    hasVariants: false,
    active: true,
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20"
  },
  {
    id: "4",
    type: "service",
    name: "Formación CRM",
    description: "Formación para usuarios del CRM (8 horas)",
    price: 1200,
    cost: 800,
    taxRate: 21,
    category: "Formación",
    hasVariants: false,
    active: true,
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20"
  },
  {
    id: "5",
    type: "package",
    name: "Paquete CRM Completo",
    description: "Licencia CRM Premium + Implementación + Formación",
    sku: "CRM-PACK-COMP",
    price: 10000,
    cost: 5000,
    taxRate: 21,
    category: "Paquetes",
    hasVariants: false,
    packageItems: [
      {
        productId: "2",
        productName: "Licencia CRM Premium (25 usuarios)",
        quantity: 1
      },
      {
        productId: "3",
        productName: "Implementación CRM",
        quantity: 1
      },
      {
        productId: "4",
        productName: "Formación CRM",
        quantity: 1
      }
    ],
    active: true,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01"
  }
];

// Nuevos datos para cotizaciones
export const quotes: Quote[] = [
  {
    id: "1",
    name: "Propuesta CRM para Tecnología SA",
    opportunityId: "1",
    clientId: "1",
    clientName: "Tecnología SA",
    status: "sent",
    amount: 13000,
    discount: 2000,
    tax: 21,
    totalAmount: 15730,
    validUntil: "2025-06-15",
    items: [
      {
        id: "11",
        productId: "2",
        productName: "Licencia CRM Premium (25 usuarios)",
        quantity: 1,
        unitPrice: 6000,
        discount: 1000,
        tax: 21,
        totalPrice: 5000
      },
      {
        id: "12",
        productId: "3",
        productName: "Implementación CRM",
        quantity: 1,
        unitPrice: 5000,
        discount: 500,
        tax: 21,
        totalPrice: 4500
      },
      {
        id: "13",
        productId: "4",
        productName: "Formación CRM",
        quantity: 1,
        unitPrice: 1200,
        discount: 500,
        tax: 21,
        totalPrice: 700
      }
    ],
    notes: "Incluye soporte durante 3 meses",
    createdAt: "2025-04-10",
    lastUpdated: "2025-04-15"
  },
  {
    id: "2",
    name: "Propuesta de Desarrollo Web",
    opportunityId: "3",
    clientId: "3",
    clientName: "Desarrollos Web",
    status: "draft",
    amount: 22000,
    discount: 0,
    tax: 21,
    totalAmount: 26620,
    validUntil: "2025-06-01",
    items: [
      {
        id: "21",
        productId: "custom",
        productName: "Desarrollo de aplicación web empresarial",
        quantity: 1,
        unitPrice: 18000,
        discount: 0,
        tax: 21,
        totalPrice: 18000
      },
      {
        id: "22",
        productId: "custom",
        productName: "Diseño UX/UI personalizado",
        quantity: 1,
        unitPrice: 4000,
        discount: 0,
        tax: 21,
        totalPrice: 4000
      }
    ],
    notes: "Incluye 2 revisiones de diseño y mantenimiento por 1 año",
    createdAt: "2025-04-12",
    lastUpdated: "2025-04-12"
  },
  {
    id: "3",
    name: "Solución BI Corporativa",
    opportunityId: "4",
    clientId: "4",
    clientName: "Consultora Tecnológica",
    status: "accepted",
    amount: 18000,
    discount: 0,
    tax: 21,
    totalAmount: 21780,
    validUntil: "2025-03-30",
    items: [
      {
        id: "31",
        productId: "custom",
        productName: "Software BI Corporativo",
        quantity: 1,
        unitPrice: 12000,
        discount: 0,
        tax: 21,
        totalPrice: 12000
      },
      {
        id: "32",
        productId: "custom",
        productName: "Configuración y personalización",
        quantity: 1,
        unitPrice: 4000,
        discount: 0,
        tax: 21,
        totalPrice: 4000
      },
      {
        id: "33",
        productId: "custom",
        productName: "Formación para analistas de datos",
        quantity: 1,
        unitPrice: 2000,
        discount: 0,
        tax: 21,
        totalPrice: 2000
      }
    ],
    notes: "Implementación en 30 días laborables",
    createdAt: "2025-03-01",
    lastUpdated: "2025-03-15"
  }
];
