// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import { graphqlOperation } from 'aws-amplify';
import { withAuthenticator, Connect } from 'aws-amplify-react';

// Material UI
import {
    Button,
    CircularProgress,
    Typography,
    Grid,
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { mtfAmplifyTheme, mtfTheme } from '../../themes';
import { PlanCard } from '../../components';
import { signUpConfig } from '../../models/sign-up-config.model';
import {
    GqlQuery,
    GetUserQuery,
    GetPlanQuery,
    Plan,
} from '../../models/api-models';
import { PlanFavoriteService } from '../../services';

const styles = (theme: Theme) =>
    createStyles({
        dashboardContainer: {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                justifyContent: 'space-evenly',
            },
        },

        loading: {
            width: 100,
            margin: `${theme.spacing(4)}px auto`,
        },
        listContainer: {
            padding: theme.spacing(2),
            width: '100%',
            marginBottom: theme.spacing(5),
            [theme.breakpoints.up('md')]: {
                width: '50%',
            },

            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(5),
                minWidth: 523,
                width: '50%',
            },
        },
        listTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'flex-end',
            padding: '10px 0',
        },
        mobileDisplay: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        desktopDisplay: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inline-flex',
            },
        },
        createNewPlanLink: {
            textDecoration: 'none',
            marginTop: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                marginTop: theme.spacing(1),
            },
        },
        gridItem: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                height: theme.spacing(29),
            },
        },
    });

export interface DashboardProps extends AppProps, WithStyles<typeof styles> {}

class Dashboard extends React.Component<DashboardProps, AppState> {
    private getUserQuery = `query GetUser($id: ID!) {
        getUser(id: $id) {
            createdPlans {
                items {
                    id
                    name
                    description
                    pdfS3Key
                    imageS3Info {
                        key
                        width
                        height
                    }
                    created
                    createdBy {
                        id
                        username
                    }
                    favoritedCount
                    favoritedBy  {
                        items {
                            userId
                        }
                    }
                    downloadedCount
                    materialsRequired {
                        items {
                            id
                            material {
                                id
                                name
                            }
                        }
                    }
                    toolsRequired {
                        items {
                            id
                            tool {
                                id
                                name
                            }
                        }
                    }
                }
            }
            favoritedPlans {
                items {
                    planId
                }
            }
        }
    }`;

    private getPlanQuery = `query GetPlan($id: ID!) {
        getPlan(id: $id) {
            id
            name
            description
            pdfS3Key
            imageS3Info {
                key   
            }
            created
            createdBy {
                id
                username
            }
            favoritedCount
            favoritedBy  {
                items {
                    userId
                }
            }
            downloadedCount
            materialsRequired {
                items {
                    id
                    material {
                        id
                        name
                    }
                }
            }
            toolsRequired {
                items {
                    id
                    tool {
                        id
                        name
                    }
                }
            }
        }
    }`;

    private planFavoriteService = new PlanFavoriteService();

    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidMount() {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    }

