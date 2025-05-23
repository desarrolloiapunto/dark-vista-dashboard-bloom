
import { useTranslation } from "react-i18next";
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { OrganizationFormValues } from "./OrganizationSettingsTypes";
import { AtSign } from "lucide-react";

interface SupportSettingsProps {
  form: UseFormReturn<OrganizationFormValues>;
}

export const SupportSettings = ({ form }: SupportSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <AtSign className="h-5 w-5" />
        {t('settings.supportSettings')}
      </h3>

      {/* Help & Support */}
      <FormField
        control={form.control}
        name="enableHelp"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {t('settings.enableHelp')}
              </FormLabel>
              <FormDescription>
                {t('settings.enableHelpDescription')}
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
