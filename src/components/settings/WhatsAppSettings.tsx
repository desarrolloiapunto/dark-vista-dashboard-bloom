
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

const whatsAppSettingsSchema = z.object({
  isActive: z.boolean(),
  accessToken: z.string().min(10, "Access Token must be at least 10 characters"),
  phoneNumberId: z.string().min(1, "Phone Number ID is required")
});

export const WhatsAppSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings } = useSettings('whatsapp');
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(whatsAppSettingsSchema),
    defaultValues: {
      isActive: settings.isActive || false,
      accessToken: settings.accessToken || '',
      phoneNumberId: settings.phoneNumberId || ''
    }
  });

  const onSubmit = async (data) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormItem>
            <FormLabel>{t('settings.accessToken')}</FormLabel>
            <Controller
              name="accessToken"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input 
                    {...field} 
                    type="password" 
                    placeholder="••••••••••••••••••••••" 
                  />
                </FormControl>
              )}
            />
            {errors.accessToken && (
              <FormMessage>{errors.accessToken.message}</FormMessage>
            )}
          </FormItem>
          
          <FormItem>
            <FormLabel>{t('settings.phoneNumberID')}</FormLabel>
            <Controller
              name="phoneNumberId"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="1234567890" 
                  />
                </FormControl>
              )}
            />
            {errors.phoneNumberId && (
              <FormMessage>{errors.phoneNumberId.message}</FormMessage>
            )}
          </FormItem>

          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="whatsapp-active" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor="whatsapp-active">{t('settings.active')}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t('settings.saveSettings')}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
