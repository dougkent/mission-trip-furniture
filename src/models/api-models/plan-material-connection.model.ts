import { PlanMaterial } from '../api-models';

export interface ModelPlanMaterialConnection {
    __typename: 'ModelPlanMaterialConnection';
    items: Array<PlanMaterial> | null;
    nextToken: string | null;
}
