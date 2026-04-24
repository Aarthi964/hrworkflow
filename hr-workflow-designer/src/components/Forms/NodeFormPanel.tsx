import type { WorkflowNode } from "../../types/workflow";

interface Props {
  node: WorkflowNode | null;
  updateNode: (node: WorkflowNode) => void;
}

const NodeFormPanel = ({ node, updateNode }: Props) => {
  if (!node) return <div>Select a node</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNode({
      ...node,
      data: { ...node.data, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <h3>{node.type} Config</h3>

      <input
        name="title"
        placeholder="Title"
        value={node.data.title || ""}
        onChange={handleChange}
      />

      {node.type === "task" && (
        <>
          <input name="assignee" placeholder="Assignee" onChange={handleChange} />
          <input name="dueDate" placeholder="Due Date" onChange={handleChange} />
        </>
      )}
    </div>
  );
};

export default NodeFormPanel;