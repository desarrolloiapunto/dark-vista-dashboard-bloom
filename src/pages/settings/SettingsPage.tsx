
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { GeneralSettings } from "@/components/settings/GeneralSettings";

const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.generalSettings')}</h1>
        <p className="text-muted-foreground">{t('settings.generalConfigDescription')}</p>
      </div>

      <GeneralSettings />
    </div>
  );
};

export default SettingsPage;
