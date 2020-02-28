import {
    CreatePlanMaterialInput,
    CreatePlanToolInput,
    CreatePlanInput,
} from '../api-models';
import { AppState } from './app.state';

export interface CreatePlanState extends AppState {
    planMaterials: CreatePlanMaterialInput[];
    planTools: CreatePlanToolInput[];
    plan: CreatePlanInput;
    pdfFile: File;
    imageFile: File;
    loading: boolean;
    createComplete: boolean;
}