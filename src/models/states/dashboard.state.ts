import { AppState } from '.';
import { Plan } from '../api-models';

export interface DashboardState extends AppState {
    currentTab: DashboardTabsEnum;
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
