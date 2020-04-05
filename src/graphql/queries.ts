export class GraphQLQueries {
    listMaterialsQuery: string = `query ListMaterials {
        listMaterials(limit: 999) {
            items {
                id
                name
            }
        }
    }`;

    listToolsQuery: string = `query ListTools {
        listTools(limit: 999) {
            items {
                id
                name
            }
        }
    }`;
}
