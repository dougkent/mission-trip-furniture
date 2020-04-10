import { Plan } from '.';

export interface SearchablePlanConnection {
    __typename: 'SearchablePlanConnection';
    items: Array<Plan>;
    nextToken: string;
    total: number;
}
