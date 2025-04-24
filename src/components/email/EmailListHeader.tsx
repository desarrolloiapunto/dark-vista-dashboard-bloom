
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";

export function EmailListHeader() {
  const { t } = useTranslation();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12"></TableHead>
        <TableHead className="w-12"></TableHead>
        <TableHead className="w-[180px]">{t('email.from')}</TableHead>
        <TableHead>Asunto</TableHead>
        <TableHead className="w-[150px]">Etiquetas</TableHead>
        <TableHead className="text-right w-[100px]">{t('email.date')}</TableHead>
        <TableHead className="w-[60px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
}
