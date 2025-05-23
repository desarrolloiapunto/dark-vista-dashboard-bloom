
import { useTranslation } from "react-i18next";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell, MessageSquare } from "lucide-react";
import { NotificationsFormValues } from "./NotificationSettingsTypes";
import { UseFormReturn } from "react-hook-form";

interface NotificationChannelsProps {
  form: UseFormReturn<NotificationsFormValues>;
}

export const NotificationChannels = ({ form }: NotificationChannelsProps) => {
  const { t } = useTranslation();
  
  return (
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
  );
};
