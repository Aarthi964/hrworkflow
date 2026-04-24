import { NODE_TYPES } from "../../utils/constants";

const Sidebar = () => {

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 200, padding: 10, borderRight: "1px solid #ddd" }}>
      <h4>Nodes</h4>

      {Object.values(NODE_TYPES).map((type) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          style={{
            padding: "8px",
            margin: "5px 0",
            background: "#f3f3f3",
            cursor: "grab",
            borderRadius: "5px",
          }}
        >
          {type.toUpperCase()}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;