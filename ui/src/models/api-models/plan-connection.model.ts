import { Plan } from '.';

export interface ModelPlanConnection {
    __typename: 'ModelPlanConnection';
    items: Array<Plan> | null;
    nextToken: string | null;
}
