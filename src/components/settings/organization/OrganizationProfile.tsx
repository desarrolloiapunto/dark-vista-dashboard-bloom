
import { useTranslation } from "react-i18next";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrganizationFormValues } from "./OrganizationSettingsTypes";

interface OrganizationProfileProps {
  form: UseFormReturn<OrganizationFormValues>;
}

export const OrganizationProfile = ({ form }: OrganizationProfileProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organization Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.organizationName')}</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tax ID / VAT */}
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.taxId')}</FormLabel>
              <FormControl>
                <Input placeholder="Tax ID / VAT Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Logo Upload */}
      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('settings.organizationLogo')}</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                {field.value && (
                  <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                    <img 
                      src={field.value} 
                      alt="Organization logo" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <Input
                  type="text"
                  placeholder="Logo URL"
                  {...field}
                  className="flex-1"
                />
              </div>
            </FormControl>
            <FormDescription>
              {t('settings.logoDescription')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
