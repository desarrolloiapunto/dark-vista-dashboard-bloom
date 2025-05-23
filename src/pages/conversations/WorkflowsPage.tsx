import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Edge,
  Connection,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { 
  PanelRight, 
  Plus, 
  MessageSquare, 
  Bot, 
  Save, 
  AlignJustify, 
  Zap, 
  X, 
  Copy,
  Trash,
  List,
  LayoutDashboard
} from "lucide-react";

// Node types
import MessageNode from '@/components/workflows/MessageNode';
import AIPromptNode from '@/components/workflows/AIPromptNode';
import ConditionNode from '@/components/workflows/ConditionNode';
import ActionNode from '@/components/workflows/ActionNode';
import MenuNode from '@/components/workflows/MenuNode';
import DashboardNode from '@/components/workflows/DashboardNode';

// Initial elements for the workflow
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'message',
    data: { 
      label: 'Mensaje de Bienvenida', 
      content: '¡Hola! ¿En qué podemos ayudarte hoy?' 
    },
    position: { x: 250, y: 50 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  message: MessageNode,
  aiPrompt: AIPromptNode,
  condition: ConditionNode,
  action: ActionNode,
  menu: MenuNode,
  dashboard: DashboardNode,
};

// Define the type for our node data
interface NodeData {
  label?: string;
  content?: string;
  prompt?: string;
  condition?: string;
  action?: string;
  menuItems?: string[];
  dashboardConfig?: Record<string, any>;
  // Add index signature to satisfy Record<string, unknown>
  [key: string]: unknown;
}

const WorkflowsPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedNodeData, setEditedNodeData] = useState<NodeData | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    event.stopPropagation();
    setSelectedNode(node);
    setEditedNodeData({...node.data});
    setIsEditDialogOpen(true);
    
    // Set the appropriate tab based on the node type
    if (node.type === 'message') {
      setActiveTab('content');
    } else if (node.type === 'aiPrompt') {
      setActiveTab('prompt');
    } else if (node.type === 'condition') {
      setActiveTab('condition');
    } else if (node.type === 'action') {
      setActiveTab('action');
    } else if (node.type === 'menu') {
      setActiveTab('menuItems');
    } else if (node.type === 'dashboard') {
      setActiveTab('dashboardConfig');
    }
  }, []);

  const addNewNode = (type: string, label: string) => {
    let initialData: NodeData = { label };
    
    // Set appropriate default data based on node type
    switch (type) {
      case 'message':
        initialData.content = t('workflows.defaultMessageContent');
        break;
      case 'aiPrompt':
        initialData.prompt = t('workflows.defaultPrompt');
        break;
      case 'condition':
        initialData.condition = t('workflows.defaultCondition');
        break;
      case 'action':
        initialData.action = t('workflows.defaultAction');
        break;
      case 'menu':
        initialData.menuItems = t('workflows.defaultMenuItems', { returnObjects: true }) || ['Option 1', 'Option 2', 'Option 3'];
        break;
      case 'dashboard':
        initialData.dashboardConfig = JSON.parse(t('workflows.defaultDashboardConfig') || '{"widgets":[]}');
        break;
    }
    
    const newNode = {
      id: `node_${Date.now()}`,
      type,
      data: initialData,
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 300 + 50 
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updateNode = () => {
    if (!selectedNode || !editedNodeData) return;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...editedNodeData },
          };
        }
        return node;
      })
    );
    
    setIsEditDialogOpen(false);
    
    toast({
      title: t('workflows.nodeUpdated'),
      description: t('workflows.nodeSettingsSaved')
    });
  };

  const duplicateNode = () => {
    if (!selectedNode) return;
    
    const newNode = {
      id: `node_${Date.now()}`,
      type: selectedNode.type,
      data: { ...selectedNode.data, label: `${selectedNode.data.label} (${t('workflows.copy')})` },
      position: { 
        x: selectedNode.position.x + 50, 
        y: selectedNode.position.y + 50 
      },
    };
    
    setNodes((nds) => [...nds, newNode]);
    setIsEditDialogOpen(false);
    
    toast({
      title: t('workflows.nodeDuplicated'),
      description: t('workflows.nodeCopyCreated')
    });
  };

  const deleteNode = () => {
    if (!selectedNode) return;
    
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: t('workflows.nodeDeleted'),
      description: t('workflows.nodeRemoved')
    });
  };

  const saveWorkflow = () => {
    const workflow = { nodes, edges };
    console.log('Saving workflow:', workflow);
    // Here you would save to your backend
    
    toast({
      title: t('workflows.workflowSaved'),
      description: t('workflows.workflowSavedSuccess')
    });
  };

  // Helper function to add a menu item
  const addMenuItem = () => {
    if (!editedNodeData) return;
    
    const currentItems = editedNodeData.menuItems || [];
    const newItem = `Option ${currentItems.length + 1}`;
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: [...currentItems, newItem]
    });
  };

  // Helper function to remove a menu item
  const removeMenuItem = (index: number) => {
    if (!editedNodeData?.menuItems) return;
    
    const updatedItems = [...editedNodeData.menuItems];
    updatedItems.splice(index, 1);
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: updatedItems
    });
  };

  // Helper function to update a menu item
  const updateMenuItem = (index: number, value: string) => {
    if (!editedNodeData?.menuItems) return;
    
    const updatedItems = [...editedNodeData.menuItems];
    updatedItems[index] = value;
    
    setEditedNodeData({
      ...editedNodeData,
      menuItems: updatedItems
    });
  };

  // Helper function to update dashboard config
  const updateDashboardConfig = (configStr: string) => {
    if (!editedNodeData) return;
    
    try {
      const config = JSON.parse(configStr);
      setEditedNodeData({
        ...editedNodeData,
        dashboardConfig: config
      });
    } catch (error) {
      console.error("Invalid JSON for dashboard config:", error);
    }
  };

  const getNodeEditForm = () => {
    if (!selectedNode || !editedNodeData) return null;
    
    switch (selectedNode.type) {
      case 'message':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="content">{t('workflows.content')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message-content">{t('workflows.messageContent')}</Label>
                <Textarea 
                  id="message-content" 
                  value={editedNodeData.content || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, content: e.target.value})}
                  rows={5}
                  className="resize-none"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.messageSettings')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.messageSettingsDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'aiPrompt':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="prompt">{t('workflows.prompt')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="prompt" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">{t('workflows.aiPromptTemplate')}</Label>
                <Textarea 
                  id="ai-prompt" 
                  value={editedNodeData.prompt || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, prompt: e.target.value})}
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {t('workflows.aiPromptDescription')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.aiModelSettings')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.aiModelSettingsDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'condition':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="condition">{t('workflows.condition')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="condition" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition-expression">{t('workflows.conditionExpression')}</Label>
                <Textarea 
                  id="condition-expression" 
                  value={editedNodeData.condition || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, condition: e.target.value})}
                  rows={3}
                  className="resize-none font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  {t('workflows.conditionExpressionDescription')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.conditionBranches')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.conditionBranchesDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'action':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="action">{t('workflows.action')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="action" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="action-definition">{t('workflows.actionDefinition')}</Label>
                <Textarea 
                  id="action-definition" 
                  value={editedNodeData.action || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, action: e.target.value})}
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {t('workflows.actionDefinitionDescription')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.actionSettings')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.actionSettingsDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'menu':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="menuItems">{t('workflows.menuItems')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="menuItems" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t('workflows.menuItems')}</Label>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={addMenuItem}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> {t('workflows.addMenuItem')}
                  </Button>
                </div>
                <div className="space-y-2 p-2 border rounded">
                  {editedNodeData.menuItems?.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={item} 
                        onChange={(e) => updateMenuItem(index, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeMenuItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {(!editedNodeData.menuItems || editedNodeData.menuItems.length === 0) && (
                    <p className="text-sm text-muted-foreground py-2">
                      No menu items. Add one with the button above.
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('workflows.menuItemsDescription')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.actionSettings')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.actionSettingsDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case 'dashboard':
        return (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="dashboardConfig">{t('workflows.dashboardConfig')}</TabsTrigger>
              <TabsTrigger value="settings">{t('workflows.settings')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboardConfig" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="node-label">{t('workflows.nodeTitle')}</Label>
                <Input 
                  id="node-label" 
                  value={editedNodeData.label || ''} 
                  onChange={(e) => setEditedNodeData({...editedNodeData, label: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dashboard-config">{t('workflows.dashboardConfig')}</Label>
                <Textarea 
                  id="dashboard-config" 
                  value={editedNodeData.dashboardConfig ? JSON.stringify(editedNodeData.dashboardConfig, null, 2) : ''}
                  onChange={(e) => updateDashboardConfig(e.target.value)}
                  rows={8}
                  className="resize-none font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  {t('workflows.dashboardConfigDescription')}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label>{t('workflows.actionSettings')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('workflows.actionSettingsDescription')}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{t('workflows.workflowEditor')}</h1>
            <p className="text-muted-foreground text-sm">
              {t('workflows.workflowEditorDescription')}
            </p>
          </div>
          <Button variant="default" onClick={saveWorkflow}>
            <Save className="mr-2 h-4 w-4" /> {t('workflows.saveWorkflow')}
          </Button>
        </div>
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{ 
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            }}
          >
            <Controls />
            <MiniMap />
            <Background gap={16} size={1} />
          </ReactFlow>
        </div>
      </div>

      <div className="w-80 border-l border-border overflow-auto">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold flex items-center gap-2">
            <PanelRight className="h-4 w-4" /> {t('workflows.toolsPanel')}
          </h2>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">{t('workflows.addElements')}</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('message', t('workflows.messageNode'))}
            >
              <MessageSquare className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.message')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('aiPrompt', t('workflows.promptNode'))}
            >
              <Bot className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.aiPrompt')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('condition', t('workflows.conditionNode'))}
            >
              <AlignJustify className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.condition')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('action', t('workflows.actionNode'))}
            >
              <Zap className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.action')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('menu', t('workflows.menuNode'))}
            >
              <List className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.menu')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('dashboard', t('workflows.dashboardNode'))}
            >
              <LayoutDashboard className="h-8 w-8 mb-1" />
              <span className="text-xs">{t('workflows.dashboard')}</span>
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
                <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                  {t('workflows.editNode')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Node editing dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('workflows.editNode')}: {selectedNode?.data?.label}</DialogTitle>
            <DialogDescription>
              {t('workflows.editNodeDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {getNodeEditForm()}
          </div>
          
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={duplicateNode}
                title={t('workflows.duplicateNode')}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={deleteNode}
                title={t('workflows.deleteNode')}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
                {t('workflows.cancel')}
              </Button>
              <Button onClick={updateNode}>
                {t('workflows.saveChanges')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowsPage;
