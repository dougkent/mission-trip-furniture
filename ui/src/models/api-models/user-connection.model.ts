import { User } from '.';

export interface ModelUserConnection {
    __typename: 'ModelUserConnection';
    items: Array<User> | null;
    nextToken: string | null;
}
