// tslint:disable
// this is an auto generated file. This will be overwritten

export const createTool = `mutation CreateTool($input: CreateToolInput!) {
  createTool(input: $input) {
    id
    name
  }
}
`;
export const updateTool = `mutation UpdateTool($input: UpdateToolInput!) {
  updateTool(input: $input) {
    id
    name
  }
}
`;
export const deleteTool = `mutation DeleteTool($input: DeleteToolInput!) {
  deleteTool(input: $input) {
    id
    name
  }
}
`;
export const createMaterial = `mutation CreateMaterial($input: CreateMaterialInput!) {
  createMaterial(input: $input) {
    id
    name
  }
}
`;
export const updateMaterial = `mutation UpdateMaterial($input: UpdateMaterialInput!) {
  updateMaterial(input: $input) {
    id
    name
  }
}
`;
export const deleteMaterial = `mutation DeleteMaterial($input: DeleteMaterialInput!) {
  deleteMaterial(input: $input) {
    id
    name
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createUserFavoritedPlan = `mutation CreateUserFavoritedPlan($input: CreateUserFavoritedPlanInput!) {
  createUserFavoritedPlan(input: $input) {
    id
    plan {
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
    user {
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
export const updateUserFavoritedPlan = `mutation UpdateUserFavoritedPlan($input: UpdateUserFavoritedPlanInput!) {
  updateUserFavoritedPlan(input: $input) {
    id
    plan {
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
    user {
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
export const deleteUserFavoritedPlan = `mutation DeleteUserFavoritedPlan($input: DeleteUserFavoritedPlanInput!) {
  deleteUserFavoritedPlan(input: $input) {
    id
    plan {
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
    user {
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
export const createPlan = `mutation CreatePlan($input: CreatePlanInput!) {
  createPlan(input: $input) {
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
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
export const deletePlan = `mutation DeletePlan($input: DeletePlanInput!) {
  deletePlan(input: $input) {
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
