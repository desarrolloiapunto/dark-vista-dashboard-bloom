
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Header } from "./components/layout/Header";
import { Breadcrumb } from "./components/layout/Breadcrumb";
import { PrimarySidebar } from "./components/layout/PrimarySidebar";
import { SecondarySidebar } from "./components/layout/SecondarySidebar";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// Import conversations pages
import ConversationsPage from "./pages/conversations/ConversationsPage";
import WorkflowsPage from "./pages/conversations/WorkflowsPage";

// Import placeholder for other modules
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Existing routes */}
                <Route index element={<Index />} />
                <Route path="analytics" element={<Analytics />} />

                {/* Conversations routes - simplified */}
                <Route path="conversations" element={<ConversationsPage />} />
                <Route path="conversations/:conversationId" element={<ConversationsPage />} />
                <Route path="conversations/dashboard" element={<ConversationsPage />} />
                <Route path="conversations/workflows" element={<WorkflowsPage />} />
                <Route path="conversations/settings" element={<Placeholder title="Configuración de Conversaciones" />} />

                {/* Email routes */}
                <Route path="emails/inbox" element={<Placeholder title="Bandeja de Entrada de Correos" />} />
                <Route path="emails/trash" element={<Placeholder title="Papelera de Correos" />} />
                <Route path="emails/templates" element={<Placeholder title="Plantillas de Correo" />} />
                <Route path="emails/campaigns" element={<Placeholder title="Campañas de Mail Marketing" />} />
                <Route path="emails" element={<Navigate to="/emails/inbox" replace />} />

                {/* CRM routes */}
                <Route path="crm/contacts" element={<Placeholder title="Contactos" />} />
                <Route path="crm/companies" element={<Placeholder title="Empresas" />} />
                <Route path="crm/tasks" element={<Placeholder title="Tareas" />} />
                <Route path="crm/opportunities" element={<Placeholder title="Oportunidades" />} />
                <Route path="crm/reports" element={<Placeholder title="Reportes CRM" />} />
                <Route path="crm" element={<Navigate to="/crm/contacts" replace />} />

                {/* Marketing routes */}
                <Route path="marketing/campaigns" element={<Placeholder title="Campañas Publicitarias" />} />
                <Route path="marketing/automation" element={<Placeholder title="Automatización de Marketing" />} />
                <Route path="marketing/ads" element={<Placeholder title="Anuncios de Marketing" />} />
                <Route path="marketing/reports" element={<Placeholder title="Reportes de Marketing" />} />
                <Route path="marketing" element={<Navigate to="/marketing/campaigns" replace />} />

                {/* Ads routes */}
                <Route path="ads/campaigns" element={<Placeholder title="Campañas de Anuncios" />} />
                <Route path="ads/publish" element={<Placeholder title="Publicación Unificada de Anuncios" />} />
                <Route path="ads/optimization" element={<Placeholder title="Optimización de Campañas" />} />
                <Route path="ads/reports" element={<Placeholder title="Reportes y Métricas de Anuncios" />} />
                <Route path="ads" element={<Navigate to="/ads/campaigns" replace />} />

                {/* Content management routes */}
                <Route path="content/calendar" element={<Placeholder title="Calendario de Publicaciones" />} />
                <Route path="content/publish" element={<Placeholder title="Publicación Unificada" />} />
                <Route path="content/customize" element={<Placeholder title="Personalización por Red Social" />} />
                <Route path="content/library" element={<Placeholder title="Biblioteca de Contenido" />} />
                <Route path="content/reports" element={<Placeholder title="Reportes de Engagement" />} />
                <Route path="content" element={<Navigate to="/content/calendar" replace />} />

                {/* Leads routes */}
                <Route path="leads/management" element={<Placeholder title="Gestión de Leads" />} />
                <Route path="leads/sources" element={<Placeholder title="Origen de Leads" />} />
                <Route path="leads/assignment" element={<Placeholder title="Asignación de Leads" />} />
                <Route path="leads/tracking" element={<Placeholder title="Seguimiento de Leads" />} />
                <Route path="leads/automation" element={<Placeholder title="Automatización de Leads" />} />
                <Route path="leads/reports" element={<Placeholder title="Reportes de Leads" />} />
                <Route path="leads" element={<Navigate to="/leads/management" replace />} />

                {/* Profile */}
                <Route path="profile" element={<Profile />} />

                {/* Not found */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// App Layout component to avoid repetition
const AppLayout = () => (
  <>
    <Header />
    <PrimarySidebar />
    <SecondarySidebar />
    <div className="pl-72 pt-14">
      <Breadcrumb />
      <main className="p-4">
        <Routes>
          <Route index element={<Index />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="conversations/*" element={<ConversationsPage />} />
          <Route path="conversations/workflows" element={<WorkflowsPage />} />
          <Route path="emails/*" element={<Placeholder />} />
          <Route path="crm/*" element={<Placeholder />} />
          <Route path="marketing/*" element={<Placeholder />} />
          <Route path="ads/*" element={<Placeholder />} />
          <Route path="content/*" element={<Placeholder />} />
          <Route path="leads/*" element={<Placeholder />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  </>
);

export default App;
