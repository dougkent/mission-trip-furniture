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
    ListToolsQuery,
    ListMaterialsQuery,
    Plan,
} from '../../models/api-models';
import { GraphQLQueries } from '../../models/graphql/GraphQLQueries';
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
    private getUserQuery = `query GetUser($id: ID! $limit: Int!, $nextToken: String) {
        getUser(id: $id) {
            createdPlans(limit: $limit, nextToken: $nextToken) {
                nextToken
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
                    requiredMaterialIds
                    requiredToolIds
                }
            }
        }
    }`;

    private getFavoritesByUserQuery = `query GetFavoritesByUser($userId: ID!, $limit: Int!, $nextToken: String) {
        getFavoriteByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            nextToken
            items {
                id
                planId
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
            requiredMaterialIds
            requiredToolIds
        }
    }`;

    private listMaterialsQuery = `query ListMaterials {
        listMaterials(limit: 999) {
            items {
                id
                name
            }
        }
    }`;

    private listToolsQuery = `query ListTools {
        listTools(limit: 999) {
            items {
                id
                name
            }
        }
    }`;

    private planFavoriteService = new PlanFavoriteService();

    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            currentTab: DashboardTabsEnum.CREATED_PLANS,
            materials: [],
            tools: [],
            createdPlans: [],
            createdPlansNextToken: null,
            createdPlansLoading: false,
            favoritedPlans: [],
            favoritedPlansNextToken: null,
            favoritedPlansLoading: false,
            userId: props.userId,
        };
    }

    componentDidMount() {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    }

    async componentDidUpdate(prevProps: DashboardProps) {
        if (this.props.userId !== prevProps.userId) {
            await this.setState(prevState => ({
                ...prevState,
                userId: this.props.userId,
            }));

            await this.loadMaterials();
            await this.loadTools();

            this.loadCreatedPlans();
            this.loadFavoritedPlans();
        }
    }

    private handleNextCreatedPlanPage = async () => {
        this.loadCreatedPlans();
    };

    private handleNextFavoritedPlanPage = async () => {
        this.loadFavoritedPlans();
    };

    private handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: DashboardTabsEnum
    ) => {
        this.setState(prevState => ({
            ...prevState,
            currentTab: newValue,
        }));

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

    private includeMaterialsAndToolsOnPlan(plans: Plan[]): Plan[] {
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
            };
        });

        return mappedPlans;
    }

    private isFavoritedByUser = (plan: Plan): boolean => {
        return this.planFavoriteService.isFavoritedByUser(
            this.state.userId,
            plan
        );
    };

    private loadCreatedPlans = async () => {
        this.setState(prevState => ({
            ...prevState,
            createdPlansLoading: true,
        }));

        const result: GqlQuery<GetUserQuery> = await API.graphql(
            graphqlOperation(this.getUserQuery, {
                id: this.state.userId,
                limit: 5,
                nextToken: this.state.createdPlansNextToken,
            })
        );

        const { createdPlans } = result.data.getUser;

        const mappedPlans = this.includeMaterialsAndToolsOnPlan(
            createdPlans.items
        );

        this.setState(prevState => ({
            ...prevState,
            createdPlansLoading: false,
            createdPlans: prevState.createdPlans.concat(mappedPlans),
            createdPlansNextToken: createdPlans.nextToken,
        }));
    };

    private loadFavoritedPlans = async () => {
        this.setState(prevState => ({
            ...prevState,
            favoritedPlansLoading: true,
        }));

        const result: GqlQuery<GetFavoriteByUserIdQuery> = await API.graphql(
            graphqlOperation(this.getFavoritesByUserQuery, {
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
                graphqlOperation(this.getPlanQuery, {
                    id: planId,
                })
            );

            favoritedPlans.push(result.data.getPlan);
        }

        const mappedPlans = this.includeMaterialsAndToolsOnPlan(favoritedPlans);

        this.setState(prevState => ({
            ...prevState,
            favoritedPlansLoading: false,
            favoritedPlans: prevState.favoritedPlans.concat(mappedPlans),
            favoritedPlansNextToken: getFavoriteByUserId.nextToken,
        }));
    };

    private loadMaterials = async () => {
        const result: GqlQuery<ListMaterialsQuery> = await API.graphql(
            graphqlOperation(this.listMaterialsQuery)
        );

        this.setState(prevState => ({
            ...prevState,
            materials: result?.data?.listMaterials?.items,
        }));
    };

    private loadTools = async () => {
        const result: GqlQuery<ListToolsQuery> = await API.graphql(
            graphqlOperation(this.listToolsQuery)
        );

        this.setState(prevState => ({
            ...prevState,
            tools: result?.data?.listTools?.items,
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
                    isFavoritedByUser={this.isFavoritedByUser}
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
                    isFavoritedByUser={this.isFavoritedByUser}
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
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
    }
}

export default withStyles(styles(mtfTheme))(
    withAuthenticator(Dashboard, {
        signUpConfig: signUpConfig,
        theme: mtfAmplifyTheme,
    })
);
