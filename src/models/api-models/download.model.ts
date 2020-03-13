import { Plan, User } from '.';

export interface Download {
    __typename: 'Download';
    id: string;
    plan: Plan | null;
    user: User | null;
}
