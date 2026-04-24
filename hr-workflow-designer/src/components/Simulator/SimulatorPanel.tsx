import { simulateWorkflow } from "../../services/api";
import type { WorkflowNode } from "../../types/workflow";

interface Props {
  nodes: WorkflowNode[];
}

const SimulatorPanel = ({ nodes }: Props) => {

  const runSimulation = async () => {
    const res = await simulateWorkflow({ nodes });
    alert(res.steps.map((s: any) => s.message).join("\n"));
  };

  return <button onClick={runSimulation}>Run Workflow</button>;
};

export default SimulatorPanel;