import { Handle, Position } from "reactflow";

const getColor = (type: string) => {
  switch (type) {
    case "start":
      return "#4CAF50";
    case "task":
      return "#2196F3";
    case "approval":
      return "#FF9800";
    case "automation":
      return "#9C27B0";
    case "end":
      return "#F44336";
    default:
      return "#999";
  }
};

const CustomNode = ({ data, type }: any) => {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        border: "2px solid #333",
        background: "white", // 👈 IMPORTANT (not dark)
        minWidth: 120,
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {/* TOP HANDLE */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#000",
          width: 10,
          height: 10,
        }}
      />

      {data.label || type.toUpperCase()}

      {/* BOTTOM HANDLE */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: "#000",
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
};

export default CustomNode;