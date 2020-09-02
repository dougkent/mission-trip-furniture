export interface PersonalInfoProps {
    email: string;
    emailVerified: boolean;
    name: string;
    saving: boolean;
    onSave: (email: string, name: string) => void;
}
