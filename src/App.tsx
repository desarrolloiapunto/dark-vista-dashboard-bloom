import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/theme/ThemeProvider";

// Import i18n configuration
import "./i18n/config";

// Pages
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ConversationsPage from "./pages/conversations/ConversationsPage";
import WorkflowsPage from "./pages/conversations/WorkflowsPage";
import DashboardPage from "./pages/conversations/DashboardPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ChannelsPage from "./pages/settings/ChannelsPage";
import UsersPage from "./pages/settings/UsersPage";
import PermissionsPage from "./pages/settings/PermissionsPage";
import ApiKeysPage from "./pages/settings/ApiKeysPage";
import EmailsPage from "./pages/settings/EmailsPage";
import EmailsModulePage from "./pages/emails/EmailsPage";
import CrmIndex from "./pages/crm";
import ContactsPage from "./pages/crm/ContactsPage";
import CompaniesPage from "./pages/crm/CompaniesPage";
import TasksPage from "./pages/crm/TasksPage";
import OpportunitiesPage from "./pages/crm/OpportunitiesPage";
import LeadsManagementPage from "./pages/crm/leads/LeadsManagementPage";
import LeadsSourcesPage from "./pages/crm/leads/LeadsSourcesPage";
import LeadsTrackingPage from "./pages/crm/leads/LeadsTrackingPage";
import LeadsAutomationPage from "./pages/crm/leads/LeadsAutomationPage";
import ReportsPage from "./pages/crm/ReportsPage";
import ContentManagement from "./pages/content/ContentManagement";
import Profile from "./pages/Profile";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="kairos-ui-theme">
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/conversations" replace />} />
                    <Route path="conversations" element={<ConversationsPage />} />
                    <Route path="conversations/:conversationId" element={<ConversationsPage />} />
                    <Route path="conversations/workflows" element={<WorkflowsPage />} />
                    <Route path="conversations/dashboard" element={<DashboardPage />} />
                    
                    {/* Settings routes */}
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="settings/channels" element={<ChannelsPage />} />
                    <Route path="settings/users" element={<UsersPage />} />
                    <Route path="settings/permissions" element={<PermissionsPage />} />
                    <Route path="settings/api" element={<ApiKeysPage />} />
                    <Route path="settings/emails" element={<EmailsPage />} />
                    
                    <Route path="emails/*" element={<EmailsModulePage />} />
                    <Route path="crm" element={<CrmIndex />} />
                    <Route path="crm/contacts" element={<ContactsPage />} />
                    <Route path="crm/companies" element={<CompaniesPage />} />
                    <Route path="crm/tasks" element={<TasksPage />} />
                    <Route path="crm/opportunities" element={<OpportunitiesPage />} />
                    <Route path="crm/leads" element={<LeadsManagementPage />} />
                    <Route path="crm/leads/sources" element={<LeadsSourcesPage />} />
                    <Route path="crm/leads/tracking" element={<LeadsTrackingPage />} />
                    <Route path="crm/leads/automation" element={<LeadsAutomationPage />} />
                    <Route path="crm/reports" element={<ReportsPage />} />
                    <Route path="marketing/campaigns" element={<Placeholder title={t('sidebar.marketing.campaigns')} />} />
                    <Route path="marketing/automation" element={<Placeholder title={t('sidebar.marketing.automation')} />} />
                    <Route path="marketing/ads" element={<Placeholder title={t('sidebar.marketing.ads')} />} />
                    <Route path="marketing/reports" element={<Placeholder title={t('sidebar.marketing.reports')} />} />
                    <Route path="ads/campaigns" element={<Placeholder title={t('sidebar.marketing.campaigns')} />} />
                    <Route path="ads/publish" element={<Placeholder title="Publicación Unificada de Anuncios" />} />
                    <Route path="ads/optimization" element={<Placeholder title="Optimización de Campañas" />} />
                    <Route path="ads/reports" element={<Placeholder title="Reportes y Métricas de Anuncios" />} />
                    <Route path="content/" element={<ContentManagement />} />
                    <Route path="content/calendar" element={<ContentManagement />} />
                    <Route path="content/publish" element={<Placeholder title={t('sidebar.content.publish')} />} />
                    <Route path="content/customize" element={<Placeholder title={t('sidebar.content.customize')} />} />
                    <Route path="content/library" element={<Placeholder title={t('sidebar.content.library')} />} />
                    <Route path="content/reports" element={<Placeholder title={t('sidebar.content.reports')} />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
