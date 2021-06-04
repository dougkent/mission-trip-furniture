import { AppState } from './app.state';
import { Plan, Download } from '../api-models';

export interface ViewPlanState extends AppState {
    planId: string;
    plan: Plan;
    planDownload: Download | null;
    downloadUrl: string;
    loading: boolean;
    planMenuAnchor: HTMLElement | null;
    editing: boolean;
    saving: boolean;
    deleteDialogOpen: boolean;
    deleteComplete: boolean;
    errors: string[];
}
