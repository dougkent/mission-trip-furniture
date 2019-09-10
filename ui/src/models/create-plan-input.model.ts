import { S3ImageInfo } from '.';

export interface CreatePlanInput {
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
}
