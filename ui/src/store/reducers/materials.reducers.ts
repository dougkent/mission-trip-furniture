import { MaterialsState } from '../../models/materials-state.model';
import {
    MaterialsActions,
    MaterialsActionTypes,
    ListMaterialsResponseAction,
} from '../actions/materials.types';

const initialState: MaterialsState = {
    isLoading: false,
    materials: [],
};

export function materialsReducer(
    state = initialState,
    action: MaterialsActions
): MaterialsState {
    switch (action.type) {
        case MaterialsActionTypes.LIST_MATERIALS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case MaterialsActionTypes.LIST_MATERIALS_RESPONSE:
            const listAction = action as ListMaterialsResponseAction;
            return {
                ...state,
                isLoading: false,
                materials: listAction.payload,
            };
        default:
            return state;
    }
}

export const listMaterials = (state: MaterialsState) => state.materials;
export const listMaterialsIsLoading = (state: MaterialsState) =>
    state.isLoading;
