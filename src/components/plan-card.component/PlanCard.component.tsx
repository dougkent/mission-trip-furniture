// React
import React, { useState, useEffect } from 'react';
import * as ReactRouter from 'react-router-dom';

// AWS
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    Card,
    CardActions,
    CardContent,
    Chip,
    createStyles,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';

// MTF
import { PlanCardProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { PlanFavorite, PlanDate } from '../.';
import { Plan } from '../../models/api-models';
import { RequiredItem } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            [theme.breakpoints.up('md')]: {
                flexWrap: 'noWrap',
            },
        },
        image: {
            width: '100%',
            height: theme.spacing(20),
            [theme.breakpoints.up('md')]: {
                width: theme.spacing(27),
                height: theme.spacing(27),
            },
            '& img': {
                width: '100%',
                height: theme.spacing(20),
                objectFit: 'cover',
                [theme.breakpoints.up('md')]: {
                    width: theme.spacing(27),
                    height: theme.spacing(27),
                },
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
                flexGrow: 1,
            },
        },
        cardContent: {
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: theme.spacing(19),
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
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        },
        row: {
            marginBottom: theme.spacing(1),
        },
        requiredItem: {
            marginRight: theme.spacing(0.5),
            '& .MuiChip-label': {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '125px',
                [theme.breakpoints.up('md')]: {
                    maxWidth: '90px',
                },
            },
        },
    })
);

const PlanCard: React.FC<PlanCardProps> = (props: PlanCardProps) => {
    const classes = useStyles(mtfTheme);

    const [planState, setPlanState] = useState<Plan>(props.plan);
    const [isFavoritedByUser, setIsFavoritedByUser] = useState<boolean>(
        props.isFavoritedByUser
    );

    useEffect(() => {
        setIsFavoritedByUser(props.isFavoritedByUser);
    }, [props.isFavoritedByUser]);

    const handleToggleFavorite = (toggleFavOn: boolean) => {
        let newFavoritedCount: number;

        if (toggleFavOn) {
            newFavoritedCount = planState.favoritedCount + 1;
        } else {
            newFavoritedCount = planState.favoritedCount - 1;
        }

        setPlanState({
            ...planState,
            favoritedCount: newFavoritedCount,
        });

        setIsFavoritedByUser(toggleFavOn);

        props.onToggleFavorite(planState.id, toggleFavOn);
    };

    const renderRequiredItems = (
        label: string,
        requiredItems: RequiredItem[]
    ) => {
        return (
            <div className={classes.row}>
                <label>{label}:</label>
                <div>
                    {requiredItems
                        ?.filter((requiredItem, index) => index < 2)
                        .map(requiredItem => (
                            <Tooltip
                                key={requiredItem.id}
                                title={requiredItem.name}
                                placement='bottom'
                                arrow
                                enterDelay={500}>
                                <Chip
                                    className={classes.requiredItem}
                                    size='small'
                                    color='secondary'
                                    label={requiredItem.name}
                                />
                            </Tooltip>
                        ))}
                    {requiredItems.length > 2 && (
                        <Tooltip
                            title={
                                (requiredItems.length - 2).toString() + ' More'
                            }
                            placement='bottom'
                            arrow
                            enterDelay={500}>
                            <Chip
                                size='small'
                                color='secondary'
                                variant='outlined'
                                label={
                                    '+' + (requiredItems.length - 2).toString()
                                }
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Card className={classes.card}>
            <div className={classes.image}>
                <ReactRouter.Link
                    to={`/plans/${planState.id}`}
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
                        <Tooltip
                            title={planState.name}
                            placement='right'
                            arrow
                            enterDelay={500}>
                            <Typography variant='h5' noWrap>
                                <ReactRouter.Link
                                    to={`/plans/${planState.id}`}
                                    className={classes.cardTitleLink}>
                                    {planState.name}
                                </ReactRouter.Link>
                            </Typography>
                        </Tooltip>
                    </div>
                    <PlanFavorite
                        planId={planState.id}
                        disabled={!props.userId || props.userId.length === 0}
                        isFavoritedByUser={isFavoritedByUser}
                        favoritedCount={planState.favoritedCount}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </CardActions>
                <CardContent className={classes.cardContent}>
                    {renderRequiredItems(
                        'Materials',
                        planState.requiredMaterials
                    )}
                    {renderRequiredItems('Tools', planState.requiredTools)}
                    <div className={classes.row}>
                        <Typography>
                            Created:&nbsp;
                            <PlanDate date={new Date(planState.created)} />
                            &nbsp;by&nbsp;{planState.createdBy.username}
                        </Typography>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default PlanCard;
