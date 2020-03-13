import {
    S3ImageInfo,
    ModelDownloadConnection,
    ModelFavoriteConnection,
    ModelPlanMaterialConnection,
    ModelPlanToolConnection,
    User,
} from '.';

export interface Plan {
    __typename: 'Plan';
    id: string;
    name: string;
    description: string;
    pdfS3Key: string;
    imageS3Info: S3ImageInfo;
    created: string;
    createdBy: User;
    favoritedCount: number;
    favoritedBy: ModelFavoriteConnection | null;
    downloadedCount: number;
    downloadedBy: ModelDownloadConnection | null;
    materialsRequired: ModelPlanMaterialConnection | null;
    toolsRequired: ModelPlanToolConnection | null;
}
