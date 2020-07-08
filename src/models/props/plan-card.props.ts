import { Plan } from '../api-models';
import { AppProps } from './app.props';

export interface PlanCardProps {
    userId: string;
    plan: Plan;
    isFavoritedByUser: boolean;
    onToggleFavorite: (planId: string, toggleFavOn: boolean) => void;
}
