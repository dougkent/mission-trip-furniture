export interface ChangePasswordProps {
    saving: boolean;
    saveSuccessful: boolean;
    onSave: (oldPassword: string, newPassword: string) => void;
    onError: (errors: string[]) => void;
}
