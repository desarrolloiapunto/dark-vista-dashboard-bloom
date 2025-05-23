
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { OrganizationProfile } from "./OrganizationProfile";
import { OrganizationAddress } from "./OrganizationAddress";
import { BusinessSettings } from "./BusinessSettings";
import { DomainSettings } from "./DomainSettings";
import { SupportSettings } from "./SupportSettings";
import { orgFormSchema, OrganizationFormValues } from "./OrganizationSettingsTypes";

export const OrganizationSettingsForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Load org settings from localStorage
  const storedSettings = localStorage.getItem("organization_settings");
  const defaultValues: Partial<OrganizationFormValues> = storedSettings 
    ? JSON.parse(storedSettings)
    : {
        name: "My Company",
        logo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        currency: "USD",
        timezone: "UTC",
        website: "",
        subdomain: "",
        customDomain: "",
        enableHelp: true,
        taxId: "",
      };

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(orgFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: OrganizationFormValues) => {
    setIsLoading(true);
    try {
      // In a real application, this would be saved to a database via API
      localStorage.setItem("organization_settings", JSON.stringify(data));
      
      toast({
        title: t('settings.saved'),
        description: t('settings.organizationSettingsSaved'),
      });
    } catch (error) {
      console.error("Error saving organization settings:", error);
      toast({
        title: t('status.error'),
        description: t('settings.errorSavingSettings'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <OrganizationProfile form={form} />
        
        <Separator className="my-6" />
        <OrganizationAddress form={form} />
        
        <Separator className="my-6" />
        <BusinessSettings form={form} />
        
        <Separator className="my-6" />
        <DomainSettings form={form} />
        
        <Separator className="my-6" />
        <SupportSettings form={form} />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.saving') : t('common.actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
