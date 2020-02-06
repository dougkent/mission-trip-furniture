import { Material } from '../api-models';

export interface MaterialSelectorProps {
    loading: boolean;
    materials: Material[] | null;
    onSelect(materials: Material[]): void;
}
