
import { useTranslation } from "react-i18next";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowActionsProps {
  onSave: () => void;
}

const WorkflowActions = ({ onSave }: WorkflowActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-border p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">{t('workflows.workflowEditor')}</h1>
        <p className="text-muted-foreground text-sm">
          {t('workflows.workflowEditorDescription')}
        </p>
      </div>
      <Button variant="default" onClick={onSave}>
        <Save className="mr-2 h-4 w-4" /> {t('workflows.saveWorkflow')}
      </Button>
    </div>
  );
};

export default WorkflowActions;
