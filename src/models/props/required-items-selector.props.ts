import { Material } from '../api-models';
import { RequiredItem } from '../required-item.model';

export interface RequiredItemsSelectorProps {
    label: string;
    loading: boolean;
    selectedItems: RequiredItem[] | null;
    numSelectedItemsToRender: number;
    requiredItems: RequiredItem[] | null;
    onSelect: (requiredItems: RequiredItem[]) => void;
}
