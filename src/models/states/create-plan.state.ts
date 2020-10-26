import { Material, Tool, CreatePlanInput } from '../api-models';
import { AppState } from './app.state';
import { ImageModel } from '../image-model';

export interface CreatePlanState extends AppState {
    selectedMaterials: Material[];
    selectedTools: Tool[];
    plan: CreatePlanInput;
    pdfFile: File;
    imageFiles: ImageModel[];
    loading: boolean;
    createComplete: boolean;
    errors: string[];
}
