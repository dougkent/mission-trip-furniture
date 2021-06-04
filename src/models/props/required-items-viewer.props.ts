import { RequiredItem } from '../required-item.model';

export interface RequiredItemsViewerProps {
    label: string;
    selectorLabel: string;
    requiredItems: RequiredItem[];
    selectedItems: RequiredItem[];
    editing: boolean;
    onChange?: (requiredItems: RequiredItem[]) => void;
}
