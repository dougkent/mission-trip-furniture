import {
    ModelPlanConnection,
    ModelFavoriteConnection,
    ModelDownloadConnection,
} from '.';

export interface User {
    __typename: 'User';
    id: string;
    username: string;
    createdPlans: ModelPlanConnection | null;
    favoritedPlans: ModelFavoriteConnection | null;
    downloadedPlans: ModelDownloadConnection | null;
}
