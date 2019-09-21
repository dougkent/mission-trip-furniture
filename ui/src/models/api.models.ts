/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreatePlanInput = {
  id?: string | null,
  name: string,
  description: string,
  pdfS3Key: string,
  imageS3Info: S3ImageInfoInput,
  created: string,
  planCreatedById: string,
};

export type S3ImageInfoInput = {
  key: string,
  width: number,
  height: number,
};

export type UpdatePlanInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  pdfS3Key?: string | null,
  imageS3Info?: S3ImageInfoInput | null,
  created?: string | null,
  planCreatedById?: string | null,
};

export type DeletePlanInput = {
  id?: string | null,
};

export type CreateFavoriteInput = {
  id?: string | null,
  favoritePlanId: string,
  favoriteUserId: string,
};

export type DeleteFavoriteInput = {
  id?: string | null,
};

export type CreatePlanMaterialInput = {
  id?: string | null,
  planMaterialMaterialId: string,
  planMaterialPlanId: string,
};

export type DeletePlanMaterialInput = {
  id?: string | null,
};

export type CreatePlanToolInput = {
  id?: string | null,
  planToolToolId: string,
  planToolPlanId: string,
};

export type DeletePlanToolInput = {
  id?: string | null,
};

export type ModelPlanFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  pdfS3Key?: ModelStringFilterInput | null,
  created?: ModelStringFilterInput | null,
  and?: Array< ModelPlanFilterInput | null > | null,
  or?: Array< ModelPlanFilterInput | null > | null,
  not?: ModelPlanFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelMaterialFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelMaterialFilterInput | null > | null,
  or?: Array< ModelMaterialFilterInput | null > | null,
  not?: ModelMaterialFilterInput | null,
};

export type ModelToolFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelToolFilterInput | null > | null,
  or?: Array< ModelToolFilterInput | null > | null,
  not?: ModelToolFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    username: string,
    createdPlans:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    } > | null,
    favoritedPlans:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    username: string,
    createdPlans:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    } > | null,
    favoritedPlans:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    username: string,
    createdPlans:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    } > | null,
    favoritedPlans:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePlanMutationVariables = {
  input: CreatePlanInput,
};

export type CreatePlanMutation = {
  createPlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdatePlanMutationVariables = {
  input: UpdatePlanInput,
};

export type UpdatePlanMutation = {
  updatePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeletePlanMutationVariables = {
  input: DeletePlanInput,
};

export type DeletePlanMutation = {
  deletePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateFavoriteMutationVariables = {
  input: CreateFavoriteInput,
};

export type CreateFavoriteMutation = {
  createFavorite:  {
    __typename: "Favorite",
    id: string,
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteFavoriteMutationVariables = {
  input: DeleteFavoriteInput,
};

export type DeleteFavoriteMutation = {
  deleteFavorite:  {
    __typename: "Favorite",
    id: string,
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreatePlanMaterialMutationVariables = {
  input: CreatePlanMaterialInput,
};

export type CreatePlanMaterialMutation = {
  createPlanMaterial:  {
    __typename: "PlanMaterial",
    id: string,
    material:  {
      __typename: "Material",
      id: string,
      name: string,
    },
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeletePlanMaterialMutationVariables = {
  input: DeletePlanMaterialInput,
};

export type DeletePlanMaterialMutation = {
  deletePlanMaterial:  {
    __typename: "PlanMaterial",
    id: string,
    material:  {
      __typename: "Material",
      id: string,
      name: string,
    },
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreatePlanToolMutationVariables = {
  input: CreatePlanToolInput,
};

export type CreatePlanToolMutation = {
  createPlanTool:  {
    __typename: "PlanTool",
    id: string,
    tool:  {
      __typename: "Tool",
      id: string,
      name: string,
    },
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeletePlanToolMutationVariables = {
  input: DeletePlanToolInput,
};

export type DeletePlanToolMutation = {
  deletePlanTool:  {
    __typename: "PlanTool",
    id: string,
    tool:  {
      __typename: "Tool",
      id: string,
      name: string,
    },
    plan:  {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    username: string,
    createdPlans:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    } > | null,
    favoritedPlans:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetPlanQueryVariables = {
  id: string,
};

export type GetPlanQuery = {
  getPlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListPlansQueryVariables = {
  filter?: ModelPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlansQuery = {
  listPlans:  {
    __typename: "ModelPlanConnection",
    items:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      pdfS3Key: string,
      imageS3Info:  {
        __typename: "S3ImageInfo",
        key: string,
        width: number,
        height: number,
      },
      created: string,
      createdBy:  {
        __typename: "User",
        id: string,
        username: string,
      },
      favoritedBy:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
      materialsRequired:  {
        __typename: "ModelPlanMaterialConnection",
        nextToken: string | null,
      } | null,
      toolsRequired:  {
        __typename: "ModelPlanToolConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListMaterialsQueryVariables = {
  filter?: ModelMaterialFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMaterialsQuery = {
  listMaterials:  {
    __typename: "ModelMaterialConnection",
    items:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListToolsQueryVariables = {
  filter?: ModelToolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListToolsQuery = {
  listTools:  {
    __typename: "ModelToolConnection",
    items:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePlanSubscription = {
  onCreatePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdatePlanSubscription = {
  onUpdatePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeletePlanSubscription = {
  onDeletePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    pdfS3Key: string,
    imageS3Info:  {
      __typename: "S3ImageInfo",
      key: string,
      width: number,
      height: number,
    },
    created: string,
    createdBy:  {
      __typename: "User",
      id: string,
      username: string,
      createdPlans:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        pdfS3Key: string,
        created: string,
      } > | null,
      favoritedPlans:  {
        __typename: "ModelFavoriteConnection",
        nextToken: string | null,
      } | null,
    },
    favoritedBy:  {
      __typename: "ModelFavoriteConnection",
      items:  Array< {
        __typename: "Favorite",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    materialsRequired:  {
      __typename: "ModelPlanMaterialConnection",
      items:  Array< {
        __typename: "PlanMaterial",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    toolsRequired:  {
      __typename: "ModelPlanToolConnection",
      items:  Array< {
        __typename: "PlanTool",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};
