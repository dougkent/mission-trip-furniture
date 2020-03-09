export interface FilterState {
    filterMaterials: string[];
    filterTools: string[];
    filterFavoritedByUser: boolean;
    filterDownloadedByUser: boolean;
    filterCreatedByUser: boolean;
    filterCreatedRangeStart: Date | null;
    filterCreatedRangeEnd: Date | null;
}
