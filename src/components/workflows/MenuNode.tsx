
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { List } from 'lucide-react';

const MenuNode = ({ data }: { data: { label: string, menuItems?: string[] } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-indigo-200 w-64">
      <div className="flex items-center gap-2 font-medium text-indigo-600 mb-1">
        <List className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-indigo-50 rounded">
        {data.menuItems && data.menuItems.length > 0 ? (
          <ul className="list-disc pl-4">
            {data.menuItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          'Menú sin opciones'
        )}
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-indigo-500" />
      <Handle type="source" position={Position.Bottom} className="bg-indigo-500" />
    </div>
  );
};

export default memo(MenuNode);
