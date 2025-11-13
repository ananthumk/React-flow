import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  useReactFlow 
} from 'reactflow';
import 'reactflow/dist/style.css';

const Diagram = forwardRef(({ nodes, edges, onNodesChange, onEdgesChange }, ref) => {
  const { fitView } = useReactFlow();

  
  useImperativeHandle(ref, () => ({
    resetView: () => {
      fitView({ padding: 0.2, duration: 300 });
    }
  }));

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.2, duration: 200 });
      }, 100);
    }
  }, [nodes.length, fitView]);

  return (
    <div className="diagram-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
});

export default Diagram;