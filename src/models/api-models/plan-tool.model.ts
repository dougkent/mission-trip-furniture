import { Plan, Tool } from '../api-models';

export interface PlanTool {
    __typename: 'PlanTool';
    id: string;
    tool: Tool | null;
    plan: Plan | null;
}
