// MTF
import { Material } from '../../models/material.model';
import { MaterialActions, MaterialsActionTypes } from './materials.actions';

export function listMaterialsRequest(): MaterialsActions {
    return {
        type: MaterialsActionTypes.LIST_MATERIALS_REQUEST,
    };
}

export function listMaterialsResponse(materials: Material[]): MaterialsActions {
    return {
        type: MaterialsActionTypes.LIST_MATERIALS_RESPONSE,
        payload: materials,
    };
}
