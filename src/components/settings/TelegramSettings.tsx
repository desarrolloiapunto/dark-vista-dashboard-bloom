
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSettings } from "@/hooks/useSettings";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

const telegramSettingsSchema = z.object({
  isActive: z.boolean(),
  botToken: z.string().min(1, "Bot Token is required"),
  botUsername: z.string().min(1, "Bot Username is required"),
  webhookUrl: z.string().optional()
});

export const TelegramSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings } = useSettings('telegram');
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(telegramSettingsSchema),
    defaultValues: {
      isActive: settings.isActive || false,
      botToken: settings.botToken || '',
      botUsername: settings.botUsername || '',
      webhookUrl: 'https://app.example.com/api/webhook/telegram'
    }
  });

  const onSubmit = async (data) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>{t('settings.botToken')}</FormLabel>
              <Controller
                name="botToken"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                  </FormControl>
                )}
              />
              {errors.botToken && (
                <FormMessage>{errors.botToken.message}</FormMessage>
              )}
            </FormItem>
            
            <FormItem>
              <FormLabel>{t('settings.botUsername')}</FormLabel>
              <Controller
                name="botUsername"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} placeholder="@yourbotname" />
                  </FormControl>
                )}
              />
              {errors.botUsername && (
                <FormMessage>{errors.botUsername.message}</FormMessage>
              )}
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>{t('settings.webhookURL')}</FormLabel>
            <div className="flex gap-2">
              <Controller
                name="webhookUrl"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                )}
              />
              <Button variant="outline" type="button" onClick={copyWebhookUrl}>
                {t('settings.copy')}
              </Button>
            </div>
          </FormItem>

          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="telegram-active" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor="telegram-active">{t('settings.active')}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t('settings.saveSettings')}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
