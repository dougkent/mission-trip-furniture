import { BaseState } from '.';
import { Material, Tool } from '../api-models';

export interface AppState extends BaseState {
    userId: string;
    materials: Material[];
    tools: Tool[];
}
