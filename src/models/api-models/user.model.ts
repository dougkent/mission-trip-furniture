import { ModelPlanConnection, ModelFavoriteConnection } from '../api-models';

export interface User {
    __typename: 'User';
    id: string;
    username: string;
    createdPlans: ModelPlanConnection | null;
    favoritedPlans: ModelFavoriteConnection | null;
}