    componentDidUpdate(prevProps: DashboardProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    private handleTogglePlanFavorite = async (
        planId: string,
        toggleFavOn: boolean
    ) => {
        if (toggleFavOn) {
            await this.planFavoriteService.createFavorite(
                planId,
                this.state.userId
            );

            ReactGA.event({
                category: 'favorite',
                action: 'User Favorited Plan',
                label: 'favorite on plan list page',
            });
        } else {
            await this.planFavoriteService.deleteFavorite(
                planId,
                this.state.userId
            );

            ReactGA.event({
                category: 'favorite',
                action: 'User Unfavorited Plan',
                label: 'favorite on plan list page',
            });
        }
    };

    private isFavoritedByUser = (plan: Plan): boolean => {
        return this.planFavoriteService.isFavoritedByUser(
            this.state.userId,
            plan
        );
    };
    private renderMyPlansList = (data: GetUserQuery, loading: boolean) => {
        const { classes } = this.props;

        if (loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        } else if (
            !loading &&
            data &&
            data.getUser &&
            data.getUser.createdPlans &&
            data.getUser.createdPlans.items &&
            data.getUser.createdPlans.items.length
        ) {
            return (
                <Grid container spacing={2}>
                    {data.getUser.createdPlans.items.map(plan => (
                        <Grid item key={plan.id} className={classes.gridItem}>
                            <PlanCard
                                plan={plan}
                                userId={this.state.userId}
                                isFavoritedByUser={this.isFavoritedByUser(plan)}
                                onToggleFavorite={this.handleTogglePlanFavorite}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Created Yet</Typography>;
        }
    };

    private renderFavoritedPlansList = (
        data: GetUserQuery,
        loading: boolean
    ) => {
        const { classes } = this.props;

        if (loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        } else if (
            !loading &&
            data &&
            data.getUser &&
            data.getUser.favoritedPlans &&
            data.getUser.favoritedPlans.items &&
            data.getUser.favoritedPlans.items.length
        ) {
            return (
                <Grid container spacing={2}>
                    {data.getUser.favoritedPlans.items.map(favorite => (
                        <Grid
                            item
                            key={favorite.planId}
                            className={classes.gridItem}>
                            {this.renderFavoritedPlan(favorite.planId)}
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Favorited Yet</Typography>;
        }
    };

    private renderFavoritedPlan = (planId: string) => {
        return (
            <Connect
                query={graphqlOperation(this.getPlanQuery, {
                    id: planId,
                })}>
                {({ data, loading }: GqlQuery<GetPlanQuery>) => {
                    if (!loading && data.getPlan)
                        return (
                            <PlanCard
                                plan={data.getPlan}
                                userId={this.state.userId}
                                isFavoritedByUser={this.isFavoritedByUser(
                                    data.getPlan
                                )}
                                onToggleFavorite={this.handleTogglePlanFavorite}
                            />
                        );
                }}
            </Connect>
        );
    };

    render() {
        const { classes } = this.props;

        if (!this.state.userId) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        } else {
            return (
                <>
                    <div className={classes.dashboardContainer}>
                        <Connect
                            query={graphqlOperation(this.getUserQuery, {
                                id: this.state.userId,
                            })}>
                            {({ data, loading }: GqlQuery<GetUserQuery>) => {
                                return (
                                    <>
                                        <div className={classes.listContainer}>
                                            <div className={classes.listTitle}>
                                                <Typography variant='h3'>
                                                    My Plans
                                                </Typography>
                                                <Link
                                                    to='/my-mtf/create-plan'
                                                    className={
                                                        classes.createNewPlanLink
                                                    }>
                                                    <AddBoxSharpIcon
                                                        color='secondary'
                                                        fontSize='large'
                                                        className={
                                                            classes.mobileDisplay
                                                        }
                                                    />
                                                    <Button
                                                        variant='contained'
                                                        color='secondary'
                                                        className={
                                                            classes.desktopDisplay
                                                        }
                                                        startIcon={
                                                            <AddSharpIcon />
                                                        }>
                                                        Create New Plan
                                                    </Button>
                                                </Link>
                                            </div>

                                            {this.renderMyPlansList(
                                                data,
                                                loading
                                            )}
                                        </div>
                                        <div className={classes.listContainer}>
                                            <div className={classes.listTitle}>
                                                <Typography variant='h3'>
                                                    Favorited Plans
                                                </Typography>
                                            </div>
                                            {this.renderFavoritedPlansList(
                                                data,
                                                loading
                                            )}
                                        </div>
                                    </>
                                );
                            }}
                        </Connect>
                    </div>
                </>
            );
        }
    }
}

export default withStyles(styles(mtfTheme))(
    withAuthenticator(Dashboard, {
        signUpConfig: signUpConfig,
        theme: mtfAmplifyTheme,
    })
);
