
import { useLocation } from "react-router-dom";
import { EmailNavigation } from "@/components/email/EmailNavigation";
import { DashboardNavigation } from "@/components/navigation/DashboardNavigation";
import { ConversationsNavigation } from "@/components/navigation/ConversationsNavigation";
import { CrmNavigation } from "@/components/navigation/CrmNavigation";
import { MarketingNavigation } from "@/components/navigation/MarketingNavigation";
import { AdsNavigation } from "@/components/navigation/AdsNavigation";
import { ContentNavigation } from "@/components/navigation/ContentNavigation";

export function SecondarySidebar() {
  const location = useLocation();

  // Determine which navigation to show and the title
  let NavigationComponent = DashboardNavigation;
  let title = "Dashboard";

  if (location.pathname.startsWith("/conversations")) {
    NavigationComponent = ConversationsNavigation;
    title = "Conversaciones";
  } else if (location.pathname.startsWith("/emails")) {
    return (
      <div className="fixed left-16 top-0 z-30 h-screen w-56 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Correos</h2>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <EmailNavigation />
        </div>
      </div>
    );
  } else if (location.pathname.startsWith("/crm")) {
    NavigationComponent = CrmNavigation;
    title = "CRM";
  } else if (location.pathname.startsWith("/marketing")) {
    NavigationComponent = MarketingNavigation;
    title = "Marketing";
  } else if (location.pathname.startsWith("/ads")) {
    NavigationComponent = AdsNavigation;
    title = "Ads";
  } else if (location.pathname.startsWith("/content")) {
    NavigationComponent = ContentNavigation;
    title = "Manejo de Contenido";
  } else if (location.pathname === "/analytics") {
    NavigationComponent = DashboardNavigation;
    title = "Análisis";
  }

  return (
    <div className="fixed left-16 top-0 z-30 h-screen w-56 border-r border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <NavigationComponent />
      </div>
    </div>
  );
}
