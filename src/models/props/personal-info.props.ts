export interface PersonalInfoProps {
    email: string;
    emailVerified: boolean;
    name: string;
    saving: boolean;
    verifying: boolean;
    onSave: (email: string, name: string) => void;
    onVerify: (verificationCode: string) => void;
    onRequestVerificationCode: () => void;
}
