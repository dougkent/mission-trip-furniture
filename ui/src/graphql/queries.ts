// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    createdPlans {
      id
      name
      description
      pdfS3Key
      imageS3Info {
        key
        width
        height
      }
      created
      createdBy {
        id
        username
      }
      favoritedCount
      favoritedBy {
        nextToken
      }
      materialsRequired {
        nextToken
      }
      toolsRequired {
        nextToken
      }
    }
    favoritedPlans {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        created
        favoritedCount
      }
      favoritedPlans {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPlan = `query GetPlan($id: ID!) {
  getPlan(id: $id) {
    id
    name
    description
    pdfS3Key
    imageS3Info {
      key
      width
      height
    }
    created
    createdBy {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        created
        favoritedCount
      }
      favoritedPlans {
        nextToken
      }
    }
    favoritedCount
    favoritedBy {
      items {
        id
      }
      nextToken
    }
    materialsRequired {
      items {
        id
      }
      nextToken
    }
    toolsRequired {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listPlans = `query ListPlans(
  $filter: ModelPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      pdfS3Key
      imageS3Info {
        key
        width
        height
      }
      created
      createdBy {
        id
        username
      }
      favoritedCount
      favoritedBy {
        nextToken
      }
      materialsRequired {
        nextToken
      }
      toolsRequired {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const listMaterials = `query ListMaterials(
  $filter: ModelMaterialFilterInput
  $limit: Int
  $nextToken: String
) {
  listMaterials(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
export const listTools = `query ListTools(
  $filter: ModelToolFilterInput
  $limit: Int
  $nextToken: String
) {
  listTools(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
export const getUserByUsername = `query GetUserByUsername(
  $username: String
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserByUsername(
    username: $username
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        created
        favoritedCount
      }
      favoritedPlans {
        nextToken
      }
    }
    nextToken
  }
}
`;
