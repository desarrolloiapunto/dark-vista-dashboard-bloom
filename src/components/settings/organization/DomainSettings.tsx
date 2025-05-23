
import { useTranslation } from "react-i18next";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OrganizationFormValues } from "./OrganizationSettingsTypes";
import { Globe } from "lucide-react";

interface DomainSettingsProps {
  form: UseFormReturn<OrganizationFormValues>;
}

export const DomainSettings = ({ form }: DomainSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5" />
        {t('settings.domainSettings')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subdomain */}
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.subdomain')}</FormLabel>
              <div className="flex items-center gap-0">
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="yourcompany" 
                    className="rounded-r-none border-r-0"
                  />
                </FormControl>
                <div className="bg-muted px-3 h-10 flex items-center border border-l-0 rounded-r-md text-muted-foreground text-sm">
                  .lovable.app
                </div>
              </div>
              <FormDescription>
                {t('settings.subdomainDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Domain */}
        <FormField
          control={form.control}
          name="customDomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.customDomain')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder="app.yourdomain.com" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                {t('settings.customDomainDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
