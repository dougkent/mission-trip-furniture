export interface EditDescriptionProps {
    description: string;
    saving: boolean;
    onCancel(): void;
    onSave(newDescription: string): Promise<void>;
}
