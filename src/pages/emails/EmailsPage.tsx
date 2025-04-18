
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailList } from "@/components/email/EmailList";
import { MarketingDashboard } from "@/components/email/MarketingDashboard";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { EmailView } from "@/types/email";

export default function EmailsPage() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() as EmailView || "inbox";
  const [currentView, setCurrentView] = useState<EmailView>(currentPath);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Card className="p-4">
        <Tabs defaultValue="emails" className="h-full">
          <TabsList>
            <TabsTrigger value="emails">Correos</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <TabsContent value="emails" className="h-[calc(100%-3rem)]">
            <EmailList view={currentView} />
          </TabsContent>
          <TabsContent value="marketing">
            <MarketingDashboard />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

