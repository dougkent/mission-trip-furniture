import { SearchableNumberFilterInput, SearchableStringFilterInput } from '.';

export interface SearchablePlanFilterInput {
    id: SearchableStringFilterInput;
    name: SearchableStringFilterInput;
    description: SearchableStringFilterInput;
    pdfS3Key: SearchableStringFilterInput;
    created: SearchableStringFilterInput;
    favoritedCount: SearchableNumberFilterInput;
    downloadCount: SearchableNumberFilterInput;
    requiredMaterialIds: SearchableStringFilterInput;
    requiredToolIds: SearchableStringFilterInput;
    planCreatedById: SearchableStringFilterInput;
    and: [SearchablePlanFilterInput];
    or: [SearchablePlanFilterInput];
    not: [SearchablePlanFilterInput];
}
