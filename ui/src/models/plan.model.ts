import { Material, S3ImageInfo, Tool, User } from '.';

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
