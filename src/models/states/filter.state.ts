import {
    Material,
    Tool,
    SearchablePlanSortableFieldsEnum,
    SearchableSortDirectionEnum,
} from '../api-models';

export interface FilterState {
    filterMaterials: Material[];
    filterTools: Tool[];
    filterCreatedAfter: Date | null;
    sortProperty: SearchablePlanSortableFieldsEnum;
    sortDirection: SearchableSortDirectionEnum;
}
