
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

const telegramSettingsSchema = z.object({
  isActive: z.boolean(),
  botToken: z.string().min(1, "Bot Token is required"),
  botUsername: z.string().min(1, "Bot Username is required"),
  webhookUrl: z.string().optional()
});

type TelegramSettingsFormValues = z.infer<typeof telegramSettingsSchema>;

export const TelegramSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings, loading } = useSettings('telegram');
  const { toast } = useToast();

  const form = useForm<TelegramSettingsFormValues>({
    resolver: zodResolver(telegramSettingsSchema),
    defaultValues: {
      isActive: settings?.isActive || false,
      botToken: settings?.botToken || '',
      botUsername: settings?.botUsername || '',
      webhookUrl: 'https://app.example.com/api/webhook/telegram'
    }
  });

  const onSubmit = async (data: TelegramSettingsFormValues) => {
    await saveSettings(data);
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://app.example.com/api/webhook/telegram");
    toast({
      title: t('settings.copied'),
      description: t('settings.webhookCopied'),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.telegramBot')}</CardTitle>
        <CardDescription>
          {t('settings.configureTelegram')}
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="botToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('settings.botToken')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                    </FormControl>
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
                      <Input {...field} placeholder="@yourbotname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.webhookURL')}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <Button variant="outline" type="button" onClick={copyWebhookUrl}>
                      {t('settings.copy')}
                    </Button>
                  </div>
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
