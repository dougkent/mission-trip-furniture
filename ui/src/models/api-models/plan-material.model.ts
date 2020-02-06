import { Material, Plan } from '.';

export interface PlanMaterial {
    __typename: 'PlanMaterial';
    id: string;
    material: Material | null;
    plan: Plan | null;
}
