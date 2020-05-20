import {
    SearchablePlanSortableFieldsEnum,
    SearchableSortDirectionEnum,
} from '.';

export interface SearchablePlanSortInput {
    field: SearchablePlanSortableFieldsEnum;
    direction: SearchableSortDirectionEnum;
}
