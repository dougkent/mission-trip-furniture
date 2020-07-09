import { Material } from '../api-models';
import { RequiredItem } from '../required-item.model';

export interface RequiredItemsViewerProps {
    requiredItems: RequiredItem[];
    saving: boolean;
    editing: boolean;
    onChange?: () => void;
}
