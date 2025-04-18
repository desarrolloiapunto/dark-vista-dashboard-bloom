
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSidebar } from "./components/EmailSidebar";
import { EmailList } from "./components/EmailList";
import { useState } from "react";

export type EmailView = "inbox" | "sent" | "drafts" | "spam" | "trash" | "marketing";

export default function EmailLayout() {
  const [currentView, setCurrentView] = useState<EmailView>("inbox");

  return (
    <div className="grid grid-cols-[280px_1fr] h-[calc(100vh-8rem)] gap-4">
      <EmailSidebar currentView={currentView} onViewChange={setCurrentView} />
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
