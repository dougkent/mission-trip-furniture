import { planFields } from './queries';

// mutations
export const createDownloadMutation = `mutation CreateDownload($input: CreateDownloadInput!) {
    createDownload(input: $input) {
        id
    }
}`;

export const createFavoriteMutation = `mutation CreateFavorite($input: CreateFavoriteInput!) {
    createFavorite(input: $input) {
        id
    }
}`;

export const createPlanMutation = `mutation CreatePlan($input: CreatePlanInput!) {
    createPlan(input: $input) {
        id
    }
}`;

export const createUserMutation = `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
    }
}`;

export const deleteDownloadMutation = `mutation DeleteDownload($input: DeleteDownloadInput!) {
    deleteDownload(input: $input) {
        id
    }
}`;

export const deleteFavoriteMutation = `mutation DeleteFavorite($input: DeleteFavoriteInput!) {
    deleteFavorite(input: $input) {
        id
    }
}`;

export const deletePlanMutation = `mutation DeletePlan($input: DeletePlanInput!) {
    deletePlan(input: $input) {
        id
    }
}`;

export const updatePlanMutation = `mutation UpdatePlan($input: UpdatePlanInput!) {
    updatePlan(input: $input) {
        ${planFields}
    }
}`;
