
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building, Globe, MapPin, Currency, AtSign, Image } from "lucide-react";

const currencyOptions = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "AUD - Australian Dollar", value: "AUD" },
  { label: "CNY - Chinese Yuan", value: "CNY" },
  { label: "MXN - Mexican Peso", value: "MXN" }
];

const orgFormSchema = z.object({
  name: z.string().min(2, { message: "Organization name is required" }),
  logo: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  currency: z.string(),
  timezone: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.string().length(0)),
  subdomain: z.string().regex(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, {
    message: "Subdomain can only contain lowercase letters, numbers, and hyphens"
  }).optional().or(z.string().length(0)),
  customDomain: z.string().regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/, {
    message: "Please enter a valid domain"
  }).optional().or(z.string().length(0)),
  enableHelp: z.boolean().default(true),
  taxId: z.string().optional(),
});

type OrganizationFormValues = z.infer<typeof orgFormSchema>;

export const OrganizationSettings = () => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {t('settings.organizationProfile')}
          </CardTitle>
          <CardDescription>
            {t('settings.organizationProfileDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Separator className="my-6" />

              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5" />
                {t('settings.address')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>{t('settings.streetAddress')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="123 Business Ave, Suite 101" 
                          {...field} 
                          rows={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.city')}</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* State / Province */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.state')}</FormLabel>
                      <FormControl>
                        <Input placeholder="State / Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.country')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Postal Code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.postalCode')}</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal / ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Currency className="h-5 w-5" />
                {t('settings.businessSettings')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.currency')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencyOptions.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('settings.website')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

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

              <Separator className="my-6" />

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

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('common.saving') : t('common.actions.save')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
