import { Material, Tool } from '../api-models';

export interface PlanDetailsState {
    editing: boolean;
    saving: boolean;
    description: string;
    newDescription: string;
    allMaterials: Material[];
    requiredMaterials: Material[];
    newRequiredMaterials: Material[];
    allTools: Tool[];
    requiredTools: Tool[];
    newRequiredTools: Tool[];
}
