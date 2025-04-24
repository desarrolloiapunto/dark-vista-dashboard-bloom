
import { useState } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailInbox } from "./EmailInbox";
import { EmailDetail } from "./EmailDetail";
import { ComposeEmail } from "./ComposeEmail";
import { MarketingDashboard } from "@/components/email/MarketingDashboard";
import type { EmailView } from "@/types/email";
import { useTranslation } from "react-i18next";

export default function EmailsPage() {
  const location = useLocation();
  const { t } = useTranslation();

  // If path is just /emails/, we'll default to inbox
  const currentPath = location.pathname.split("/").pop() as EmailView || "inbox";
  const [activeTab, setActiveTab] = useState<"emails" | "marketing">("emails");

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Card className="p-4 h-full">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "emails" | "marketing")} className="h-full">
          <TabsList>
            <TabsTrigger value="emails">{t('navigation.emails')}</TabsTrigger>
            <TabsTrigger value="marketing">{t('navigation.marketing')}</TabsTrigger>
          </TabsList>
          <TabsContent value="emails" className="h-[calc(100%-3rem)] overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/emails/inbox" replace />} />
              <Route path="/inbox" element={<EmailInbox view="inbox" />} />
              <Route path="/sent" element={<EmailInbox view="sent" />} />
              <Route path="/drafts" element={<EmailInbox view="drafts" />} />
              <Route path="/spam" element={<EmailInbox view="spam" />} />
              <Route path="/trash" element={<EmailInbox view="trash" />} />
              <Route path="/starred" element={<EmailInbox view="starred" />} />
              <Route path="/labels" element={<EmailInbox view="labels" />} />
              <Route path="/view/:emailId" element={<EmailDetail />} />
              <Route path="/compose" element={<ComposeEmail />} />
              <Route path="/reply/:emailId" element={<ComposeEmail isReply />} />
              <Route path="/forward/:emailId" element={<ComposeEmail isForward />} />
            </Routes>
          </TabsContent>
          <TabsContent value="marketing">
            <MarketingDashboard />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
