import { PlanMaterial } from '.';

export interface ModelPlanMaterialConnection {
    __typename: 'ModelPlanMaterialConnection';
    items: Array<PlanMaterial> | null;
    nextToken: string | null;
}
