// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import aws_exports from '../../aws-exports';
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

// MTF
import PlanCard from '../../components/plan-card.component/PlanCard.component';
import { signUpConfig } from '../../models/sign-up-config.model';
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { mtfAmplifyTheme, mtfTheme } from '../../themes';
import { GqlQuery, GetUserQuery } from '../../models/api-models';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        dashboardContainer: {
            [theme.breakpoints.up('lg')]: {
                display: 'flex',
                justifyContent: 'space-evenly',
            },
        },

        loading: {
            margin: `${theme.spacing(4)}px auto`,
        },
        listContainer: {
            padding: 20,
            width: '100%',
            marginBottom: 40,

            [theme.breakpoints.up('lg')]: {
                padding: 40,
                minWidth: 523,
                width: 'auto',
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
                    downloadedCount
                }
            }
            favoritedPlans {
                items {
                    plan {
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
                        downloadedCount
                    }
                }
            }
        }
    }`;

    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: DashboardProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    private handleTogglePlanFavorite(
        planId: string,
        toggleFavOn: boolean
    ): void {}

    private renderMyPlansList(data: GetUserQuery, loading: boolean): any {
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
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            userId={this.state.userId}
                            onToggleFavorite={this.handleTogglePlanFavorite}
                        />
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Created Yet</Typography>;
        }
    }

    private renderFavoritedPlansList(
        data: GetUserQuery,
        loading: boolean
    ): any {
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
                        <PlanCard
                            plan={favorite.plan}
                            userId={this.state.userId}
                            onToggleFavorite={this.handleTogglePlanFavorite}
                        />
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Favorited Yet</Typography>;
        }
    }

    render() {
        const { classes } = this.props;

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
                                            <Typography variant='h2'>
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

                                        {this.renderMyPlansList(data, loading)}
                                    </div>
                                    <div className={classes.listContainer}>
                                        <div className={classes.listTitle}>
                                            <Typography variant='h2'>
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

export default withStyles(styles(mtfTheme))(
    withAuthenticator(Dashboard, {
        signUpConfig: signUpConfig,
        theme: mtfAmplifyTheme,
    })
);
