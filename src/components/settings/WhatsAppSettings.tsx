
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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const whatsAppSettingsSchema = z.object({
  isActive: z.boolean().default(false),
  accessToken: z.string().min(10, "Access Token must be at least 10 characters"),
  phoneNumberId: z.string().min(1, "Phone Number ID is required")
});

type WhatsAppSettingsFormValues = z.infer<typeof whatsAppSettingsSchema>;

export const WhatsAppSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading } = useSettings('whatsapp');
  const { toast } = useToast();

  const form = useForm<WhatsAppSettingsFormValues>({
    resolver: zodResolver(whatsAppSettingsSchema),
    defaultValues: {
      isActive: false,
      accessToken: '',
      phoneNumberId: ''
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        isActive: settings.isActive || false,
        accessToken: settings.accessToken || '',
        phoneNumberId: settings.phoneNumberId || ''
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: WhatsAppSettingsFormValues) => {
    await saveSettings(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.whatsappBusinessAPI')}</CardTitle>
        <CardDescription>
          {t('settings.configureWhatsApp')}
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="accessToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.accessToken')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="password" 
                      placeholder="••••••••••••••••••••••" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.phoneNumberID')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="1234567890" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>{t('settings.active')}</FormLabel>
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
