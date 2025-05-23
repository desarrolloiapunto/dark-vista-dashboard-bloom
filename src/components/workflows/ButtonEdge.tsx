
import { useCallback } from 'react';
import { 
  BaseEdge, 
  Edge, 
  EdgeLabelRenderer, 
  EdgeProps, 
  getBezierPath,
  useReactFlow
} from '@xyflow/react';

export default function ButtonEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}: EdgeProps) {
  const reactFlowInstance = useReactFlow();
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  
  const onEdgeClick = useCallback((evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    evt.stopPropagation();
    reactFlowInstance.setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [reactFlowInstance]);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            className="w-5 h-5 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
            onClick={(event) => onEdgeClick(event, id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
