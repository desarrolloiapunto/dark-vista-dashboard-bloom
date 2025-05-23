
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
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Copy, Trash } from "lucide-react";

// Import our custom components
import { nodeTypes, edgeTypes, NodeData } from '@/components/workflows/editor/NodeTypes';
import NodeEditForm from '@/components/workflows/editor/NodeEditForm';
import WorkflowToolsPanel from '@/components/workflows/editor/WorkflowToolsPanel';
import WorkflowActions from '@/components/workflows/editor/WorkflowActions';

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
  
  // Connection handling with buttonedge default type
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      // Set default edge type to buttonedge
      const updatedParams = {
        ...params,
        type: 'buttonedge',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(updatedParams, eds));
    },
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
    } else if (node.type === 'multimedia') {
      setActiveTab('multimediaContent');
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
        // Fix for the translation issue - provide a default array if translation fails
        initialData.menuItems = ['Option 1', 'Option 2', 'Option 3'];
        try {
          const translatedItems = t('workflows.defaultMenuItems', { returnObjects: true });
          // Ensure translatedItems is an array of strings
          if (Array.isArray(translatedItems)) {
            // Map each item to ensure they are strings
            initialData.menuItems = translatedItems.map(item => 
              typeof item === 'string' ? item : String(item)
            );
          }
        } catch (error) {
          console.error("Translation error for menu items:", error);
        }
        break;
      case 'multimedia':
        initialData.multimediaType = "productCard";
        initialData.multimediaContent = {
          title: "Producto",
          products: []
        };
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
    
    toast({
      title: t('workflows.workflowSaved'),
      description: t('workflows.workflowSavedSuccess')
    });
  };

  const handleEditNodeClick = () => {
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex flex-col">
        <WorkflowActions onSave={saveWorkflow} />
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            snapToGrid
            snapGrid={[15, 15]}
            defaultEdgeOptions={{ 
              animated: true,
              type: 'buttonedge',
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            }}
          >
            <Controls />
            <MiniMap />
            <Background gap={16} size={1} />
            <Panel position="top-left">
              <div className="bg-background p-2 rounded shadow-md border mb-2">
                <p className="text-xs text-muted-foreground">
                  {t('workflows.clickToEdit')}
                </p>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      <WorkflowToolsPanel 
        selectedNode={selectedNode} 
        onAddNode={addNewNode} 
        onEditClick={handleEditNodeClick} 
      />

      {/* Node editing dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('workflows.editNode')}: {selectedNode?.data?.label}</DialogTitle>
            <DialogDescription>
              {t('workflows.editNodeDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            <NodeEditForm
              selectedNode={selectedNode}
              editedNodeData={editedNodeData}
              setEditedNodeData={setEditedNodeData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
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
