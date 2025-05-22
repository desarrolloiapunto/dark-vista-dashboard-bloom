
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
import EmailsSettingsPage from "./pages/settings/EmailsPage";
import EmailsModulePage from "./pages/emails/EmailsPage";
import CrmIndex from "./pages/crm";
import ContactsPage from "./pages/crm/ContactsPage";
import CompaniesPage from "./pages/crm/CompaniesPage";
import TasksPage from "./pages/crm/TasksPage";
import OpportunitiesPage from "./pages/crm/OpportunitiesPage";
import LeadsInboxPage from "./pages/crm/leads/LeadsInboxPage";
import LeadsSourcesPage from "./pages/crm/leads/LeadsSourcesPage";
import LeadsTrackingPage from "./pages/crm/leads/LeadsTrackingPage";
import LeadsAutomationPage from "./pages/crm/leads/LeadsAutomationPage";
import NewLeadPage from "./pages/crm/leads/NewLeadPage";
import UnassignedLeadsPage from "./pages/crm/leads/UnassignedLeadsPage";
import ReportsPage from "./pages/crm/ReportsPage";
import QuotesPage from "./pages/crm/QuotesPage";
import ProductsPage from "./pages/crm/ProductsPage";
import ContentManagement from "./pages/content/ContentManagement";
import ContentCalendar from "./pages/content/ContentCalendar";
import ContentLibrary from "./pages/content/ContentLibrary";
import ContentMetrics from "./pages/content/ContentMetrics";
import Profile from "./pages/Profile";
import Placeholder from "./pages/Placeholder";
import MarketingDashboard from "./pages/marketing-ads/MarketingDashboard";
import CampaignsPage from "./pages/marketing-ads/CampaignsPage";

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="kairos-ui-theme">
          <BrowserRouter>
            <AuthProvider>
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
                    <Route path="settings/emails" element={<EmailsSettingsPage />} />
                    
                    {/* Email module routes */}
                    <Route path="emails" element={<EmailsModulePage />}>
                      <Route path="" element={<Navigate to="/emails/inbox" replace />} />
                      <Route path="inbox" element={<></>} />
                      <Route path="sent" element={<></>} />
                      <Route path="drafts" element={<></>} />
                      <Route path="spam" element={<></>} />
                      <Route path="trash" element={<></>} />
                      <Route path="starred" element={<></>} />
                      <Route path="labels" element={<></>} />
                      <Route path="view/:emailId" element={<></>} />
                      <Route path="compose" element={<></>} />
                      <Route path="reply/:emailId" element={<></>} />
                      <Route path="forward/:emailId" element={<></>} />
                    </Route>
                    
                    {/* CRM routes */}
                    <Route path="crm" element={<CrmIndex />} />
                    <Route path="crm/contacts" element={<ContactsPage />} />
                    <Route path="crm/contacts/companies" element={<Placeholder title="Contactos de Empresas" />} />
                    <Route path="crm/companies" element={<CompaniesPage />} />
                    <Route path="crm/tasks" element={<TasksPage />} />
                    
                    {/* Leads section */}
                    <Route path="crm/leads" element={<LeadsInboxPage />} />
                    <Route path="crm/leads/new" element={<NewLeadPage />} />
                    <Route path="crm/leads/unassigned" element={<UnassignedLeadsPage />} />
                    <Route path="crm/leads/my-leads" element={<Placeholder title="Mis Leads Asignados" />} />
                    <Route path="crm/leads/qualified" element={<Placeholder title="Leads Calificados" />} />
                    <Route path="crm/leads/unqualified" element={<Placeholder title="Leads No Calificados" />} />
                    <Route path="crm/leads/sources" element={<LeadsSourcesPage />} />
                    <Route path="crm/leads/tracking" element={<LeadsTrackingPage />} />
                    <Route path="crm/leads/automation" element={<LeadsAutomationPage />} />
                    
                    {/* Opportunities section */}
                    <Route path="crm/opportunities" element={<OpportunitiesPage />} />
                    <Route path="crm/opportunities/new" element={<Placeholder title="Nuevas Oportunidades" />} />
                    <Route path="crm/opportunities/stages" element={<Placeholder title="Oportunidades por Etapa" />} />
                    <Route path="crm/opportunities/won" element={<Placeholder title="Oportunidades Ganadas" />} />
                    <Route path="crm/opportunities/lost" element={<Placeholder title="Oportunidades Perdidas" />} />
                    
                    {/* Settings */}
                    <Route path="crm/settings/qualification-stages" element={<Placeholder title="Etapas de Calificación" />} />
                    <Route path="crm/settings/opportunity-stages" element={<Placeholder title="Etapas de Oportunidad" />} />
                    <Route path="crm/settings/users" element={<Placeholder title="Usuarios y Roles" />} />
                    
                    {/* Other CRM pages */}
                    <Route path="crm/quotes" element={<QuotesPage />} />
                    <Route path="crm/products" element={<ProductsPage />} />
                    <Route path="crm/reports" element={<ReportsPage />} />
                    
                    {/* Marketing Ads unified module */}
                    <Route path="marketing-ads" element={<MarketingDashboard />} />
                    <Route path="marketing-ads/campaigns" element={<CampaignsPage />} />
                    <Route path="marketing-ads/automation" element={<Placeholder title={t('sidebar.marketingAds.automation')} />} />
                    <Route path="marketing-ads/publish" element={<Placeholder title={t('sidebar.marketingAds.publish')} />} />
                    <Route path="marketing-ads/optimization" element={<Placeholder title={t('sidebar.marketingAds.optimization')} />} />
                    <Route path="marketing-ads/reports" element={<Placeholder title={t('sidebar.marketingAds.reports')} />} />
                    
                    {/* Content routes */}
                    <Route path="content/" element={<ContentManagement />} />
                    <Route path="content/calendar" element={<ContentCalendar />} />
                    <Route path="content/library" element={<ContentLibrary />} />
                    <Route path="content/metrics" element={<ContentMetrics />} />
                    <Route path="content/publish" element={<Placeholder title={t('sidebar.content.publish')} />} />
                    <Route path="content/customize" element={<Placeholder title={t('sidebar.content.customize')} />} />
                    <Route path="content/reports" element={<Placeholder title={t('sidebar.content.reports')} />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </div>
              <Toaster />
              <Sonner />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
