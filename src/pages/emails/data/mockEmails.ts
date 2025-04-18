
export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  attachments?: { name: string; size: string }[];
}

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "Juan Pérez",
    to: "usuario@empresa.com",
    subject: "Propuesta de proyecto web",
    preview: "Te envío la propuesta actualizada del proyecto...",
    body: "Te envío la propuesta actualizada del proyecto con los cambios que discutimos en la última reunión. Por favor, revísala y me comentas si necesitas algún ajuste.",
    date: "2024-04-18T10:30:00",
    isRead: false,
    isStarred: true,
    labels: ["trabajo", "importante"],
    attachments: [
      { name: "propuesta_v2.pdf", size: "2.4 MB" },
      { name: "presupuesto.xlsx", size: "1.1 MB" }
    ]
  },
  {
    id: "2",
    from: "María García",
    to: "usuario@empresa.com",
    subject: "Recordatorio: Reunión de equipo mañana",
    preview: "No olvides que mañana tenemos la reunión mensual...",
    body: "No olvides que mañana tenemos la reunión mensual de equipo a las 9:00 AM. Por favor, prepara tu reporte de avances.",
    date: "2024-04-17T15:45:00",
    isRead: true,
    isStarred: false,
    labels: ["trabajo", "reuniones"]
  },
  {
    id: "3",
    from: "Servicio al Cliente",
    to: "usuario@empresa.com",
    subject: "¡Oferta especial solo por hoy!",
    preview: "Aprovecha nuestros descuentos exclusivos...",
    body: "¡Grandes descuentos en todos nuestros productos! Solo por hoy, aprovecha hasta 50% de descuento en productos seleccionados.",
    date: "2024-04-16T09:20:00",
    isRead: true,
    isStarred: false,
    labels: ["promociones"]
  }
];

export const mockLabels = [
  { id: "trabajo", name: "Trabajo", color: "blue" },
  { id: "importante", name: "Importante", color: "red" },
  { id: "personal", name: "Personal", color: "green" },
  { id: "reuniones", name: "Reuniones", color: "purple" },
  { id: "promociones", name: "Promociones", color: "yellow" }
];

