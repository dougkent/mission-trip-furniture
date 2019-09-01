// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePlan = `subscription OnCreatePlan {
  onCreatePlan {
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
export const onUpdatePlan = `subscription OnUpdatePlan {
  onUpdatePlan {
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
export const onDeletePlan = `subscription OnDeletePlan {
  onDeletePlan {
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
