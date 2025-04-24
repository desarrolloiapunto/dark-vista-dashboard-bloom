
import { Task } from "@/types/crm";

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
