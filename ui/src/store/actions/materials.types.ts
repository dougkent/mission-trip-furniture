import { Material } from '../../models/material.model';

export enum MaterialsActionTypes {
    LIST_MATERIALS_REQUEST = '[Materials] list materials request',
    LIST_MATERIALS_RESPONSE = '[Materials] list materials response',
}

export interface ListMaterialsRequestAction {
    type: typeof MaterialsActionTypes.LIST_MATERIALS_REQUEST;
    payload: any;
}

export interface ListMaterialsResponseAction {
    type: typeof MaterialsActionTypes.LIST_MATERIALS_RESPONSE;
    payload: Material[];
}

export type MaterialsActions =
    | ListMaterialsRequestAction
    | ListMaterialsResponseAction;
