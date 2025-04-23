
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/hooks/useSettings";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const metaSettingsSchema = z.object({
  isActive: z.boolean().default(false),
  appId: z.string().min(1, "App ID is required"),
  appSecret: z.string().min(1, "App Secret is required"),
  pageId: z.string().min(1, "Page ID is required"),
  pageToken: z.string().min(1, "Page Token is required"),
  instagramAccountId: z.string().min(1, "Instagram Account ID is required")
});

type MetaSettingsFormValues = z.infer<typeof metaSettingsSchema>;

export const MetaSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading } = useSettings('meta');
  const { toast } = useToast();

  const form = useForm<MetaSettingsFormValues>({
    resolver: zodResolver(metaSettingsSchema),
    defaultValues: {
      isActive: false,
      appId: '',
      appSecret: '',
      pageId: '',
      pageToken: '',
      instagramAccountId: ''
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        isActive: settings.isActive || false,
        appId: settings.appId || '',
        appSecret: settings.appSecret || '',
        pageId: settings.pageId || '',
        pageToken: settings.pageToken || '',
        instagramAccountId: settings.instagramAccountId || ''
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: MetaSettingsFormValues) => {
    await saveSettings(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta Business Platform</CardTitle>
        <CardDescription>
          Configure your Meta Business Platform integration for Facebook Messenger and Instagram Direct Messages
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="appId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.appID')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456789012345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="appSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.appSecret')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.pageID')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456789012345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pageToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.pageToken')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagramAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.instagramAccountID')}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456789012345" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
