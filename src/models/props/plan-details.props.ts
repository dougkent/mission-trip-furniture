import { Material, Tool } from '../api-models';
import { EditPlan } from '..';

export interface PlanDetailsProps {
    editing: boolean;
    description: string;
    allMaterials: Material[];
    requiredMaterials: Material[];
    allTools: Tool[];
    requiredTools: Tool[];
    onSave: (editPlanDetails: EditPlan) => void;
    onCancel: () => void;
}
