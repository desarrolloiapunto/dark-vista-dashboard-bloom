
import type { Email, EmailLabel } from "@/types/email";

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "Juan Pérez",
    to: "usuario@empresa.com",
    subject: "Propuesta de proyecto web",
    preview: "Te envío la propuesta actualizada del proyecto...",
    body: "Te envío la propuesta actualizada del proyecto con los cambios que discutimos en la última reunión.",
    date: "2024-04-18T10:30:00",
    isRead: false,
    isStarred: true,
    labels: ["trabajo", "importante"],
    folder: "inbox",
    attachments: [
      { name: "propuesta_v2.pdf", size: "2.4 MB" }
    ]
  },
  {
    id: "2",
    from: "usuario@empresa.com",
    to: "cliente@externo.com",
    subject: "Re: Cotización servicios",
    preview: "Adjunto encontrarás la cotización solicitada...",
    body: "Adjunto encontrarás la cotización solicitada para los servicios de marketing digital.",
    date: "2024-04-17T15:45:00",
    isRead: true,
    isStarred: false,
    labels: ["trabajo"],
    folder: "sent",
    attachments: [
      { name: "cotizacion.pdf", size: "1.8 MB" }
    ]
  },
  {
    id: "3",
    from: "spam@suspicious.com",
    to: "usuario@empresa.com",
    subject: "¡¡¡GANASTE UN PREMIO!!!",
    preview: "Felicitaciones! Has sido seleccionado...",
    body: "Felicitaciones! Has sido seleccionado como ganador de un premio especial...",
    date: "2024-04-16T09:20:00",
    isRead: false,
    isStarred: false,
    labels: [],
    folder: "spam"
  },
  {
    id: "4",
    from: "marketing@empresa.com",
    to: "usuario@empresa.com",
    subject: "Borrador: Campaña Q2",
    preview: "Borrador de la campaña del segundo trimestre...",
    body: "Aquí está el borrador de la campaña para el segundo trimestre...",
    date: "2024-04-15T14:20:00",
    isRead: true,
    isStarred: false,
    labels: ["marketing"],
    folder: "drafts"
  },
  {
    id: "5",
    from: "Laura Rodríguez",
    to: "usuario@empresa.com",
    subject: "Reunión importante",
    preview: "La reunión de mañana se cancela...",
    body: "La reunión de mañana se cancela debido a problemas técnicos.",
    date: "2024-04-14T11:15:00",
    isRead: true,
    isStarred: true,
    labels: ["importante"],
    folder: "trash"
  }
];

export const mockLabels: EmailLabel[] = [
  { id: "trabajo", name: "Trabajo", color: "blue" },
  { id: "importante", name: "Importante", color: "red" },
  { id: "marketing", name: "Marketing", color: "green" },
  { id: "personal", name: "Personal", color: "purple" }
];

