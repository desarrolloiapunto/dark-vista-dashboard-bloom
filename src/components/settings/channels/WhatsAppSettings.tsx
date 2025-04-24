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

const whatsAppSettingsSchema = z.object({
  isActive: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  accessToken: z.string().optional(),
});

type WhatsAppSettingsFormValues = z.infer<typeof whatsAppSettingsSchema>;

export const WhatsAppSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading, error } = useSettings('whatsapp');
  const { toast } = useToast();

  const form = useForm<WhatsAppSettingsFormValues>({
    resolver: zodResolver(whatsAppSettingsSchema),
    defaultValues: {
      isActive: false,
      phoneNumber: '',
      accessToken: '',
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        isActive: settings.isActive || false,
        phoneNumber: settings.phoneNumber || '',
        accessToken: settings.accessToken || '',
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: WhatsAppSettingsFormValues) => {
    await saveSettings(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp {t('settings.configuration')}</CardTitle>
        <CardDescription>{t('settings.whatsAppConfigDescription')}</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.enableWhatsApp')}</FormLabel>
                    <FormDescription>
                      {t('settings.enableWhatsAppDescription')}
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.phoneNumber')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('settings.phoneNumberPlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('settings.phoneNumberDescription')}
                  </FormDescription>
                  <FormMessage />
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
                    <Input type="password" placeholder={t('settings.accessTokenPlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('settings.accessTokenDescription')}
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
