import { useEffect, useState } from "react";
import type { WorkflowNode } from "../../types/workflow";
import { getNodeFormConfig, getAutomations } from "../../services/api";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface Props {
  node: WorkflowNode | null;
  updateNode: (node: WorkflowNode) => void;
  onPanelClose: () => void; // ✅ new
}

const NodeFormPanel = ({ node, updateNode, onPanelClose }: Props) => {

  const [fields, setFields] = useState<Field[]>([]);
  const [actions, setActions] = useState<any[]>([]);

  useEffect(() => {
    if (!node) return;

    getNodeFormConfig(node.type as string).then(setFields);

    if (node.type === "automation") {
      getAutomations().then(setActions);
    }
  }, [node]);

  if (!node) return <div style={{ padding: 10 }}>Select a node</div>;

  const handleChange = (name: string, value: any) => {
    const updatedData = {
      ...node.data,
      [name]: value,
    };
  
    // 🔥 if title is changed → update label also
    if (name === "title") {
      updatedData.label = value;
    }
  
    updateNode({
      ...node,
      data: updatedData,
    });
  };

  return (
    <div
      style={{
        width: 300,
        padding: 15,
        borderLeft: "1px solid #ddd",
        background: "#fafafa",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{node.type.toUpperCase()} CONFIG</h3>
        <button onClick={onPanelClose}>❌</button>
      </div>

      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: 10 }}>
          <label>{field.label}</label>

          {field.type === "select" ? (
            <select
              value={node.data[field.name] || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              style={{ width: "100%" }}
            >
              <option value="">Select</option>
              {actions.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={node.data[field.name] || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value)
              }
              style={{ width: "100%" }}
            />
          )}
        </div>
      ))}

      {/* Dynamic automation params */}
      {node.type === "automation" &&
        actions
          .find((a) => a.id === node.data.action)
          ?.params?.map((param: string) => (
            <div key={param} style={{ marginBottom: 10 }}>
              <label>{param}</label>
              <input
                value={node.data[param] || ""}
                onChange={(e) =>
                  handleChange(param, e.target.value)
                }
                style={{ width: "100%" }}
              />
            </div>
          ))}
    </div>
  );
};

export default NodeFormPanel;