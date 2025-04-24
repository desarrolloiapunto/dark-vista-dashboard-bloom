import { Product } from "@/types/crm";

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
