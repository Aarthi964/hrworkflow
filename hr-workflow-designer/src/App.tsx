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
    selectedNode,
    setSelectedNode,
  } = useWorkflow();

  const updateNode = (updatedNode: any) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <WorkflowCanvas setSelectedNode={setSelectedNode} />
      <NodeFormPanel node={selectedNode} updateNode={updateNode} />
      <SimulatorPanel nodes={nodes} />
    </div>
  );
}

export default App;