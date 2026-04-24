import { simulateWorkflow } from "../../services/api";
import { validateWorkflow } from "../../utils/validators";
import type { WorkflowNode } from "../../types/workflow";
import type { WorkflowEdge } from "../../types/workflow";

interface Props {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

const SimulatorPanel = ({ nodes, edges }: Props) => {

  const runSimulation = async () => {

    const errors = validateWorkflow(nodes, edges);

    if (errors.length > 0) {
      alert("Validation Errors:\n" + errors.join("\n"));
      return;
    }

    const res = await simulateWorkflow({ nodes, edges });

    alert(res.steps.map((s: any) => s.message).join("\n"));
  };

  return (
    <button onClick={runSimulation}>
      Run Workflow
    </button>
  );
};

export default SimulatorPanel;