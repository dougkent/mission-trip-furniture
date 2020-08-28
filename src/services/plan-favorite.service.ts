// AWS
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import {
    CreateFavoriteInput,
    CreateFavoriteMutation,
    DeleteFavoriteInput,
    ModelIdKeyConditionInput,
    GetFavoriteByPlanIdQuery,
} from '../models/api-models';
import * as graphQLQueries from '../graphql/queries';
import * as graphQLMutations from '../graphql/mutations';

export class PlanFavoriteService {
    createFavorite = async (
        planId: string,
        userId: string
    ): Promise<string> => {
        const createFavoriteInput: CreateFavoriteInput = {
            id: uuid(),
            planId: planId,
            userId: userId,
        };

        const result = (await API.graphql(
            graphqlOperation(graphQLMutations.createFavoriteMutation, {
                input: createFavoriteInput,
            })
        )) as GraphQLResult<CreateFavoriteMutation>;

        return result.data.createFavorite.id;
    };

    deleteFavoriteById = async (favoriteId: string) => {
        const deleteFavoriteInput: DeleteFavoriteInput = {
            id: favoriteId,
        };

        await API.graphql(
            graphqlOperation(graphQLMutations.deleteFavoriteMutation, {
                input: deleteFavoriteInput,
            })
        );
    };

    deleteFavorite = async (planId: string, userId: string) => {
        const favoriteResult = await this.getFavoriteByPlandIdAndUserId(
            planId,
            userId
        );

        const { getFavoriteByPlanId } = favoriteResult.data;

        if (getFavoriteByPlanId?.items?.length) {
            getFavoriteByPlanId.items.forEach(async (favorite) => {
                await this.deleteFavoriteById(favorite.id);
            });
        }
    };

    private getFavoriteByPlandIdAndUserId = async (
        planId: string,
        userId: string
    ): Promise<GraphQLResult<GetFavoriteByPlanIdQuery>> => {
        const getFavoriteInput: ModelIdKeyConditionInput = {
            eq: userId,
        };

        var favoriteResult = (await API.graphql(
            graphqlOperation(graphQLQueries.getFavoriteByPlanAndUserQuery, {
                planId: planId,
                userId: getFavoriteInput,
            })
        )) as GraphQLResult<GetFavoriteByPlanIdQuery>;

        return favoriteResult;
    };
}
