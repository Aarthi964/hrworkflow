export interface Automation {
    id: string;
    label: string;
    params: string[];
  }
  
  export const getAutomations = async (): Promise<Automation[]> => {
    return [
      { id: "send_email", label: "Send Email", params: ["to", "subject"] },
      { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] }
    ];
  };
  
  export const simulateWorkflow = async (workflow: any) => {
    return {
      steps: workflow.nodes.map((node: any, i: number) => ({
        step: i + 1,
        message: `Executed ${node.type}`
      }))
    };
  };