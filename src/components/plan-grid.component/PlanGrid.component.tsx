// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    CircularProgress,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';

// MTF
import { PlanGridProps } from '../../models/props';
import { Pager, PlanCard } from '../.';
import { Plan } from '../../models/api-models';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loading: {
            width: 100,
            margin: `${theme.spacing(4)}px auto`,
        },
    })
);

const PlanGrid: React.FC<PlanGridProps> = (props: PlanGridProps) => {
    const classes = useStyles(mtfTheme);

    const [loading, setLoading] = useState<boolean>(props.loading);

    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    const handleNextPage = () => {
        setLoading(true);

        props.onNextPage(props.nextToken);
    };

    const handleTogglePlanFavorite = (planId: string, toggleFavOn: boolean) => {
        props.onTogglePlanFavorite(planId, toggleFavOn);
    };

    const isFavoritedByUser = (plan: Plan): boolean => {
        return props.isFavoritedByUser(plan);
    };

    return (
        <>
            {!loading && !props.plans.length && (
                <Typography variant='h4'>{props.emptyText}</Typography>
            )}
            {props.plans.length > 0 && (
                <>
                    <Grid container spacing={2}>
                        {props.plans.map(plan => (
                            <Grid
                                item
                                key={plan.id}
                                className={props.gridItemClassName}>
                                <PlanCard
                                    plan={plan}
                                    userId={props.userId}
                                    isFavoritedByUser={isFavoritedByUser(plan)}
                                    onToggleFavorite={handleTogglePlanFavorite}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {!loading &&
                        props.nextToken &&
                        (!props.totalCount ||
                            (!!props.totalCount &&
                                props.totalCount > props.plans.length)) && (
                            <Pager onNextPage={handleNextPage} />
                        )}
                </>
            )}
            {loading && (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            )}
        </>
    );
};

export default PlanGrid;
