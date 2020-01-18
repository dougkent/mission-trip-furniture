import { Plan, User } from '.';
export interface Favorite {
    __typename: 'Favorite';
    id: string;
    plan: Plan | null;
    user: User | null;
}
