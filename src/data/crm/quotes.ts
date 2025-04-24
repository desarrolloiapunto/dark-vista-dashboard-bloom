import { Quote } from "@/types/crm";

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
