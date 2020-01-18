import { PlanTool } from '.';

export interface ModelPlanToolConnection {
    __typename: 'ModelPlanToolConnection';
    items: Array<PlanTool> | null;
    nextToken: string | null;
}
