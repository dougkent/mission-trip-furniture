export interface AccountManagementState {
    email: string;
    emailVerified: boolean;
    name: string;
    savingPersonalInfo: boolean;
    savingPassword: boolean;
    savePasswordSuccessful: boolean;
    errors: string[];
}
