
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';

const ActionNode = ({ data }: { data: { label: string, action?: string } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-green-200 w-64">
      <div className="flex items-center gap-2 font-medium text-green-600 mb-1">
        <Zap className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-green-50 rounded">
        {data.action || 'Define una acción'}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="bg-green-500" />
    </div>
  );
};

export default memo(ActionNode);
