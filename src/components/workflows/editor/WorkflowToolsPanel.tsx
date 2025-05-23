
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Bot, 
  AlignJustify, 
  Zap, 
  List, 
  Image,
} from "lucide-react";

interface ToolsPanelProps {
  selectedNode: any;
  onAddNode: (type: string, label: string) => void;
  onEditClick: () => void;
}

const WorkflowToolsPanel = ({ selectedNode, onAddNode, onEditClick }: ToolsPanelProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-80 border-l border-border overflow-auto">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold flex items-center gap-2">
          {t('workflows.toolsPanel')}
        </h2>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium mb-3">{t('workflows.addElements')}</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('message', t('workflows.messageNode'))}
          >
            <MessageSquare className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.message')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('aiPrompt', t('workflows.promptNode'))}
          >
            <Bot className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.aiPrompt')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('condition', t('workflows.conditionNode'))}
          >
            <AlignJustify className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.condition')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('action', t('workflows.actionNode'))}
          >
            <Zap className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.action')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('menu', t('workflows.menuNode'))}
          >
            <List className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.menu')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col h-24 p-2"
            onClick={() => onAddNode('multimedia', t('workflows.multimediaNode'))}
          >
            <Image className="h-8 w-8 mb-1" />
            <span className="text-xs">{t('workflows.multimedia')}</span>
          </Button>
        </div>
      </div>

      {selectedNode && (
        <Card className="mx-4 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">{selectedNode.data?.label || selectedNode.type}</CardTitle>
            <CardDescription>
              {t(`workflows.${selectedNode.type}Description`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t('workflows.clickToEdit')}
            </p>
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={onEditClick}>
                {t('workflows.editNode')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowToolsPanel;
