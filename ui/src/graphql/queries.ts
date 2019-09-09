// tslint:disable
// this is an auto generated file. This will be overwritten

export const listTools = `query ListTools {
  listTools {
    id
    name
  }
}
`;
export const listMaterials = `query ListMaterials {
  listMaterials {
    id
    name
  }
}
`;
export const getUser = `query GetUser($username: String!) {
  getUser(username: $username) {
    username
    favoritedPlans {
      id
      name
      description
      created
    }
    createdPlans {
      id
      name
      description
      created
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
export const listPlans = `query ListPlans {
  listPlans {
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
