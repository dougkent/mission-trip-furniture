// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreatePlan = `subscription OnCreatePlan {
  onCreatePlan {
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
export const onUpdatePlan = `subscription OnUpdatePlan {
  onUpdatePlan {
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
export const onDeletePlan = `subscription OnDeletePlan {
  onDeletePlan {
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
