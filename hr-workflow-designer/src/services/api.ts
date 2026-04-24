export const getNodeFormConfig = async (type: string) => {
  const configs: Record<string, any[]> = {
    start: [
      { name: "title", label: "Start Title", type: "text" },
    ],

    task: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "text" },
      { name: "assignee", label: "Assignee", type: "text" },
      { name: "dueDate", label: "Due Date", type: "date" },
    ],

    approval: [
      { name: "title", label: "Title", type: "text" },
      { name: "role", label: "Approver Role", type: "text" },
    ],

    automation: [
      { name: "action", label: "Select Action", type: "select" },
    ],

    end: [
      { name: "message", label: "End Message", type: "text" },
    ],
  };

  return configs[type] || [];
};

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

// ✅ GET automations
export const getAutomations = async (): Promise<Automation[]> => {
  return Promise.resolve([
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject"]
    },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"]
    }
  ]);
};

// ✅ SIMULATE WORKFLOW (THIS WAS MISSING)
export const simulateWorkflow = async (workflow: any) => {
  return Promise.resolve({
    steps: workflow.nodes.map((node: any, index: number) => ({
      step: index + 1,
      message: `Executed ${node.type} node`
    }))
  });
};