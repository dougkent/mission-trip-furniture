export interface UpdatePlanInput {
    id: string;
    description: string;
    requiredMaterialIds: string[];
    requiredToolIds: string[];
}
