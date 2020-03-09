import { AppState, FilterState } from '.';

export interface PlanListState extends AppState {
    filterState: FilterState;
}
