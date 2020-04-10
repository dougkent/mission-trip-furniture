const planFields = `
        id
        name
        description
        pdfS3Key
        imageS3Info {
            key   
        }
        created
        createdBy {
            id
            username
        }
        favoritedCount
        downloadedCount
        requiredMaterialIds
        requiredToolIds`;

//queries
export const getFavoriteByPlanAndUserQuery = `query GetFavoriteByPlanAndUser($planId: ID!, $userId: ModelIDKeyConditionInput!) {
    getFavoriteByPlanId (planId: $planId, userId: $userId) {
        items {
            id
        }
    }
}`;

export const getFavoritesByUserQuery = `query GetFavoritesByUser($userId: ID!) {
    getFavoriteByUserId(userId: $userId, limit: 999) {
        items {
            planId
        }
    }
}`;

export const getPlanIdQuery = `query GetPlan($id: ID!) {
    getPlan(id: $id){
        id
    }
}`;

export const getPlanQuery = `query GetPlan($id: ID!) {
    getPlan(id: $id) {
        ${planFields}
    }
}`;

export const getUserIdQuery = `query GetUser($id: ID!) {
    getUser(id: $id) {
        id
    }
}`;

export const getUserQuery = `query GetUser($id: ID! $limit: Int!, $nextToken: String) {
    getUser(id: $id) {
        createdPlans(limit: $limit, nextToken: $nextToken) {
            nextToken
            items {
                ${planFields}
            }
        }
    }
}`;

export const listDownloadsByUserQuery = `query GetDownloadsByUser($userId: ID!, $limit: Int!, $nextToken: String) {
    getDownloadedByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
        nextToken
        items {
            planId
        }
    }
}`;

export const listFavoritesByUserQuery = `query GetFavoritesByUser($userId: ID!, $limit: Int!, $nextToken: String) {
    getFavoriteByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
        nextToken
        items {
            planId
        }
    }
}`;

export const listMaterialsQuery: string = `query ListMaterials {
    listMaterials(limit: 999) {
        items {
            id
            name
        }
    }
}`;

export const listToolsQuery: string = `query ListTools {
    listTools(limit: 999) {
        items {
            id
            name
        }
    }
}`;

export const searchPlansQuery = `query SearchPlans($limit: Int!, $filter: SearchablePlanFilterInput, $sort: SearchablePlanSortInput, $nextToken: String) {
    searchPlans(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
        nextToken
        total
        items {
            ${planFields}
        }
    }
}`;

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
