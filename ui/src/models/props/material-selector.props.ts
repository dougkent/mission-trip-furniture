import { Material } from '../material.model';

export interface MaterialSelectorProps {
    loading: boolean;
    materials: Material[] | null;
    onSelect(materials: Material[]): void;
}
