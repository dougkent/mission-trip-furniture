import { S3ImageInfoInput } from '.';

export interface CreatePlanInput {
    id: string;
    name: string;
    description: string;
    pdfS3Key: string;
    imageS3Info: S3ImageInfoInput;
    created: string;
    favoritedCount: number;
    planCreatedById: string;
}
