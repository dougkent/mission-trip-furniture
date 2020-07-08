export interface DescriptionViewProps {
    description: string;
    saving: boolean;
    editing: boolean;
    onCancel: () => void;
    onSave: (newDescription: string) => Promise<void>;
}
