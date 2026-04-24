import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

export const useWorkflow = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const addNode = (type: string, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: uuid(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectedNode,
    setSelectedNode,
    addNode,
  };
};