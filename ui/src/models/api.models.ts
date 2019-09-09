/* tslint:disable */
//  This file was automatically generated and should not be edited.
export type CreatePlanInput = {
    id: string;
    name: string;
    description: string;
    favoritedByUsernames: string[];
    imageS3Info: S3ImageInfo;
    pdfS3Key: string;
    requiredToolIds: string[];
    requiredMaterialIds: string[];
    createdDate: string;
    createdByUsername: string;
};

export type CreateUserInput = {
    username: string;
    planIdsFavorited: string[];
    planIdsCreated: string[];
};

export type ListToolsQuery = Tool[];

export type ListMaterialsQuery = Material[];

export type Material = {
    id: string;
    name: string;
};

export type Plan = {
    id: string;
    name: string;
    description: string;
    imageS3Info: S3ImageInfo;
    pdfS3Key: string;
    toolsRequired: Tool[];
    materialsRequired: Material[];
    createdDate: string;
    createdBy: User;
};

export type S3ImageInfo = {
    key: string;
    width: number;
    height: number;
};

export type Tool = {
    id: string;
    name: string;
};

export type User = {
    username: string;
    favoritedPlans: Plan[];
    createdPlans: Plan[];
};
