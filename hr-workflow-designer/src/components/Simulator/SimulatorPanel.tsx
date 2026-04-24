import { simulateWorkflow } from "../../services/api";
import { validateWorkflow } from "../../utils/validators";

const SimulatorPanel = ({ nodes, edges }: any) => {

  const run = async () => {
    const errors = validateWorkflow(nodes, edges);

    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    const res = await simulateWorkflow({ nodes });
    alert(res.steps.map((s: any) => s.message).join("\n"));
  };

  return <button onClick={run}>Run</button>;
};

export default SimulatorPanel;