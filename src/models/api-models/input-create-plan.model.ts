import { S3ImageInfoInput } from '../api-models';

export interface CreatePlanInput {
    id: string;
    name: string;
    description: string;
    pdfS3Key: string;
    imageS3Info: S3ImageInfoInput;
    created: string;
    favoritedCount: number;
    downloadedCount: number;
    requiredMaterialIds: string[];
    requiredToolIds: string[];
    planCreatedById: string;
}
