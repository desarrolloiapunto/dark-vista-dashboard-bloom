
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare } from "lucide-react";

const notificationsFormSchema = z.object({
  enableEmailNotifications: z.boolean().default(true),
  enablePushNotifications: z.boolean().default(true),
  enableSmsNotifications: z.boolean().default(false),
  notifyNewMessages: z.boolean().default(true),
  notifyTaskAssignments: z.boolean().default(true),
  notifyLeads: z.boolean().default(true),
  notifyMentions: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export const NotificationSettings = () => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('settings.notificationPreferences')}
          </CardTitle>
          <CardDescription>
            {t('settings.notificationPreferencesDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('settings.channels')}</h3>
                
                <FormField
                  control={form.control}
                  name="enableEmailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {t('settings.emailNotifications')}
                          </div>
                        </FormLabel>
                        <FormDescription>
                          {t('settings.emailNotificationsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enablePushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            {t('settings.pushNotifications')}
                          </div>
                        </FormLabel>
                        <FormDescription>
                          {t('settings.pushNotificationsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="enableSmsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            {t('settings.smsNotifications')}
                          </div>
                        </FormLabel>
                        <FormDescription>
                          {t('settings.smsNotificationsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('settings.notificationTypes')}</h3>
                
                <FormField
                  control={form.control}
                  name="notifyNewMessages"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.newMessages')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.newMessagesDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyTaskAssignments"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.taskAssignments')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.taskAssignmentsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyLeads"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.leadNotifications')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.leadNotificationsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notifyMentions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.mentions')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.mentionsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('settings.marketingEmails')}
                        </FormLabel>
                        <FormDescription>
                          {t('settings.marketingEmailsDescription')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('common.saving') : t('common.actions.save')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
