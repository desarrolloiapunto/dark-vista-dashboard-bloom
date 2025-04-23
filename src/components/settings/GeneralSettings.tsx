
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/hooks/useSettings";
import { FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

const generalSettingsSchema = z.object({
  notifications: z.boolean(),
  autoReplies: z.boolean(),
  chatbot: z.boolean(),
});

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings } = useSettings('general');
  const { toast } = useToast();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      notifications: settings.notifications || false,
      autoReplies: settings.autoReplies || false,
      chatbot: settings.chatbot || false,
    }
  });

  const onSubmit = async (data) => {
    await saveSettings(data);
    toast({
      title: t('settings.saved'),
      description: t('settings.generalSettingsSaved'),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.generalSettings')}</CardTitle>
        <CardDescription>{t('settings.generalConfigDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">{t('settings.enableNotifications')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.notificationsDescription')}</p>
            </div>
            <Controller
              name="notifications"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="notifications" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-reply">{t('settings.enableAutoReplies')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.autoRepliesDescription')}</p>
            </div>
            <Controller
              name="autoReplies"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="auto-reply" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="chatbot">{t('settings.enableChatbot')}</Label>
              <p className="text-sm text-muted-foreground">{t('settings.chatbotDescription')}</p>
            </div>
            <Controller
              name="chatbot"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="chatbot" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t('settings.saveSettings')}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
