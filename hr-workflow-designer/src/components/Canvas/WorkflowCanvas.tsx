import React, { useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls
} from "reactflow";
import "reactflow/dist/style.css";
import type {Connection,
  ReactFlowInstance,} from "reactflow";
import type { WorkflowNode, WorkflowEdge } from "../../types/workflow";

interface Props {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodesChange: any;
  onEdgesChange: any;
  setNodes: any;
  setEdges: any;
  setSelectedNode: (node: WorkflowNode) => void;
}

const WorkflowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setNodes,
  setEdges,
  setSelectedNode,
}: Props) => {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  // connect edges
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds: WorkflowEdge[]) => addEdge(params, eds)),
    []
  );

  // allow drop
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // DROP LOGIC (IMPORTANT 🔥)
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    if (!reactFlowInstance || !wrapperRef.current) return;

    const type = event.dataTransfer.getData("application/reactflow");

    const bounds = wrapperRef.current.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode: WorkflowNode = {
      id: `${Date.now()}`,
      type,
      position,
      data: { label: `${type}` },
    };

    setNodes((nds: WorkflowNode[]) => [...nds, newNode]);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ flex: 1, height: "100vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => setSelectedNode(node)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;