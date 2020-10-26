export interface CreatePlanInput {
    id: string;
    name: string;
    description: string;
    pdfS3Key: string;
    imageS3Keys: string[];
    created: string;
    favoritedCount: number;
    downloadedCount: number;
    requiredMaterialIds: string[];
    requiredToolIds: string[];
    planCreatedById: string;
}
