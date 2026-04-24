import React, { useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls
} from "reactflow";
import type { Connection, ReactFlowInstance } from "reactflow";
import type { WorkflowNode, WorkflowEdge } from "../../types/workflow";

import "reactflow/dist/style.css"; // ✅ IMPORTANT

interface Props {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  setNodes: any;
  setEdges: any;
  onNodesChange: any;
  onEdgesChange: any;
  setSelectedNodeId: (id: string) => void;
}

const WorkflowCanvas = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  setSelectedNodeId,
}: Props) => {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    console.log("DROP WORKING");

    if (!reactFlowInstance) return;

    const type = event.dataTransfer.getData("application/reactflow");

    console.log("TYPE:", type);

    if (!type) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: WorkflowNode = {
      id: `${Date.now()}`,
      type,
      position,
      data: {
        label: type.toUpperCase(), // ✅ default visible text
      },
    };

    setNodes((nds: WorkflowNode[]) => [...nds, newNode]);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div ref={wrapperRef} style={{ flex: 1, height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params: Connection) =>
          setEdges((eds: WorkflowEdge[]) => addEdge(params, eds))
        }
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;