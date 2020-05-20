import { User } from '../api-models';

export interface ModelUserConnection {
    __typename: 'ModelUserConnection';
    items: Array<User> | null;
    nextToken: string | null;
}
