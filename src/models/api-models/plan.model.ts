import {
    S3ImageInfo,
    ModelDownloadConnection,
    ModelFavoriteConnection,
    User,
    Material,
    Tool,
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
    requiredMaterialIds: string[] | null;
    requiredToolIds: string[] | null;

    // Not Mapped to GQL Properties
    requiredMaterials: Material[] | null;
    requiredTools: Tool[] | null;
    isFavoritedByUser: boolean;
}
