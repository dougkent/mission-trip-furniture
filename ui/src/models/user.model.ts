import { Plan } from '.';

export interface User {
    id: string;
    username: string;
    favoritedPlans: Plan[];
    createdPlans: Plan[];
}
