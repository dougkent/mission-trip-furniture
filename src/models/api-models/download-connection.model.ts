import { Download } from '.';

export interface ModelDownloadConnection {
    __typename: 'ModelDownloadConnection';
    items: Array<Download> | null;
    nextToken: string | null;
}
