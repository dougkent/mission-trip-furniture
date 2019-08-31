import { Material } from './material.model';

export interface MaterialsState {
    isLoading: boolean;
    materials: Material[];
}
