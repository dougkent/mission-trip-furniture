import {
    CreatePlanMaterialInput,
    CreatePlanToolInput,
    CreatePlanInput,
} from '../api.models';

export interface CreatePlanState {
    planMaterials: CreatePlanMaterialInput[];
    planTools: CreatePlanToolInput[];
    plan: CreatePlanInput;
    pdfFile: File;
    imageFile: File;
    loading: boolean;
}
