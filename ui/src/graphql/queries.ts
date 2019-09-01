// tslint:disable
// this is an auto generated file. This will be overwritten

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
export const getUser = `query GetUser($username: String!) {
  getUser(username: $username) {
    username
    favoritedPlans {
      items {
        id
      }
      nextToken
    }
    createdPlans {
      items {
        id
        name
        description
        created
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $username: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    username: $username
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      username
      favoritedPlans {
        nextToken
      }
      createdPlans {
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
    imageS3Info {
      key
      widht
      height
    }
    pdfS3Info {
      key
      widht
      height
    }
    toolsRequired {
      id
      name
    }
    materialsRequired {
      id
      name
    }
    favoritedBy {
      items {
        id
      }
      nextToken
    }
    created
    createdBy {
      username
      favoritedPlans {
        nextToken
      }
      createdPlans {
        nextToken
      }
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
      imageS3Info {
        key
        widht
        height
      }
      pdfS3Info {
        key
        widht
        height
      }
      toolsRequired {
        id
        name
      }
      materialsRequired {
        id
        name
      }
      favoritedBy {
        nextToken
      }
      created
      createdBy {
        username
      }
    }
    nextToken
  }
}
`;
export const searchPlans = `query SearchPlans(
  $filter: SearchablePlanFilterInput
  $sort: SearchablePlanSortInput
  $limit: Int
  $nextToken: String
) {
  searchPlans(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      description
      imageS3Info {
        key
        widht
        height
      }
      pdfS3Info {
        key
        widht
        height
      }
      toolsRequired {
        id
        name
      }
      materialsRequired {
        id
        name
      }
      favoritedBy {
        nextToken
      }
      created
      createdBy {
        username
      }
    }
    nextToken
  }
}
`;
