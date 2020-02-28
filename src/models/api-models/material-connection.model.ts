import { Material } from './material.model';

export interface ModelMaterialConnection {
    __typename: 'ModelMaterialConnection';
    items: Array<Material> | null;
    nextToken: string | null;
}
