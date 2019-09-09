// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    username
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
      width
      heigth
    }
    pdfS3Key
    toolsRequired {
      id
      name
    }
    materialsRequired {
      id
      name
    }
    favoritedBy {
      username
    }
    created
    createdBy {
      username
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
      width
      heigth
    }
    pdfS3Key
    toolsRequired {
      id
      name
    }
    materialsRequired {
      id
      name
    }
    favoritedBy {
      username
    }
    created
    createdBy {
      username
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
      width
      heigth
    }
    pdfS3Key
    toolsRequired {
      id
      name
    }
    materialsRequired {
      id
      name
    }
    favoritedBy {
      username
    }
    created
    createdBy {
      username
    }
  }
}
`;
