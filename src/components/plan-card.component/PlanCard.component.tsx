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
import { PlanFavorite, PlanDate, PlanDownloadedCount } from '../.';
import { Plan } from '../../models/api-models';
import { RequiredItem } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
        },
        image: {
            width: '100%',
            height: theme.spacing(25),
            '& img': {
                width: '100%',
                height: theme.spacing(25),
                objectFit: 'cover',
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
                flexGrow: 1,
            },
        },
        cardContent: {},
        cardActions: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: theme.spacing(28),
            alignItems: 'center',
        },
        cardTitleLink: {
            color: 'inherit',
            textDecoration: 'none',
        },
        cardIcons: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: theme.spacing(9),
        },
        row: {
            marginBottom: theme.spacing(1),
        },
        requiredItem: {
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
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
        setPlanState(props.plan);
    }, [props.plan]);

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
                        .map((requiredItem) => (
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
                                (requiredItems.length - 2).toString() +
                                ' More ' +
                                label
                            }
                            placement='bottom'
                            arrow
                            enterDelay={500}>
                            <Chip
                                size='small'
                                color='secondary'
                                variant='outlined'
                                label={
                                    '+' +
                                    (requiredItems.length - 2).toString() +
                                    ' More'
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
                <div className={classes.cardIcons}>
                    <PlanDownloadedCount
                        downloadedCount={planState.downloadedCount}
                    />
                    <PlanFavorite
                        planId={planState.id}
                        disabled={!props.userId || props.userId.length === 0}
                        isFavoritedByUser={isFavoritedByUser}
                        favoritedCount={planState.favoritedCount}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </div>
            </CardActions>
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
                <CardContent className={classes.cardContent}>
                    <div className={classes.row}>
                        <Typography>
                            Created:&nbsp;
                            <PlanDate date={new Date(planState.created)} />
                            &nbsp;by&nbsp;{planState.createdBy.username}
                        </Typography>
                    </div>
                    {renderRequiredItems(
                        'Materials',
                        planState.requiredMaterials
                    )}
                    {renderRequiredItems('Tools', planState.requiredTools)}
                </CardContent>
            </div>
        </Card>
    );
};

export default PlanCard;
