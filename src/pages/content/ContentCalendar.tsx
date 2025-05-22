
import { ContentCalendar as Calendar } from "@/components/content/ContentCalendar";
import { useTranslation } from "react-i18next";

export default function ContentCalendar() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('content.calendar.title')}</h1>
          <p className="text-muted-foreground">{t('content.calendar.description')}</p>
        </div>
      </div>
      
      <Calendar />
    </div>
  );
}
