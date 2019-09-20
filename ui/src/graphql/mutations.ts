// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createPlan = `mutation CreatePlan($input: CreatePlanInput!) {
  createPlan(input: $input) {
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
      }
      favoritedPlans {
        nextToken
      }
    }
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
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
      }
      favoritedPlans {
        nextToken
      }
    }
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
export const deletePlan = `mutation DeletePlan($input: DeletePlanInput!) {
  deletePlan(input: $input) {
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
      }
      favoritedPlans {
        nextToken
      }
    }
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
export const createFavorite = `mutation CreateFavorite($input: CreateFavoriteInput!) {
  createFavorite(input: $input) {
    id
    plan {
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
    user {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        created
      }
      favoritedPlans {
        nextToken
      }
    }
  }
}
`;
export const deleteFavorite = `mutation DeleteFavorite($input: DeleteFavoriteInput!) {
  deleteFavorite(input: $input) {
    id
    plan {
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
    user {
      id
      username
      createdPlans {
        id
        name
        description
        pdfS3Key
        created
      }
      favoritedPlans {
        nextToken
      }
    }
  }
}
`;
export const createPlanMaterial = `mutation CreatePlanMaterial($input: CreatePlanMaterialInput!) {
  createPlanMaterial(input: $input) {
    id
    material {
      id
      name
    }
    plan {
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
  }
}
`;
export const deletePlanMaterial = `mutation DeletePlanMaterial($input: DeletePlanMaterialInput!) {
  deletePlanMaterial(input: $input) {
    id
    material {
      id
      name
    }
    plan {
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
  }
}
`;
export const createPlanTool = `mutation CreatePlanTool($input: CreatePlanToolInput!) {
  createPlanTool(input: $input) {
    id
    tool {
      id
      name
    }
    plan {
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
  }
}
`;
export const deletePlanTool = `mutation DeletePlanTool($input: DeletePlanToolInput!) {
  deletePlanTool(input: $input) {
    id
    tool {
      id
      name
    }
    plan {
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
  }
}
`;
