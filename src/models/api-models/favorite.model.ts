import { Plan, User } from '../api-models';
export interface Favorite {
    __typename: 'Favorite';
    id: string;
    plan: Plan | null;
    user: User | null;
}
