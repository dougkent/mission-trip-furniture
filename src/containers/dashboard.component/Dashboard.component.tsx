// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import { graphqlOperation, API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

// Material UI
import {
    Button,
    CircularProgress,
    createStyles,
    Hidden,
    Tab,
    Tabs,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { DashboardState, DashboardTabsEnum } from '../../models/states';
import { mtfAmplifyTheme, mtfTheme } from '../../themes';
import { PlanGrid } from '../../components';
import { signUpConfig } from '../../models/sign-up-config.model';
import {
    GqlQuery,
    GetUserQuery,
    GetFavoriteByUserIdQuery,
    GetPlanQuery,
    Plan,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';

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
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        desktopDisplay: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
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

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            userId: props.userId,
            materials: props.materials,
            tools: props.tools,
            userFavoritedPlanIds: props.userFavoritedPlanIds,
            currentTab: DashboardTabsEnum.CREATED_PLANS,
            createdPlans: [],
            createdPlansNextToken: null,
            createdPlansLoading: false,
            favoritedPlans: [],
            favoritedPlansNextToken: null,
            favoritedPlansLoading: false,
        };
    }

    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);

        if (this.state.userId) {
            this.loadCreatedPlans();
            this.loadFavoritedPlans();
        }
    };

    componentDidUpdate = async (prevProps: DashboardProps) => {
        if (
            this.props.userId !== prevProps.userId ||
            this.props.materials !== prevProps.materials ||
            this.props.tools !== prevProps.tools ||
            this.props.userFavoritedPlanIds !== prevProps.userFavoritedPlanIds
        ) {
            await this.setState({
                userId: this.props.userId,
                materials: this.props.materials,
                tools: this.props.tools,
                userFavoritedPlanIds: this.props.userFavoritedPlanIds,
            });

            if (this.props.userId !== prevProps.userId) {
                this.loadCreatedPlans();
                this.loadFavoritedPlans();
            }

            if (
                this.props.materials !== prevProps.materials ||
                this.props.tools !== prevProps.tools ||
                this.props.userFavoritedPlanIds !==
                    prevProps.userFavoritedPlanIds
            ) {
                const decoratedCreatedPlans = this.decoratePlans(
                    this.state.createdPlans
                );
                const decoratedFavoritedPlans = this.decoratePlans(
                    this.state.favoritedPlans
                );

                this.setState({
                    createdPlans: decoratedCreatedPlans,
                    favoritedPlans: decoratedFavoritedPlans,
                });
            }
        }
    };

    private decoratePlans = (plans: Plan[]): Plan[] => {
        const mappedPlans: Plan[] = plans.map(plan => {
            return {
                ...plan,
                requiredMaterials: this.state.materials.filter(material => {
                    return !!plan.requiredMaterialIds.find(
                        id => id === material.id
                    );
                }),
                requiredTools: this.state.tools.filter(tool => {
                    return !!plan.requiredToolIds.find(id => id === tool.id);
                }),
                isFavoritedByUser: this.state.userFavoritedPlanIds.some(
                    planId => planId === plan.id
                ),
            };
        });

        return mappedPlans;
    };

    private handleNextCreatedPlanPage = async () => {
        this.loadCreatedPlans(true);
    };

    private handleNextFavoritedPlanPage = async () => {
        this.loadFavoritedPlans(true);
    };

    private handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: DashboardTabsEnum
    ) => {
        this.setState({
            currentTab: newValue,
        });

        switch (newValue) {
            case DashboardTabsEnum.CREATED_PLANS:
                if (!this.state.createdPlans.length) {
                    this.loadCreatedPlans();
                }
                break;
            case DashboardTabsEnum.FAVORITED_PLANS:
                if (!this.state.favoritedPlans.length) {
                    this.loadFavoritedPlans();
                }
                break;
        }
    };

    private handleTogglePlanFavorite = async (
        planId: string,
        toggleFavOn: boolean
    ) => {
        ReactGA.event({
            category: 'favorite',
            action: toggleFavOn
                ? 'User Favorited Plan'
                : 'User Unfavorited Plan',
            label: 'favorite on plan list page',
        });

        this.props.onPlanFavorite(planId, toggleFavOn);

        this.setState({
            favoritedPlansLoading: true,
            favoritedPlans: [],
        });

        setTimeout(() => {
            this.loadFavoritedPlans();
            this.loadCreatedPlans();
        }, 1000);
    };

    private loadCreatedPlans = async (isNextPage: boolean = false) => {
        this.setState({
            createdPlansLoading: true,
        });

        const result: GqlQuery<GetUserQuery> = await API.graphql(
            graphqlOperation(graphQLQueries.getUserQuery, {
                id: this.state.userId,
                limit: 5,
                nextToken: this.state.createdPlansNextToken,
            })
        );

        const { createdPlans } = result.data.getUser;

        const mappedPlans = this.decoratePlans(createdPlans.items);

        this.setState(prevState => ({
            ...prevState,
            createdPlansLoading: false,
            createdPlans: isNextPage
                ? prevState.createdPlans.concat(mappedPlans)
                : mappedPlans,
            createdPlansNextToken: createdPlans.nextToken,
        }));
    };

    private loadFavoritedPlans = async (isNextPage: boolean = false) => {
        this.setState({
            favoritedPlansLoading: true,
        });

        const result: GqlQuery<GetFavoriteByUserIdQuery> = await API.graphql(
            graphqlOperation(graphQLQueries.getFavoritesByUserQuery, {
                userId: this.state.userId,
                limit: 5,
                nextToken: this.state.favoritedPlansNextToken,
            })
        );

        const { getFavoriteByUserId } = result.data;

        const favoritedPlans: Plan[] = [];

        for (const i in getFavoriteByUserId.items) {
            const planId = getFavoriteByUserId.items[i].planId;

            const result: GqlQuery<GetPlanQuery> = await API.graphql(
                graphqlOperation(graphQLQueries.getPlanQuery, {
                    id: planId,
                })
            );

            favoritedPlans.push(result.data.getPlan);
        }

        const mappedPlans = this.decoratePlans(favoritedPlans);

        this.setState(prevState => ({
            ...prevState,
            favoritedPlansLoading: false,
            favoritedPlans: isNextPage
                ? prevState.favoritedPlans.concat(mappedPlans)
                : mappedPlans,
            favoritedPlansNextToken: getFavoriteByUserId.nextToken,
        }));
    };

    private renderCreatedPlansList = () => {
        const { classes } = this.props;

        return (
            <div className={classes.listContainer}>
                <div className={classes.listTitle}>
                    <Typography variant='h3'>My Plans</Typography>
                    <Link
                        to='/my-mtf/create-plan'
                        className={classes.createNewPlanLink}>
                        <AddBoxSharpIcon
                            color='secondary'
                            fontSize='large'
                            className={classes.mobileDisplay}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            className={classes.desktopDisplay}
                            startIcon={<AddSharpIcon />}>
                            Create New Plan
                        </Button>
                    </Link>
                </div>
                <PlanGrid
                    plans={this.state.createdPlans}
                    userId={this.state.userId}
                    nextToken={this.state.createdPlansNextToken}
                    loading={this.state.createdPlansLoading}
                    emptyText='No Plans Created Yet'
                    gridItemClassName={classes.gridItem}
                    onNextPage={this.handleNextCreatedPlanPage}
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
        );
    };

    private renderFavoritedPlansList = () => {
        const { classes } = this.props;

        return (
            <div className={classes.listContainer}>
                <div className={classes.listTitle}>
                    <Typography variant='h3'>Favorited Plans</Typography>
                </div>
                <PlanGrid
                    plans={this.state.favoritedPlans}
                    userId={this.state.userId}
                    nextToken={this.state.favoritedPlansNextToken}
                    loading={this.state.favoritedPlansLoading}
                    emptyText='No Plans Favorited Yet'
                    gridItemClassName={classes.gridItem}
                    onNextPage={this.handleNextFavoritedPlanPage}
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
        );
    };

    render = () => {
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
                    <Hidden mdUp>
                        <Tabs
                            value={this.state.currentTab}
                            onChange={this.handleTabChange}
                            centered
                            variant='fullWidth'>
                            <Tab
                                label='My Created Plans'
                                value={DashboardTabsEnum.CREATED_PLANS}
                            />
                            <Tab
                                label='My Favorited Plans'
                                value={DashboardTabsEnum.FAVORITED_PLANS}
                            />
                        </Tabs>
                        <div className={classes.dashboardContainer}>
                            {this.state.currentTab ===
                                DashboardTabsEnum.CREATED_PLANS &&
                                this.renderCreatedPlansList()}
                            {this.state.currentTab ===
                                DashboardTabsEnum.FAVORITED_PLANS &&
                                this.renderFavoritedPlansList()}
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <div className={classes.dashboardContainer}>
                            {this.renderCreatedPlansList()}
                            {this.renderFavoritedPlansList()}
                        </div>
                    </Hidden>
                </>
            );
        }
    };
}

export default withStyles(styles(mtfTheme))(
    withAuthenticator(Dashboard, {
        signUpConfig: signUpConfig,
        theme: mtfAmplifyTheme,
    })
);
