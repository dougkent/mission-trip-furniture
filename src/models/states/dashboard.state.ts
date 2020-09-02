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
    downloadedPlans: Plan[];
    downloadedPlansNextToken: string;
    downloadedPlansLoading: boolean;
}

export enum DashboardTabsEnum {
    CREATED_PLANS,
    FAVORITED_PLANS,
    DOWNLOADED_PLANS,
    ACCOUNT_MANAGEMENT,
}
