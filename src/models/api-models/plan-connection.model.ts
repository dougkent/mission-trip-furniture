import { Plan } from '../api-models';

export interface ModelPlanConnection {
    __typename: 'ModelPlanConnection';
    items: Array<Plan> | null;
    nextToken: string | null;
}
