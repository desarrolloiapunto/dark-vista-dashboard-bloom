
import { DashboardMetric } from "@/types/crm";
import { contacts } from "./contacts";
import { companies } from "./companies";
import { tasks } from "./tasks";
import { opportunities } from "./opportunities";

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
