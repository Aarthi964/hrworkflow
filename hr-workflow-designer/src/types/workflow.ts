import type { Node, Edge } from "reactflow";

export type NodeType =
  | "start"
  | "task"
  | "approval"
  | "automation"
  | "end";

export interface WorkflowNodeData {
  label?: string;
  title?: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  role?: string;

  [key: string]: any;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;