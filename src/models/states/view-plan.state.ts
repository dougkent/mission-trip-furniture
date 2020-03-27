import { AppState } from './app.state';
import { Plan } from '../api-models';

export interface ViewPlanState extends AppState {
    planId: string;
    plan: Plan;
    downloadUrl: string;
    loading: boolean;
    planMenuAnchor: HTMLElement | null;
    editing: boolean;
    saving: boolean;
    deleteDialogOpen: boolean;
    deleteComplete: boolean;
    error: string;
}
