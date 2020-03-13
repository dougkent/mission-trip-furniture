import { AppState, FilterState, SearchState } from '.';

export interface PlanListState extends AppState {
    filterState: FilterState;
    searchState: SearchState;
}
