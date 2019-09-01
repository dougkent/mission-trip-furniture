// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
