// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateTool = `subscription OnCreateTool {
  onCreateTool {
    id
    name
  }
}
`;
export const onUpdateTool = `subscription OnUpdateTool {
  onUpdateTool {
    id
    name
  }
}
`;
export const onDeleteTool = `subscription OnDeleteTool {
  onDeleteTool {
    id
    name
  }
}
`;
export const onCreateMaterial = `subscription OnCreateMaterial {
  onCreateMaterial {
    id
    name
  }
}
`;
export const onUpdateMaterial = `subscription OnUpdateMaterial {
  onUpdateMaterial {
    id
    name
  }
}
`;
export const onDeleteMaterial = `subscription OnDeleteMaterial {
  onDeleteMaterial {
    id
    name
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateUserFavoritedPlan = `subscription OnCreateUserFavoritedPlan {
  onCreateUserFavoritedPlan {
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
export const onUpdateUserFavoritedPlan = `subscription OnUpdateUserFavoritedPlan {
  onUpdateUserFavoritedPlan {
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
export const onDeleteUserFavoritedPlan = `subscription OnDeleteUserFavoritedPlan {
  onDeleteUserFavoritedPlan {
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
