/* tslint:disable */
//  This file was automatically generated and should not be edited.
export type CreatePlanInput = {
    id: string;
    name: string;
    description: string;
    imageS3Info: S3Info;
    pdfS3Info: S3Info;
    toolIdsRequired: string[];
    materialIdsRequired: string[];
    created: string;
    planCreatedById: string;
};

export type ListToolsQuery = {
    listTools: {
        items: Material[];
        nextToken: string;
    };
};

export type ListMaterialsQuery = {
    listMaterials: {
        items: Tool[];
        nextToken: string;
    };
};

export type Material = {
    id: string;
    name: string;
};

export type Plan = {
    id: string;
    name: string;
    description: string;
    imageS3Info: S3Info;
    pdfS3Info: S3Info;
    toolsRequired: Tool[];
    materialsRequired: Material[];
    created: string;
    createdBy: User;
};

export type S3Info = {
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
