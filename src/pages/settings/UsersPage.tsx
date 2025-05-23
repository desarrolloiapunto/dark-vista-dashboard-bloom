
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('settings.userManagement')}</h1>
        <p className="text-muted-foreground">{t('settings.userManagementDescription')}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.users')}</CardTitle>
          <CardDescription>{t('settings.usersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* User management functionality will be implemented later */}
          <p className="text-muted-foreground">{t('common.comingSoon')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
