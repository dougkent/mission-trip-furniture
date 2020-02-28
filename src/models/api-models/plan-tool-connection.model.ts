import { PlanTool } from '../api-models';

export interface ModelPlanToolConnection {
    __typename: 'ModelPlanToolConnection';
    items: Array<PlanTool> | null;
    nextToken: string | null;
}
