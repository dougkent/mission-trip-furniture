import { Material, Tool } from '../api-models';

export interface FilterState {
    filterMaterials: Material[];
    filterTools: Tool[];
    filterCreatedAfter: Date | null;
}
