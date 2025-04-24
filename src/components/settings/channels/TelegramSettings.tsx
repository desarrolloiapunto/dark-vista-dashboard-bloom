
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/hooks/useSettings";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

const telegramSettingsSchema = z.object({
  isActive: z.boolean().default(false),
  accessToken: z.string().min(1, { message: "Access token is required." }),
  botUsername: z.string().optional(),
});

type TelegramSettingsFormValues = z.infer<typeof telegramSettingsSchema>;

export const TelegramSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading, error } = useSettings('telegram');
  const { toast } = useToast();

  const form = useForm<TelegramSettingsFormValues>({
    resolver: zodResolver(telegramSettingsSchema),
    defaultValues: {
      isActive: false,
      accessToken: "",
      botUsername: "",
    }
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        isActive: settings.isActive || false,
        accessToken: settings.accessToken || "",
        botUsername: settings.botUsername || "",
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: TelegramSettingsFormValues) => {
    await saveSettings(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.telegramConfiguration')}</CardTitle>
        <CardDescription>{t('settings.configureTelegramIntegration')}</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.enableTelegram')}</FormLabel>
                    <FormDescription>
                      {t('settings.enableTelegramIntegration')}
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
              name="accessToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.accessToken')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('settings.enterAccessToken')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('settings.telegramAccessTokenDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="botUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.botUsername')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('settings.enterBotUsername')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('settings.telegramBotUsernameDescription')}
                  </FormDescription>
                  <FormMessage />
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
