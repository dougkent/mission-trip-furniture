import { Material, Tool } from '../api-models';
import { FilterState } from '../states';

export interface FilterProps {
    materials: Material[];
    tools: Tool[];
    filterState: FilterState;
    onApply(filterState: FilterState): void;
}
