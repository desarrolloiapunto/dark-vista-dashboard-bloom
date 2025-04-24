
import type { Email, EmailLabel } from "@/types/email";

export const mockEmails: Email[] = [
  {
    id: "1",
    from: "Juan Pérez <juan.perez@empresa.com>",
    to: ["usuario@empresa.com"],
    subject: "Propuesta de proyecto web",
    preview: "Te envío la propuesta actualizada del proyecto...",
    body: "<p>Hola,</p><p>Te envío la propuesta actualizada del proyecto con los cambios que discutimos en la última reunión.</p><p>El presupuesto fue ajustado según lo conversado y los plazos de entrega se mantienen.</p><p>Saludos cordiales,</p><p>Juan Pérez</p>",
    date: "2024-04-18T10:30:00",
    isRead: false,
    isStarred: true,
    labels: ["trabajo", "importante"],
    folder: "inbox",
    attachments: [
      { name: "propuesta_v2.pdf", size: "2.4 MB", type: "application/pdf" }
    ]
  },
  {
    id: "2",
    from: "usuario@empresa.com",
    to: ["cliente@externo.com"],
    cc: ["gerente@empresa.com"],
    subject: "Re: Cotización servicios",
    preview: "Adjunto encontrarás la cotización solicitada...",
    body: "<p>Estimado cliente,</p><p>Adjunto encontrarás la cotización solicitada para los servicios de marketing digital.</p><p>Quedo atento a cualquier consulta.</p><p>Saludos,</p>",
    date: "2024-04-17T15:45:00",
    isRead: true,
    isStarred: false,
    labels: ["trabajo"],
    folder: "sent",
    attachments: [
      { name: "cotizacion.pdf", size: "1.8 MB", type: "application/pdf" }
    ]
  },
  {
    id: "3",
    from: "spam@suspicious.com",
    to: ["usuario@empresa.com"],
    subject: "¡¡¡GANASTE UN PREMIO!!!",
    preview: "Felicitaciones! Has sido seleccionado...",
    body: "<p>Felicitaciones!</p><p>Has sido seleccionado como ganador de un premio especial valorado en $10,000!</p><p>Para reclamarlo solo necesitamos tus datos bancarios.</p>",
    date: "2024-04-16T09:20:00",
    isRead: false,
    isStarred: false,
    labels: [],
    folder: "spam",
    attachments: []
  },
  {
    id: "4",
    from: "marketing@empresa.com",
    to: ["usuario@empresa.com"],
    subject: "Borrador: Campaña Q2",
    preview: "Borrador de la campaña del segundo trimestre...",
    body: "<p>Borrador de la campaña para el segundo trimestre.</p><p>Puntos a considerar:</p><ul><li>Presupuesto asignado</li><li>Canales de distribución</li><li>Métricas de seguimiento</li></ul><p>Pendiente de revisión.</p>",
    date: "2024-04-15T14:20:00",
    isRead: true,
    isStarred: false,
    labels: ["marketing"],
    folder: "drafts",
    attachments: []
  },
  {
    id: "5",
    from: "Laura Rodríguez <laura@empresa.com>",
    to: ["usuario@empresa.com"],
    cc: ["equipo@empresa.com"],
    subject: "Reunión importante - CANCELADA",
    preview: "La reunión de mañana se cancela...",
    body: "<p>Hola a todos,</p><p>La reunión de mañana se cancela debido a problemas técnicos en la sala de conferencias.</p><p>Reprogramaremos para la próxima semana.</p><p>Saludos,</p><p>Laura</p>",
    date: "2024-04-14T11:15:00",
    isRead: true,
    isStarred: true,
    labels: ["importante"],
    folder: "trash",
    attachments: []
  },
  {
    id: "6",
    from: "newsletter@tech.com",
    to: ["usuario@empresa.com"],
    subject: "Novedades tecnológicas - Abril 2024",
    preview: "Descubre las últimas tendencias en IA...",
    body: "<p>Boletín mensual de Tech News</p><p>En esta edición:</p><ul><li>Avances en IA generativa</li><li>Nuevos dispositivos en el mercado</li><li>Tendencias de ciberseguridad</li></ul>",
    date: "2024-04-13T08:30:00",
    isRead: false,
    isStarred: false,
    labels: ["tecnologia"],
    folder: "inbox",
    attachments: []
  },
  {
    id: "7",
    from: "carlos@proveedor.com",
    to: ["usuario@empresa.com"],
    subject: "Actualización de precios",
    preview: "Informamos sobre la actualización de precios...",
    body: "<p>Estimado cliente,</p><p>Le informamos que a partir del próximo mes habrá una actualización en nuestros precios debido al incremento en costos operativos.</p><p>Adjuntamos la nueva lista de precios.</p><p>Atentamente,</p><p>Carlos Díaz<br>Dept. Comercial</p>",
    date: "2024-04-12T16:45:00",
    isRead: true,
    isStarred: true,
    labels: ["proveedores", "importante"],
    folder: "inbox",
    attachments: [
      { name: "lista_precios_2024.xlsx", size: "1.2 MB", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    ]
  },
  {
    id: "8",
    from: "soporte@app.com",
    to: ["usuario@empresa.com"],
    subject: "Su ticket #4589 ha sido resuelto",
    preview: "Hemos resuelto su problema con la aplicación...",
    body: "<p>Estimado usuario,</p><p>Nos complace informarle que hemos resuelto el problema reportado en el ticket #4589.</p><p>Si experimenta algún otro inconveniente, no dude en contactarnos.</p><p>Equipo de Soporte</p>",
    date: "2024-04-11T09:30:00",
    isRead: false,
    isStarred: false,
    labels: ["soporte"],
    folder: "inbox",
    attachments: []
  },
  {
    id: "9",
    from: "usuario@empresa.com",
    to: ["equipo@empresa.com"],
    subject: "Borrador: Plan de trabajo Q3",
    preview: "Ideas iniciales para el plan de trabajo...",
    body: "<p>Equipo,</p><p>Algunas ideas iniciales para nuestro plan de trabajo del tercer trimestre:</p><ul><li>Expansión de mercado</li><li>Mejoras en el producto</li><li>Estrategias de retención</li></ul><p>Seguimos trabajando en esto.</p>",
    date: "2024-04-10T17:20:00",
    isRead: true,
    isStarred: false,
    labels: ["trabajo"],
    folder: "drafts",
    attachments: []
  },
  {
    id: "10",
    from: "phishing@malicious.com",
    to: ["usuario@empresa.com"],
    subject: "Urgente: Verificación de cuenta",
    preview: "Su cuenta será suspendida si no verifica...",
    body: "<p>URGENTE: Su cuenta será suspendida en 24 horas si no verifica su información ahora.</p><p>Haga clic en el enlace a continuación para verificar.</p>",
    date: "2024-04-09T07:15:00",
    isRead: false,
    isStarred: false,
    labels: [],
    folder: "spam",
    attachments: []
  }
];

export const mockLabels: EmailLabel[] = [
  { id: "trabajo", name: "Trabajo", color: "blue" },
  { id: "importante", name: "Importante", color: "red" },
  { id: "marketing", name: "Marketing", color: "green" },
  { id: "personal", name: "Personal", color: "purple" },
  { id: "proveedores", name: "Proveedores", color: "yellow" },
  { id: "clientes", name: "Clientes", color: "orange" },
  { id: "tecnologia", name: "Tecnología", color: "cyan" },
  { id: "soporte", name: "Soporte", color: "pink" }
];
