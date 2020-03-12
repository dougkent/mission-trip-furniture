import { Material } from '../api-models';

export interface MaterialSelectorProps {
    label: string;
    loading: boolean;
    selectedMaterials: Material[] | null;
    materials: Material[] | null;
    onSelect(materials: Material[]): void;
}
