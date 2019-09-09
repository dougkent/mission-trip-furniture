// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    username
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePlan = `subscription OnCreatePlan {
  onCreatePlan {
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
export const onUpdatePlan = `subscription OnUpdatePlan {
  onUpdatePlan {
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
export const onDeletePlan = `subscription OnDeletePlan {
  onDeletePlan {
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
