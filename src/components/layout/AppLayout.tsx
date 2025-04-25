
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "./Header";
import { Breadcrumb } from "./Breadcrumb";
import { PrimarySidebar } from "./PrimarySidebar";
import { SecondarySidebar } from "./SecondarySidebar";
import MobileBottomBar from "./MobileBottomBar";

// Main pages
import Index from "@/pages/Index";
import Analytics from "@/pages/Analytics";
import ConversationsPage from "@/pages/conversations/ConversationsPage";
import WorkflowsPage from "@/pages/conversations/WorkflowsPage";
import DashboardPage from "@/pages/conversations/DashboardPage";
import EmailsPage from "@/pages/emails/EmailsPage";
import CrmIndex from "@/pages/crm";
import ContactsPage from "@/pages/crm/ContactsPage";
import CompaniesPage from "@/pages/crm/CompaniesPage";
import TasksPage from "@/pages/crm/TasksPage";
import OpportunitiesPage from "@/pages/crm/OpportunitiesPage";
import LeadsInboxPage from "@/pages/crm/leads/LeadsInboxPage";
import LeadsSourcesPage from "@/pages/crm/leads/LeadsSourcesPage";
import LeadsTrackingPage from "@/pages/crm/leads/LeadsTrackingPage";
import LeadsAutomationPage from "@/pages/crm/leads/LeadsAutomationPage";
import NewLeadPage from "@/pages/crm/leads/NewLeadPage";
import UnassignedLeadsPage from "@/pages/crm/leads/UnassignedLeadsPage";
import ReportsPage from "@/pages/crm/ReportsPage";
import ContentManagement from "@/pages/content/ContentManagement";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Placeholder from "@/pages/Placeholder";
import QuotesPage from "@/pages/crm/QuotesPage";
import ProductsPage from "@/pages/crm/ProductsPage";

export const AppLayout = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Header />
      <PrimarySidebar />
      <SecondarySidebar />
      <div className="pl-72 pt-14 pb-14 md:pb-0">
        <Breadcrumb />
        <main className="p-4">
          <Routes>
            <Route index element={<Index />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="conversations/workflows" element={<WorkflowsPage />} />
            <Route path="conversations/:conversationId" element={<ConversationsPage />} />
            <Route path="conversations/dashboard" element={<DashboardPage />} />
            <Route path="emails/*" element={<EmailsPage />} />
            <Route path="crm" element={<CrmIndex />} />
            <Route path="crm/contacts" element={<ContactsPage />} />
            <Route path="crm/contacts/companies" element={<Placeholder title="Contactos de Empresas" />} />
            <Route path="crm/companies" element={<CompaniesPage />} />
            <Route path="crm/tasks" element={<TasksPage />} />
            
            {/* Leads routes */}
            <Route path="crm/leads" element={<LeadsInboxPage />} />
            <Route path="crm/leads/new" element={<NewLeadPage />} />
            <Route path="crm/leads/unassigned" element={<UnassignedLeadsPage />} />
            <Route path="crm/leads/my-leads" element={<Placeholder title="Mis Leads Asignados" />} />
            <Route path="crm/leads/qualified" element={<Placeholder title="Leads Calificados" />} />
            <Route path="crm/leads/unqualified" element={<Placeholder title="Leads No Calificados" />} />
            <Route path="crm/leads/sources" element={<LeadsSourcesPage />} />
            <Route path="crm/leads/tracking" element={<LeadsTrackingPage />} />
            <Route path="crm/leads/automation" element={<LeadsAutomationPage />} />
            
            {/* Opportunities routes */}
            <Route path="crm/opportunities" element={<OpportunitiesPage />} />
            <Route path="crm/opportunities/new" element={<Placeholder title="Nuevas Oportunidades" />} />
            <Route path="crm/opportunities/stages" element={<Placeholder title="Oportunidades por Etapa" />} />
            <Route path="crm/opportunities/won" element={<Placeholder title="Oportunidades Ganadas" />} />
            <Route path="crm/opportunities/lost" element={<Placeholder title="Oportunidades Perdidas" />} />
            
            {/* Settings routes */}
            <Route path="crm/settings/qualification-stages" element={<Placeholder title="Etapas de Calificación" />} />
            <Route path="crm/settings/opportunity-stages" element={<Placeholder title="Etapas de Oportunidad" />} />
            <Route path="crm/settings/users" element={<Placeholder title="Usuarios y Roles" />} />
            
            <Route path="crm/quotes" element={<QuotesPage />} />
            <Route path="crm/products" element={<ProductsPage />} />
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
          </Routes>
        </main>
      </div>
      <MobileBottomBar />
    </>
  );
};
