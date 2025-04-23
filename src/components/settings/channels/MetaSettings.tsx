import React, { useState, useEffect } from "react";
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

const metaSettingsSchema = z.object({
  isActive: z.boolean().default(false),
  accessToken: z.string().optional(),
  pageId: z.string().optional(),
});

type MetaSettingsFormValues = z.infer<typeof metaSettingsSchema>;

export const MetaSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading, error } = useSettings('meta');
  const { toast } = useToast();

  const form = useForm<MetaSettingsFormValues>({
    resolver: zodResolver(metaSettingsSchema),
    defaultValues: {
      isActive: false,
      accessToken: '',
      pageId: '',
    }
  });

  // Update form when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset({
        isActive: settings.isActive || false,
        accessToken: settings.accessToken || '',
        pageId: settings.pageId || '',
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: MetaSettingsFormValues) => {
    const success = await saveSettings(data);
    if (success) {
      toast({
        title: t('common.success'),
        description: t('settings.metaSettingsSaved'),
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.metaConfiguration')}</CardTitle>
        <CardDescription>{t('settings.configureMetaIntegration')}</CardDescription>
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
                    <FormLabel>{t('settings.enableMetaIntegration')}</FormLabel>
                    <FormDescription>
                      {t('settings.enableMetaDescription')}
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
                      type="text"
                      placeholder={t('settings.accessTokenPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('settings.accessTokenDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.pageId')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder={t('settings.pageIdPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('settings.pageIdDescription')}
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
