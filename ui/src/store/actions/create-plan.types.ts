// MTF
import { Material } from '../../models/material.model';
import { Tool } from '../../models/tool.model';

export enum CreatePlanActionTypes {
    SELECT_MATERIAL = '[Create Plan] select material',
    REMOVE_MATERIAL = '[Create Plan] remove material',
    SELECT_TOOL = '[Create Plan] select tool',
    REMOVE_TOOL = '[Create Plan] remove tool',
}

interface SelectMaterialAction {
    type: typeof CreatePlanActionTypes.SELECT_MATERIAL;
    payload: Material;
}

interface RemoveMaterialAction {
    type: typeof CreatePlanActionTypes.REMOVE_MATERIAL;
    payload: Material;
}

interface SelectToolAction {
    type: typeof CreatePlanActionTypes.SELECT_TOOL;
    payload: Tool;
}

interface RemoveToolAction {
    type: typeof CreatePlanActionTypes.REMOVE_TOOL;
    payload: Tool;
}

export type CreatePlanActions =
    | SelectMaterialAction
    | RemoveMaterialAction
    | SelectToolAction
    | RemoveToolAction;
