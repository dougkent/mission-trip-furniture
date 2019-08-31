// MTF
import { CreatePlanState } from '../../models/create-plan-state.model';
import { CreatePlanActionTypes, CreatePlanActions } from '../actions';

const initialState: CreatePlanState = {
    materials: [],
    plan: {
        id: '',
        name: '',
        description: '',
        materials: [],
        tools: [],
        created: new Date(),
        createdBy: '',
    },
};

export function createPlanReducer(
    state = initialState,
    action: CreatePlanActions
): CreatePlanState {
    switch (action.type) {
        case CreatePlanActionTypes.SELECT_MATERIAL:
            return {
                ...state,
                materials: [...state.materials, action.payload],
            };
        case CreatePlanActionTypes.REMOVE_MATERIAL:
            return {
                ...state,
                materials: state.materials.filter(
                    material => material.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
}
