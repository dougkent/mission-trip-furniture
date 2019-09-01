/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  username: string,
};

export type UpdateUserInput = {
  username: string,
};

export type DeleteUserInput = {
  username: string,
};

export type CreatePlanInput = {
  id?: string | null,
  name: string,
  description: string,
  imageS3Info: S3InfoInput,
  pdfS3Info: S3InfoInput,
  created: string,
  planCreatedById: string,
};

export type S3InfoInput = {
  key: string,
  widht: number,
  height: number,
};

export type UpdatePlanInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  imageS3Info?: S3InfoInput | null,
  pdfS3Info?: S3InfoInput | null,
  created?: string | null,
  planCreatedById?: string | null,
};

export type DeletePlanInput = {
  id?: string | null,
};

export type ModelToolFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelToolFilterInput | null > | null,
  or?: Array< ModelToolFilterInput | null > | null,
  not?: ModelToolFilterInput | null,
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

export type ModelUserFilterInput = {
  username?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPlanFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  created?: ModelStringFilterInput | null,
  and?: Array< ModelPlanFilterInput | null > | null,
  or?: Array< ModelPlanFilterInput | null > | null,
  not?: ModelPlanFilterInput | null,
};

export type SearchablePlanFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  created?: SearchableStringFilterInput | null,
  and?: Array< SearchablePlanFilterInput | null > | null,
  or?: Array< SearchablePlanFilterInput | null > | null,
  not?: SearchablePlanFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchablePlanSortInput = {
  field?: SearchablePlanSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePlanSortableFields {
  id = "id",
  name = "name",
  description = "description",
  created = "created",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
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
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
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
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
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
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
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
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
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
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
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

export type GetUserQueryVariables = {
  username: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
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
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
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
      imageS3Info:  {
        __typename: "S3Info",
        key: string,
        widht: number,
        height: number,
      },
      pdfS3Info:  {
        __typename: "S3Info",
        key: string,
        widht: number,
        height: number,
      },
      toolsRequired:  Array< {
        __typename: "Tool",
        id: string,
        name: string,
      } >,
      materialsRequired:  Array< {
        __typename: "Material",
        id: string,
        name: string,
      } >,
      favoritedBy:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      created: string,
      createdBy:  {
        __typename: "User",
        username: string,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SearchPlansQueryVariables = {
  filter?: SearchablePlanFilterInput | null,
  sort?: SearchablePlanSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchPlansQuery = {
  searchPlans:  {
    __typename: "SearchablePlanConnection",
    items:  Array< {
      __typename: "Plan",
      id: string,
      name: string,
      description: string,
      imageS3Info:  {
        __typename: "S3Info",
        key: string,
        widht: number,
        height: number,
      },
      pdfS3Info:  {
        __typename: "S3Info",
        key: string,
        widht: number,
        height: number,
      },
      toolsRequired:  Array< {
        __typename: "Tool",
        id: string,
        name: string,
      } >,
      materialsRequired:  Array< {
        __typename: "Material",
        id: string,
        name: string,
      } >,
      favoritedBy:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      created: string,
      createdBy:  {
        __typename: "User",
        username: string,
      },
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    username: string,
    favoritedPlans:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdPlans:  {
      __typename: "ModelPlanConnection",
      items:  Array< {
        __typename: "Plan",
        id: string,
        name: string,
        description: string,
        created: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePlanSubscription = {
  onCreatePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdatePlanSubscription = {
  onUpdatePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeletePlanSubscription = {
  onDeletePlan:  {
    __typename: "Plan",
    id: string,
    name: string,
    description: string,
    imageS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    pdfS3Info:  {
      __typename: "S3Info",
      key: string,
      widht: number,
      height: number,
    },
    toolsRequired:  Array< {
      __typename: "Tool",
      id: string,
      name: string,
    } >,
    materialsRequired:  Array< {
      __typename: "Material",
      id: string,
      name: string,
    } >,
    favoritedBy:  {
      __typename: "ModelUserFavoritedPlanConnection",
      items:  Array< {
        __typename: "UserFavoritedPlan",
        id: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    created: string,
    createdBy:  {
      __typename: "User",
      username: string,
      favoritedPlans:  {
        __typename: "ModelUserFavoritedPlanConnection",
        nextToken: string | null,
      } | null,
      createdPlans:  {
        __typename: "ModelPlanConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};
