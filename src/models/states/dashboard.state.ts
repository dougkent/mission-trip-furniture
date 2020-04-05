import { AppState } from '.';
import { Plan, Material, Tool } from '../api-models';

export interface DashboardState extends AppState {
    currentTab: DashboardTabsEnum;
    materials: Material[];
    tools: Tool[];
    createdPlans: Plan[];
    createdPlansNextToken: string;
    createdPlansLoading: boolean;
    favoritedPlans: Plan[];
    favoritedPlansNextToken: string;
    favoritedPlansLoading: boolean;
}

export enum DashboardTabsEnum {
    CREATED_PLANS,
    FAVORITED_PLANS,
}
