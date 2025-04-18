
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Bot } from 'lucide-react';

const AIPromptNode = ({ data }: { data: { label: string, prompt?: string } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-purple-200 w-64">
      <div className="flex items-center gap-2 font-medium text-purple-600 mb-1">
        <Bot className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-purple-50 rounded">
        {data.prompt || 'Define un prompt para la IA'}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="bg-purple-500" />
    </div>
  );
};

export default memo(AIPromptNode);
