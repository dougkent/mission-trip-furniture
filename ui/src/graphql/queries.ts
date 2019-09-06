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
        username
      }
    }
    nextToken
  }
}
`;
