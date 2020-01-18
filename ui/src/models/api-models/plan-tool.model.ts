import { Plan, Tool } from '.';

export interface PlanTool {
    __typename: 'PlanTool';
    id: string;
    tool: Tool | null;
    plan: Plan | null;
}
