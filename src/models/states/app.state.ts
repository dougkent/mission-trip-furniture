import { BaseState } from '.';
import { Material, Tool } from '../api-models';

export interface AppState extends BaseState {
    userId: string;
    name?: string;
    materials: Material[];
    tools: Tool[];
    userFavoritedPlanIds: string[];
}
