// MTF
import { Material } from '../../models/material.model';
import { CreatePlanActionTypes, CreatePlanActions } from './create-plan.types';

export function selectMaterial(selectedMaterial: Material): CreatePlanActions {
    return {
        type: CreatePlanActionTypes.SELECT_MATERIAL,
        payload: selectedMaterial,
    };
}

export function removeMaterial(selectedMaterial: Material): CreatePlanActions {
    return {
        type: CreatePlanActionTypes.REMOVE_MATERIAL,
        payload: selectedMaterial,
    };
}
