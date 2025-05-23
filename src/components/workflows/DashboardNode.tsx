
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { LayoutDashboard } from 'lucide-react';

const DashboardNode = ({ data }: { data: { label: string, dashboardConfig?: Record<string, any> } }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-md shadow-md border border-cyan-200 w-64">
      <div className="flex items-center gap-2 font-medium text-cyan-600 mb-1">
        <LayoutDashboard className="h-4 w-4" />
        {data.label}
      </div>
      <div className="text-sm text-gray-600 p-2 bg-cyan-50 rounded">
        {data.dashboardConfig ? 
          <div className="grid grid-cols-2 gap-1">
            {Object.entries(data.dashboardConfig).map(([key, value]) => (
              <div key={key} className="p-1 bg-white border border-cyan-100 rounded text-xs">
                {key}: {JSON.stringify(value).substring(0, 15)}
              </div>
            ))}
          </div> : 
          'Configura tu dashboard'
        }
      </div>
      
      <Handle type="target" position={Position.Top} className="bg-cyan-500" />
      <Handle type="source" position={Position.Bottom} className="bg-cyan-500" />
    </div>
  );
};

export default memo(DashboardNode);
