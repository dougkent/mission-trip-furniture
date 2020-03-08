import { Material } from '../api-models';

export interface MaterialSelectorProps {
    label: string;
    loading: boolean;
    materials: Material[] | null;
    onSelect(materials: Material[]): void;
}
