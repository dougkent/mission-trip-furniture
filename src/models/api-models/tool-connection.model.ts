import { Tool } from './tool.model';

export interface ModelToolConnection {
    __typename: 'ModelToolConnection';
    items: Array<Tool> | null;
    nextToken: string | null;
}
