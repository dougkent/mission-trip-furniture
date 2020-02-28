import { Material, Plan } from '../api-models';

export interface PlanMaterial {
    __typename: 'PlanMaterial';
    id: string;
    material: Material | null;
    plan: Plan | null;
}
