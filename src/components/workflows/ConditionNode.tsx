
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { AlignJustify } from 'lucide-react';

const ConditionNode = ({ data }: { data: { label: string, condition?: string } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-amber-200 w-64">
      <div className="flex items-center gap-2 font-medium text-amber-600 mb-1">
        <AlignJustify className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-amber-50 rounded">
        {data.condition || 'Define una condición'}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-amber-500" />
      <Handle type="source" position={Position.Bottom} id="yes" className="bg-green-500" style={{ left: '30%' }} />
      <Handle type="source" position={Position.Bottom} id="no" className="bg-red-500" style={{ left: '70%' }} />
    </div>
  );
};

export default memo(ConditionNode);
