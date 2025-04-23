
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/hooks/useSettings";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

const generalSettingsSchema = z.object({
  notifications: z.boolean().default(false),
  autoReplies: z.boolean().default(false),
  chatbot: z.boolean().default(false),
});

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading } = useSettings('general');
  const { toast } = useToast();

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      notifications: false,
      autoReplies: false,
      chatbot: false,
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        notifications: settings.notifications || false,
        autoReplies: settings.autoReplies || false,
        chatbot: settings.chatbot || false,
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: GeneralSettingsFormValues) => {
    await saveSettings(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.generalSettings')}</CardTitle>
        <CardDescription>{t('settings.generalConfigDescription')}</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.enableNotifications')}</FormLabel>
                    <FormDescription>
                      {t('settings.notificationsDescription')}
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
              name="autoReplies"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.enableAutoReplies')}</FormLabel>
                    <FormDescription>
                      {t('settings.autoRepliesDescription')}
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
              name="chatbot"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.enableChatbot')}</FormLabel>
                    <FormDescription>
                      {t('settings.chatbotDescription')}
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
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? t('common.saving') : t('settings.saveSettings')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
