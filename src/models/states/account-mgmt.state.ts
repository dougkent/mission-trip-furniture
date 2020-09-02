export interface AccountManagementState {
    email: string;
    emailVerified: boolean;
    name: string;
    savingPersonalInfo: boolean;
    verifyingEmail: boolean;
    savingPassword: boolean;
    savePasswordSuccessful: boolean;
    errors: string[];
}
