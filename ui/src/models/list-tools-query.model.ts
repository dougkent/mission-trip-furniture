import { Tool } from '.';

export interface ListToolsQuery {
    data: {
        listTools: Tool[];
    };
    loading: boolean;
}
