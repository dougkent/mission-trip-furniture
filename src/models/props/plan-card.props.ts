import { Plan } from '../api-models';
import { AppProps } from './app.props';

export interface PlanCardProps extends AppProps {
    plan: Plan;
    onToggleFavorite(planId: string, toggleFavOn: boolean): void;
}
