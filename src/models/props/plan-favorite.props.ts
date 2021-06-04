export interface PlanFavoriteProps {
    planId: string;
    disabled: boolean;
    isFavoritedByUser: boolean;
    favoritedCount: number;
    onToggleFavorite: (toggleFavOn: boolean) => void;
}
