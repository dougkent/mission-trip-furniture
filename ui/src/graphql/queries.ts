// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTool = `query GetTool($id: ID!) {
  getTool(id: $id) {
    id
    name
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
export const getMaterial = `query GetMaterial($id: ID!) {
  getMaterial(id: $id) {
    id
    name
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
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
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
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
      items {
        id
        name
      }
      nextToken
    }
    materialsRequired {
      items {
        id
        name
      }
      nextToken
    }
    favoritedBy {
      items {
        id
      }
      nextToken
    }
    created
    createdBy {
      id
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
        nextToken
      }
      materialsRequired {
        nextToken
      }
      favoritedBy {
        nextToken
      }
      created
      createdBy {
        id
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
        nextToken
      }
      materialsRequired {
        nextToken
      }
      favoritedBy {
        nextToken
      }
      created
      createdBy {
        id
        username
      }
    }
    nextToken
  }
}
`;
