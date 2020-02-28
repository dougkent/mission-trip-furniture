// React
import React, { useState } from 'react';
import * as ReactRouter from 'react-router-dom';

// AWS
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    makeStyles,
    Theme,
    createStyles,
    Typography,
    Card,
    CardActions,
    CardContent,
    Grid,
} from '@material-ui/core';

// MTF
import PlanFavorite from '../plan-favorite.component/PlanFavorite.component';
import { PlanCardProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        image: {
            width: '100%',
            height: 200,
            [theme.breakpoints.up('sm')]: {
                width: 200,
                height: 200,
            },
            '& img': {
                width: '100%',
                height: 200,
                objectFit: 'cover',
                [theme.breakpoints.up('sm')]: {
                    width: 200,
                    height: 200,
                },
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        cardContent: {
            maxWidth: 260,
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: 175,
            alignItems: 'center',
        },
        cardTitleLink: {
            color: 'inherit',
            textDecoration: 'none',
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
    })
);

const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
    const classes = useStyles(mtfTheme);

    const [planState, setPlanState] = useState(props.plan);

    const handleToggleFavorite = (toggleFavOn: boolean) => {
        // setPlanState({
        //     ...planState,
        //     isFavoritedByUser: toggleFavOn,
        // });

        props.onToggleFavorite(planState.id, toggleFavOn);
    };

    return (
        <Grid item>
            <Card className={classes.card}>
                <div className={classes.image}>
                    <ReactRouter.Link
                        to={`/plans/${props.plan.id}`}
                        className={classes.cardTitleLink}>
                        <S3Image
                            level='protected'
                            imgKey={planState.imageS3Info.key}
                            identityId={planState.createdBy.id}
                        />
                    </ReactRouter.Link>
                </div>
                <div className={classes.cardContentContainer}>
                    <CardActions className={classes.cardActions}>
                        <div className={classes.cardTitle}>
                            <Typography
                                variant='h5'
                                noWrap
                                title={props.plan.name}>
                                <ReactRouter.Link
                                    to={`/plans/${props.plan.id}`}
                                    className={classes.cardTitleLink}>
                                    {props.plan.name}
                                </ReactRouter.Link>
                            </Typography>
                        </div>
                        <PlanFavorite
                            planId={props.plan.id}
                            disabled={false}
                            isFavoritedByUser={false}
                            favoritedCount={props.plan.favoritedCount}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </CardActions>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='body1' noWrap>
                            {props.plan.description}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    );
};

export default PlanCard;
