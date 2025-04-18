
import { useState, useCallback } from 'react';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PanelRight, Plus, MessageSquare, Bot, Save, AlignJustify, Zap } from "lucide-react";

// Node types
import MessageNode from '@/components/workflows/MessageNode';
import AIPromptNode from '@/components/workflows/AIPromptNode';
import ConditionNode from '@/components/workflows/ConditionNode';
import ActionNode from '@/components/workflows/ActionNode';

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
};

const WorkflowsPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = (type: string, label: string) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type,
      data: { label },
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 300 + 50 
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = () => {
    const workflow = { nodes, edges };
    console.log('Saving workflow:', workflow);
    // Here you would save to your backend
    alert('Flujo de trabajo guardado');
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Editor de Flujos de Trabajo</h1>
            <p className="text-muted-foreground text-sm">
              Diseña flujos de conversación para chatbots con drag & drop
            </p>
          </div>
          <Button variant="default" onClick={saveWorkflow}>
            <Save className="mr-2 h-4 w-4" /> Guardar Flujo
          </Button>
        </div>
        
        <div className="flex-1 relative">
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
            <PanelRight className="h-4 w-4" /> Panel de Herramientas
          </h2>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">Añadir Elementos</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('message', 'Mensaje')}
            >
              <MessageSquare className="h-8 w-8 mb-1" />
              <span className="text-xs">Mensaje</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('aiPrompt', 'Prompt IA')}
            >
              <Bot className="h-8 w-8 mb-1" />
              <span className="text-xs">Prompt IA</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('condition', 'Condición')}
            >
              <AlignJustify className="h-8 w-8 mb-1" />
              <span className="text-xs">Condición</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col h-24 p-2"
              onClick={() => addNewNode('action', 'Acción')}
            >
              <Zap className="h-8 w-8 mb-1" />
              <span className="text-xs">Acción</span>
            </Button>
          </div>
        </div>

        {selectedNode && (
          <Card className="mx-4 mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-md">Editar Nodo</CardTitle>
              <CardDescription>
                {selectedNode.data?.label || selectedNode.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Node editing controls would go here */}
              <p className="text-sm text-muted-foreground">
                Se mostrarán controles específicos según el tipo de nodo seleccionado.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkflowsPage;
