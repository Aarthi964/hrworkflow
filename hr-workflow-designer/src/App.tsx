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
    selectedNode,
    setSelectedNode,
  } = useWorkflow();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <WorkflowCanvas
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        setSelectedNode={setSelectedNode}
      />

      <NodeFormPanel node={selectedNode} updateNode={() => {}} />

      <SimulatorPanel nodes={nodes} edges={edges} />
    </div>
  );
}
export default App;