import { AppState, FilterState, SearchState } from '.';
import { Plan } from '../api-models';

export interface PlanListState extends AppState {
    filterState: FilterState;
    searchState: SearchState;
    plans: Plan[];
    nextToken: string;
    loading: boolean;
}
