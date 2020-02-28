import { Favorite } from '../api-models';

export interface ModelFavoriteConnection {
    __typename: 'ModelFavoriteConnection';
    items: Array<Favorite> | null;
    nextToken: string | null;
}
