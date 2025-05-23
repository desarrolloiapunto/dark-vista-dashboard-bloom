
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AppearanceSettings } from "./AppearanceSettings";
import { LocalizationSettings } from "./LocalizationSettings";
import { displayFormSchema, DisplayFormValues } from "./DisplaySettingsTypes";

export const DisplaySettingsForm = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Load display settings from localStorage
  const storedSettings = localStorage.getItem("display_settings");
  const defaultValues: DisplayFormValues = storedSettings 
    ? JSON.parse(storedSettings)
    : {
        theme: "system",
        language: i18n.language as "en" | "es",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        compactMode: false,
        highContrast: false,
        animationsEnabled: true,
      };

  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: DisplayFormValues) => {
    setIsLoading(true);
    try {
      // In a real application, this would be saved to a database via API
      localStorage.setItem("display_settings", JSON.stringify(data));
      
      // Change language if it's different
      if (data.language !== i18n.language) {
        await i18n.changeLanguage(data.language);
        localStorage.setItem("language", data.language);
      }
      
      toast({
        title: t('settings.saved'),
        description: t('settings.displaySettingsSaved'),
      });
    } catch (error) {
      console.error("Error saving display settings:", error);
      toast({
        title: t('status.error'),
        description: t('settings.errorSavingSettings'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AppearanceSettings form={form} />
        <LocalizationSettings form={form} />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.saving') : t('common.actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
