import {
    CreateFavoriteInput,
    GqlQuery,
    CreateFavoriteMutation,
} from '../models/api-models';
import { API, graphqlOperation } from 'aws-amplify';

export class PlanFavoriteService {
    private _favoriteMutation = `mutation CreateFavorite($input: CreateFavoriteInput!) {
        createFavorite: {
            id
        }
    }`;

    createFavorite(createFavoriteInput: CreateFavoriteInput): string {
        var createFavoriteResult: GqlQuery<CreateFavoriteMutation> = API.graphql(
            graphqlOperation(this._favoriteMutation, {
                input: createFavoriteInput,
            })
        );

        const { createFavorite } = createFavoriteResult.data;

        return createFavorite.id;
    }
}
