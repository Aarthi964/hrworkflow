import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

export const validateWorkflow = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): string[] => {

  const errors: string[] = [];

  const startNodes = nodes.filter(n => n.type === "start");
  const endNodes = nodes.filter(n => n.type === "end");

  // Rule 1: Only one start
  if (startNodes.length !== 1) {
    errors.push("There must be exactly ONE Start node");
  }

  // Rule 2: Only one end
  if (endNodes.length !== 1) {
    errors.push("There must be exactly ONE End node");
  }

  // Rule 3: Start should not have incoming edges
  edges.forEach(edge => {
    if (startNodes.some(n => n.id === edge.target)) {
      errors.push("Start node cannot have incoming connections");
    }
  });

  // Rule 4: End should not have outgoing edges
  edges.forEach(edge => {
    if (endNodes.some(n => n.id === edge.source)) {
      errors.push("End node cannot have outgoing connections");
    }
  });

  // Rule 5: Every node must be connected
  nodes.forEach(node => {
    const connected = edges.some(
      edge => edge.source === node.id || edge.target === node.id
    );

    if (!connected && node.type !== "start") {
      errors.push(`Node ${node.id} is not connected`);
    }
  });

  // Rule 6: Detect cycles (DFS)
  const visited = new Set<string>();
  const recStack = new Set<string>();

  const hasCycle = (nodeId: string): boolean => {
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
      recStack.add(nodeId);

      const neighbors = edges
        .filter(e => e.source === nodeId)
        .map(e => e.target);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && hasCycle(neighbor)) {
          return true;
        } else if (recStack.has(neighbor)) {
          return true;
        }
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (hasCycle(node.id)) {
      errors.push("Workflow contains a cycle");
      break;
    }
  }

  return errors;
};