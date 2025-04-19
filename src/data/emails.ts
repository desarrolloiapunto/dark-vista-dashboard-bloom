
import type { Email, EmailLabel } from "@/types/email";

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
  },
  {
    id: "4",
    from: "Sistema",
    to: "usuario@empresa.com",
    subject: "Spam detectado",
    preview: "Se han detectado y bloqueado correos spam...",
    body: "El sistema ha detectado y bloqueado 5 correos spam en las últimas 24 horas.",
    date: "2024-04-15T14:20:00",
    isRead: false,
    isStarred: false,
    labels: ["sistema"]
  },
  {
    id: "5",
    from: "Laura Rodríguez",
    to: "usuario@empresa.com",
    subject: "Borrador: Presentación cliente",
    preview: "He guardado el borrador de la presentación...",
    body: "He guardado el borrador de la presentación para el cliente. Por favor revísalo cuando puedas.",
    date: "2024-04-14T11:15:00",
    isRead: true,
    isStarred: true,
    labels: ["trabajo", "borradores"],
    attachments: [
      { name: "presentacion_draft.pptx", size: "5.8 MB" }
    ]
  }
];

export const mockLabels: EmailLabel[] = [
  { id: "trabajo", name: "Trabajo", color: "blue" },
  { id: "importante", name: "Importante", color: "red" },
  { id: "personal", name: "Personal", color: "green" },
  { id: "reuniones", name: "Reuniones", color: "purple" },
  { id: "promociones", name: "Promociones", color: "yellow" },
  { id: "sistema", name: "Sistema", color: "gray" },
  { id: "borradores", name: "Borradores", color: "orange" }
];
