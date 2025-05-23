
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotificationChannels } from "./NotificationChannels";
import { NotificationTypes } from "./NotificationTypes";
import { notificationsFormSchema, NotificationsFormValues } from "./NotificationSettingsTypes";

export const NotificationSettingsForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Load notification settings from localStorage
  const storedSettings = localStorage.getItem("notification_settings");
  const defaultValues: NotificationsFormValues = storedSettings 
    ? JSON.parse(storedSettings)
    : {
        enableEmailNotifications: true,
        enablePushNotifications: true,
        enableSmsNotifications: false,
        notifyNewMessages: true,
        notifyTaskAssignments: true,
        notifyLeads: true,
        notifyMentions: true,
        marketingEmails: false,
      };

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: NotificationsFormValues) => {
    setIsLoading(true);
    try {
      // In a real application, this would be saved to a database via API
      localStorage.setItem("notification_settings", JSON.stringify(data));
      
      toast({
        title: t('settings.saved'),
        description: t('settings.notificationSettingsSaved'),
      });
    } catch (error) {
      console.error("Error saving notification settings:", error);
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
        <NotificationChannels form={form} />
        <NotificationTypes form={form} />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.saving') : t('common.actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
