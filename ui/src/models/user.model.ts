import { Plan } from '.';

export interface User {
    username: string;
    favoritedPlans: Plan[];
    createdPlans: Plan[];
}
