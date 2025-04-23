
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

const metaSettingsSchema = z.object({
  isActive: z.boolean(),
  appId: z.string().min(1, "App ID is required"),
  appSecret: z.string().min(1, "App Secret is required"),
  pageId: z.string().min(1, "Page ID is required"),
  pageToken: z.string().min(1, "Page Token is required"),
  instagramAccountId: z.string().min(1, "Instagram Account ID is required")
});

export const MetaSettings = () => {
  const { t } = useTranslation();
  const { settings, saveSettings } = useSettings('meta');
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(metaSettingsSchema),
    defaultValues: {
      isActive: settings.isActive || false,
      appId: settings.appId || '',
      appSecret: settings.appSecret || '',
      pageId: settings.pageId || '',
      pageToken: settings.pageToken || '',
      instagramAccountId: settings.instagramAccountId || ''
    }
  });

  const onSubmit = async (data) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>{t('settings.appID')}</FormLabel>
              <Controller
                name="appId"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} placeholder="123456789012345" />
                  </FormControl>
                )}
              />
              {errors.appId && (
                <FormMessage>{errors.appId.message}</FormMessage>
              )}
            </FormItem>
            
            <FormItem>
              <FormLabel>{t('settings.appSecret')}</FormLabel>
              <Controller
                name="appSecret"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                  </FormControl>
                )}
              />
              {errors.appSecret && (
                <FormMessage>{errors.appSecret.message}</FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>{t('settings.pageID')}</FormLabel>
              <Controller
                name="pageId"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} placeholder="123456789012345" />
                  </FormControl>
                )}
              />
              {errors.pageId && (
                <FormMessage>{errors.pageId.message}</FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>{t('settings.pageToken')}</FormLabel>
              <Controller
                name="pageToken"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••••••••••••••••" />
                  </FormControl>
                )}
              />
              {errors.pageToken && (
                <FormMessage>{errors.pageToken.message}</FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel>{t('settings.instagramAccountID')}</FormLabel>
              <Controller
                name="instagramAccountId"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <Input {...field} placeholder="123456789012345" />
                  </FormControl>
                )}
              />
              {errors.instagramAccountId && (
                <FormMessage>{errors.instagramAccountId.message}</FormMessage>
              )}
            </FormItem>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch 
                  id="meta-active" 
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor="meta-active">{t('settings.active')}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t('settings.saveSettings')}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
