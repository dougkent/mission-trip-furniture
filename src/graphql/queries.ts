export const planFields = `
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
export const getDownloadByPlanQuery = `query GetDownloadByPlanAndUser($planId: ID!, $nextToken: String) {
    getDownloadByPlanId (planId: $planId, nextToken: $nextToken) {
        nextToken
        items {
            id
        }
    }
}`;

export const getFavoriteByPlanAndUserQuery = `query GetFavoriteByPlanAndUser($planId: ID!, $userId: ModelIDKeyConditionInput!) {
    getFavoriteByPlanId (planId: $planId, userId: $userId) {
        items {
            id
        }
    }
}`;

export const getFavoriteByPlanQuery = `query GetFavoriteByPlanAndUser($planId: ID!, $nextToken: String) {
    getFavoriteByPlanId (planId: $planId, nextToken: $nextToken) {
        nextToken
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
