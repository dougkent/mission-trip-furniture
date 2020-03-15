import { Favorite, DeleteFavoriteInput } from '.';

export interface DeleteFavoriteMutation {
    deleteFavorite(input: DeleteFavoriteInput): Favorite;
}
