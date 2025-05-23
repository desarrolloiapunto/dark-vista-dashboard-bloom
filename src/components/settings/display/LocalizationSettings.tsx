
import { useTranslation } from "react-i18next";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";
import { DisplayFormValues } from "./DisplaySettingsTypes";
import { UseFormReturn } from "react-hook-form";

interface LocalizationSettingsProps {
  form: UseFormReturn<DisplayFormValues>;
}

export const LocalizationSettings = ({ form }: LocalizationSettingsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Languages className="h-5 w-5" />
        {t('settings.localization')}
      </h3>
      
      <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('settings.language')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="timezone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('settings.timezone')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              {t('settings.timezoneDescription')}
            </FormDescription>
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="dateFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.dateFormat')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="timeFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.timeFormat')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="12h">12h (AM/PM)</SelectItem>
                  <SelectItem value="24h">24h</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
