import {
    S3ImageInfo,
    ModelFavoriteConnection,
    ModelPlanMaterialConnection,
    ModelPlanToolConnection,
    User,
} from '../api-models';

// import { User } from './user.model';
// import { ModelFavoriteConnection } from './favorite-connection.model';
// import { ModelPlanMaterialConnection } from './plan-material-connection.model';
// import { ModelPlanToolConnection } from './plan-tool-connection.model';

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
    materialsRequired: ModelPlanMaterialConnection | null;
    toolsRequired: ModelPlanToolConnection | null;
}
