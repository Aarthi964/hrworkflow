import { useState } from "react";
import { simulateWorkflow } from "../../services/api";
import { validateWorkflow } from "../../utils/validators";

const SimulatorPanel = ({ nodes, edges }: any) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleRun = async () => {
    const validationErrors = validateWorkflow(nodes, edges);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setLoading(true);

    const res = await simulateWorkflow({ nodes, edges });

    setLoading(false);

    alert(res.steps.map((s: any) => s.message).join("\n"));
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 220,
        background: "white",
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <button
        onClick={handleRun}
        disabled={loading}
        style={{
          padding: "8px 16px",
          background: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Running..." : "Run Workflow"}
      </button>

      {/* 🔥 Validation errors */}
      {errors.length > 0 && (
        <div style={{ marginTop: 10, color: "red" }}>
          {errors.map((err, i) => (
            <div key={i}>⚠ {err}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimulatorPanel;