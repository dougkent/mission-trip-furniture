import { SearchState } from '../states';

export interface SearchProps {
    searchState: SearchState;

    onSearch: (searchState: SearchState) => void;
}
