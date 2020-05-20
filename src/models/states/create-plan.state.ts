import { Material, Tool, CreatePlanInput } from '../api-models';
import { AppState } from './app.state';

export interface CreatePlanState extends AppState {
    selectedMaterials: Material[];
    selectedTools: Tool[];
    plan: CreatePlanInput;
    pdfFile: File;
    imageFile: File;
    loading: boolean;
    createComplete: boolean;
    errors: string[];
}
