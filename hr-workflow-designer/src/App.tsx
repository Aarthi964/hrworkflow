import Sidebar from "./components/Canvas/Sidebar";
import WorkflowCanvas from "./components/Canvas/WorkflowCanvas";
import NodeFormPanel from "./components/Forms/NodeFormPanel";
import SimulatorPanel from "./components/Simulator/SimulatorPanel";
import { useWorkflow } from "./hooks/useWorkflow";

function App() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    selectedNodeId,
    setSelectedNodeId,
  } = useWorkflow();

  const selectedNode =
    nodes.find((n) => n.id === selectedNodeId) || null;

  const updateNode = (updatedNode: any) => {
    setNodes((nds: any[]) =>
      nds.map((n) =>
        n.id === updatedNode.id
          ? { ...n, data: updatedNode.data }
          : n
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <WorkflowCanvas
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        setSelectedNodeId={setSelectedNodeId}
      />

    <NodeFormPanel
      node={selectedNode}
      updateNode={updateNode}
      onPanelClose={() => setSelectedNodeId(null)}
    />

      <SimulatorPanel nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;