import { Plan } from '../api-models';

export interface PlanGridProps {
    plans: Plan[];
    userId: string;
    nextToken: string;
    totalCount?: number | null;
    loading: boolean;
    emptyText: string;
    gridItemClassName: string;
    onNextPage(nextToken: string): void;
    isFavoritedByUser(plan: Plan): boolean;
    onTogglePlanFavorite(planId: string, toggleFavOn: boolean): void;
}
