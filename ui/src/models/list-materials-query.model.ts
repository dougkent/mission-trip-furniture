import { Material } from '.';

export interface ListMaterialsQuery {
    data: {
        listMaterials: Material[];
    };

    loading: boolean;
}
