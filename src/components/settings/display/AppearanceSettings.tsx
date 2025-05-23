
import { useTranslation } from "react-i18next";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette } from "lucide-react";
import { DisplayFormValues } from "./DisplaySettingsTypes";
import { UseFormReturn } from "react-hook-form";

interface AppearanceSettingsProps {
  form: UseFormReturn<DisplayFormValues>;
}

export const AppearanceSettings = ({ form }: AppearanceSettingsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Palette className="h-5 w-5" />
        {t('settings.appearance')}
      </h3>
      
      <FormField
        control={form.control}
        name="theme"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('settings.theme')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="light">{t('settings.lightTheme')}</SelectItem>
                <SelectItem value="dark">{t('settings.darkTheme')}</SelectItem>
                <SelectItem value="system">{t('settings.systemTheme')}</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {t('settings.themeDescription')}
            </FormDescription>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="compactMode"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {t('settings.compactMode')}
              </FormLabel>
              <FormDescription>
                {t('settings.compactModeDescription')}
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
        name="highContrast"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {t('settings.highContrast')}
              </FormLabel>
              <FormDescription>
                {t('settings.highContrastDescription')}
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
        name="animationsEnabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {t('settings.enableAnimations')}
              </FormLabel>
              <FormDescription>
                {t('settings.enableAnimationsDescription')}
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
    </div>
  );
};
