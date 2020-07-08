export interface PlanDeleteProps {
    planName: string;
    dialogOpen: boolean;
    deleting: boolean;
    onDelete: () => Promise<void>;
    onCancel: () => void;
}
