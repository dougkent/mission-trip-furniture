import { AppState, FilterState, SearchState } from '.';
import { ListPlansQuery } from '../api-models';

export interface PlanListState extends AppState {
    filterState: FilterState;
    searchState: SearchState;
    planList: ListPlansQuery;
    loading: boolean;
}
