
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

const MessageNode = ({ data }: { data: { label: string, content?: string } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-blue-200 w-64">
      <div className="flex items-center gap-2 font-medium text-blue-600 mb-1">
        <MessageSquare className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-blue-50 rounded">
        {data.content || 'Mensaje sin contenido'}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="bg-blue-500" />
    </div>
  );
};

export default memo(MessageNode);
