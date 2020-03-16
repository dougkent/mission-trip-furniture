// AWS
import { API, graphqlOperation } from 'aws-amplify';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import {
    CreateFavoriteInput,
    GqlQuery,
    CreateFavoriteMutation,
    DeleteFavoriteInput,
    ModelIdKeyConditionInput,
    GetFavoriteByPlanIdQuery,
    Plan,
} from '../models/api-models';

export class PlanFavoriteService {
    private createFavoriteMutation = `mutation CreateFavorite($input: CreateFavoriteInput!) {
        createFavorite(input: $input) {
            id
        }
    }`;

    private getFavorite = `query GetFavoriteByPlanIdAndUserId($planId: ID!, $userId: ModelIDKeyConditionInput!) {
        getFavoriteByPlanId (planId: $planId, userId: $userId) {
            items {
                id
            }
        }
    }`;

    private deleteFavoriteMutation = `mutation DeleteFavorite($input: DeleteFavoriteInput!) {
        deleteFavorite(input: $input) {
            id
        }
    }`;

    createFavorite = async (
        planId: string,
        userId: string
    ): Promise<string> => {
        const createFavoriteInput: CreateFavoriteInput = {
            id: uuid(),
            planId: planId,
            userId: userId,
        };

        const result: GqlQuery<CreateFavoriteMutation> = await API.graphql(
            graphqlOperation(this.createFavoriteMutation, {
                input: createFavoriteInput,
            })
        );

        return result.data.createFavorite.id;
    };

    deleteFavoriteById = async (favoriteId: string) => {
        const deleteFavoriteInput: DeleteFavoriteInput = {
            id: favoriteId,
        };

        await API.graphql(
            graphqlOperation(this.deleteFavoriteMutation, {
                input: deleteFavoriteInput,
            })
        );
    };

    deleteFavorite = async (planId: string, userId: string) => {
        const getFavoriteInput: ModelIdKeyConditionInput = {
            eq: userId,
        };

        var favoriteResult: GqlQuery<GetFavoriteByPlanIdQuery> = await API.graphql(
            graphqlOperation(this.getFavorite, {
                planId: planId,
                userId: getFavoriteInput,
            })
        );

        const { getFavoriteByPlanId } = favoriteResult.data;

        if (
            getFavoriteByPlanId &&
            getFavoriteByPlanId.items &&
            getFavoriteByPlanId.items.length
        ) {
            getFavoriteByPlanId.items.forEach(async favorite => {
                await this.deleteFavoriteById(favorite.id);
            });
        }
    };

    isFavoritedByUser = (userId: string, plan: Plan): boolean => {
        return plan.favoritedBy.items.some(
            favoritedBy => favoritedBy.userId === userId
        );
    };
}
