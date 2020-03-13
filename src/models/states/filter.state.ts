import { Material, Tool } from '../api-models';

export interface FilterState {
    filterMaterials: Material[];
    filterTools: Tool[];
    filterFavoritedByUser: boolean;
    filterDownloadedByUser: boolean;
    filterCreatedByUser: boolean;
    filterCreatedRangeStart: Date | null;
    filterCreatedRangeEnd: Date | null;
}
