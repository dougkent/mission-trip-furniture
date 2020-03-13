import { Favorite } from '.';

export interface ModelFavoriteConnection {
    __typename: 'ModelFavoriteConnection';
    items: Array<Favorite> | null;
    nextToken: string | null;
}
