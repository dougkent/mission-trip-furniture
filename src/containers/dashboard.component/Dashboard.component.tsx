// React
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// AWS
import { graphqlOperation, API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

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
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp';
import CreateNewFolderSharpIcon from '@material-ui/icons/CreateNewFolderSharp';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { DashboardState, DashboardTabsEnum } from '../../models/states';
import { mtfTheme } from '../../themes';
import { PlanGrid } from '../../components';
import {
    GetDownloadedByUserIdQuery,
    GetFavoriteByUserIdQuery,
    GetPlanQuery,
    GetUserQuery,
    Plan,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';

const styles = (theme: Theme) =>
    createStyles({
        dashboardContainer: {
            marginTop: theme.spacing(1),
            [theme.breakpoints.up('lg')]: {
                marginTop: theme.spacing(4),
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
            },
        },

        loading: {
            width: 100,
            margin: `${theme.spacing(4)}px auto`,
        },

        linkBar: {
            width: '100%',
            padding: `0px ${theme.spacing(2)}px`,
        },

        listContainer: {
            padding: `${theme.spacing(2)}px 0px`,
            width: '100%',
            marginBottom: theme.spacing(5),
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(2),
            },

            [theme.breakpoints.up('xl')]: {
                minWidth: 523,
                width: '33.3333333333333%',
            },
        },
        listTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            alignItems: 'center',
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
        noDecorationLink: {
            textDecoration: 'none',
        },
        gridItem: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
            [theme.breakpoints.up('xl')]: {
                width: '100%',
            },
        },
        verticalTabs: {
            width: '15%',
        },
        fullWidth: {
            width: '100%',
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
            downloadedPlans: [],
            downloadedPlansNextToken: null,
            downloadedPlansLoading: false,
        };
    }

    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);

        if (this.state.userId) {
            this.loadCreatedPlans();
            this.loadFavoritedPlans();
            this.loadDownloadedPlans();
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

            if (
                this.props.userId !== prevProps.userId &&
                this.props.userId.length
            ) {
                this.loadCreatedPlans();
                this.loadFavoritedPlans();
                this.loadDownloadedPlans();
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
                const decoratedDownloadedPlans = this.decoratePlans(
                    this.state.downloadedPlans
                );

                this.setState({
                    createdPlans: decoratedCreatedPlans,
                    favoritedPlans: decoratedFavoritedPlans,
                    downloadedPlans: decoratedDownloadedPlans,
                });
            }
        }
    };

    private decoratePlans = (plans: Plan[]): Plan[] => {
        const mappedPlans: Plan[] = plans.map((plan) => {
            return {
                ...plan,
                requiredMaterials: this.state.materials.filter((material) => {
                    return !!plan.requiredMaterialIds.find(
                        (id) => id === material.id
                    );
                }),
                requiredTools: this.state.tools.filter((tool) => {
                    return !!plan.requiredToolIds.find((id) => id === tool.id);
                }),
                isFavoritedByUser: this.state.userFavoritedPlanIds.some(
                    (planId) => planId === plan.id
                ),
            };
        });

        return mappedPlans;
    };

    private handleNextCreatedPlanPage = async () => {
        this.loadCreatedPlans(true);
    };
    private handleNextDownloadedPlanPage = async () => {
        this.loadDownloadedPlans(true);
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
            case DashboardTabsEnum.DOWNLOADED_PLANS:
                if (!this.state.downloadedPlans.length) {
                    this.loadDownloadedPlans();
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
            this.loadDownloadedPlans();
        }, 1000);
    };

    private loadCreatedPlans = async (isNextPage: boolean = false) => {
        this.setState({
            createdPlansLoading: true,
        });

        const result = (await API.graphql(
            graphqlOperation(graphQLQueries.getUserQuery, {
                id: this.state.userId,
                limit: 5,
                nextToken: this.state.createdPlansNextToken,
            })
        )) as GraphQLResult<GetUserQuery>;

        const { createdPlans } = result.data.getUser;

        const mappedPlans = this.decoratePlans(createdPlans.items);

        this.setState((prevState) => ({
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

        const result = (await API.graphql(
            graphqlOperation(graphQLQueries.listFavoritesByUserQuery, {
                userId: this.state.userId,
                limit: 5,
                nextToken: this.state.favoritedPlansNextToken,
            })
        )) as GraphQLResult<GetFavoriteByUserIdQuery>;

        const { getFavoriteByUserId } = result.data;

        const favoritedPlans: Plan[] = [];

        for (const i in getFavoriteByUserId.items) {
            const planId = getFavoriteByUserId.items[i].planId;

            const result = (await API.graphql(
                graphqlOperation(graphQLQueries.getPlanQuery, {
                    id: planId,
                })
            )) as GraphQLResult<GetPlanQuery>;

            favoritedPlans.push(result.data.getPlan);
        }

        const mappedPlans = this.decoratePlans(favoritedPlans);

        this.setState((prevState) => ({
            ...prevState,
            favoritedPlansLoading: false,
            favoritedPlans: isNextPage
                ? prevState.favoritedPlans.concat(mappedPlans)
                : mappedPlans,
            favoritedPlansNextToken: getFavoriteByUserId.nextToken,
        }));
    };

    private loadDownloadedPlans = async (isNextPage: boolean = false) => {
        this.setState({
            downloadedPlansLoading: true,
        });

        const result = (await API.graphql(
            graphqlOperation(graphQLQueries.listDownloadsByUserQuery, {
                userId: this.state.userId,
                limit: 5,
                nextToken: this.state.downloadedPlansNextToken,
            })
        )) as GraphQLResult<GetDownloadedByUserIdQuery>;

        const { getDownloadedByUserId } = result.data;

        const downloadedPlans: Plan[] = [];

        for (const i in getDownloadedByUserId.items) {
            const planId = getDownloadedByUserId.items[i].planId;

            const result = (await API.graphql(
                graphqlOperation(graphQLQueries.getPlanQuery, {
                    id: planId,
                })
            )) as GraphQLResult<GetPlanQuery>;

            downloadedPlans.push(result.data.getPlan);
        }

        const mappedPlans = this.decoratePlans(downloadedPlans);

        this.setState((prevState) => ({
            ...prevState,
            downloadedPlansLoading: false,
            downloadedPlans: isNextPage
                ? prevState.downloadedPlans.concat(mappedPlans)
                : mappedPlans,
            downloadedPlansNextToken: getDownloadedByUserId.nextToken,
        }));
    };

    private renderCreatedPlansList = () => {
        const { classes } = this.props;

        return (
            <div className={classes.listContainer}>
                <div className={classes.listTitle}>
                    <Typography variant='h3'>My Plans</Typography>
                    <Link
                        to='/my-mtf/upload-plan'
                        className={classes.noDecorationLink}>
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
                            Upload a New Plan
                        </Button>
                    </Link>
                </div>
                <PlanGrid
                    plans={this.state.createdPlans}
                    userId={this.state.userId}
                    nextToken={this.state.createdPlansNextToken}
                    loading={this.state.createdPlansLoading}
                    emptyText='No Plans Uploaded Yet'
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

    private renderDownloadedPlansList = () => {
        const { classes } = this.props;

        return (
            <div className={classes.listContainer}>
                <div className={classes.listTitle}>
                    <Typography variant='h3'>Downloaded Plans</Typography>
                </div>
                <PlanGrid
                    plans={this.state.downloadedPlans}
                    userId={this.state.userId}
                    nextToken={this.state.downloadedPlansNextToken}
                    loading={this.state.downloadedPlansLoading}
                    emptyText='No Plans Downloaded Yet'
                    gridItemClassName={classes.gridItem}
                    onNextPage={this.handleNextDownloadedPlanPage}
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
        );
    };

    private renderAccountManagement = () => {
        return <Redirect to='my-mtf/manage-account' />;
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
                <div className={classes.dashboardContainer}>
                    <Hidden xlUp>
                        <Hidden smUp>
                            <Tabs
                                value={this.state.currentTab}
                                onChange={this.handleTabChange}
                                variant='scrollable'
                                scrollButtons='auto'>
                                <Tab
                                    label='My Uploaded Plans'
                                    icon={<CreateNewFolderSharpIcon />}
                                    value={DashboardTabsEnum.CREATED_PLANS}
                                />
                                <Tab
                                    label='My Favorited Plans'
                                    icon={<FavoriteSharpIcon />}
                                    value={DashboardTabsEnum.FAVORITED_PLANS}
                                />
                                <Tab
                                    label='My Downloaded Plans'
                                    icon={<CloudDownloadSharpIcon />}
                                    value={DashboardTabsEnum.DOWNLOADED_PLANS}
                                />
                                <Tab
                                    label='Manage My Account'
                                    icon={<AccountCircleSharpIcon />}
                                    value={DashboardTabsEnum.ACCOUNT_MANAGEMENT}
                                />
                            </Tabs>
                        </Hidden>
                        <Hidden xsDown lgUp>
                            <Tabs
                                value={this.state.currentTab}
                                onChange={this.handleTabChange}
                                centered
                                variant='fullWidth'>
                                <Tab
                                    label='My Uploaded Plans'
                                    icon={<CreateNewFolderSharpIcon />}
                                    value={DashboardTabsEnum.CREATED_PLANS}
                                />
                                <Tab
                                    label='My Favorited Plans'
                                    icon={<FavoriteSharpIcon />}
                                    value={DashboardTabsEnum.FAVORITED_PLANS}
                                />
                                <Tab
                                    label='My Downloaded Plans'
                                    icon={<CloudDownloadSharpIcon />}
                                    value={DashboardTabsEnum.DOWNLOADED_PLANS}
                                />
                                <Tab
                                    label='Manage My Account'
                                    icon={<AccountCircleSharpIcon />}
                                    value={DashboardTabsEnum.ACCOUNT_MANAGEMENT}
                                />
                            </Tabs>
                        </Hidden>
                        <Hidden mdDown>
                            <Tabs
                                className={classes.verticalTabs}
                                value={this.state.currentTab}
                                onChange={this.handleTabChange}
                                orientation='vertical'>
                                <Tab
                                    label='My Uploaded Plans'
                                    icon={<CreateNewFolderSharpIcon />}
                                    value={DashboardTabsEnum.CREATED_PLANS}
                                />
                                <Tab
                                    label='My Favorited Plans'
                                    icon={<FavoriteSharpIcon />}
                                    value={DashboardTabsEnum.FAVORITED_PLANS}
                                />
                                <Tab
                                    label='My Downloaded Plans'
                                    icon={<CloudDownloadSharpIcon />}
                                    value={DashboardTabsEnum.DOWNLOADED_PLANS}
                                />
                                <Tab
                                    label='Manage My Account'
                                    icon={<AccountCircleSharpIcon />}
                                    value={DashboardTabsEnum.ACCOUNT_MANAGEMENT}
                                />
                            </Tabs>
                        </Hidden>
                        <div className={classes.fullWidth}>
                            {this.state.currentTab ===
                                DashboardTabsEnum.CREATED_PLANS &&
                                this.renderCreatedPlansList()}
                            {this.state.currentTab ===
                                DashboardTabsEnum.FAVORITED_PLANS &&
                                this.renderFavoritedPlansList()}
                            {this.state.currentTab ===
                                DashboardTabsEnum.DOWNLOADED_PLANS &&
                                this.renderDownloadedPlansList()}
                            {this.state.currentTab ===
                                DashboardTabsEnum.ACCOUNT_MANAGEMENT &&
                                this.renderAccountManagement()}
                        </div>
                    </Hidden>
                    <Hidden lgDown>
                        {this.state.currentTab !==
                            DashboardTabsEnum.ACCOUNT_MANAGEMENT && (
                            <div className={classes.dashboardContainer}>
                                <div className={classes.linkBar}>
                                    <Link
                                        to='/my-mtf/manage-account'
                                        className={classes.noDecorationLink}>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            startIcon={
                                                <AccountCircleSharpIcon />
                                            }>
                                            Manage My Account
                                        </Button>
                                    </Link>
                                </div>
                                {this.renderCreatedPlansList()}
                                {this.renderFavoritedPlansList()}
                                {this.renderDownloadedPlansList()}
                            </div>
                        )}
                        {this.state.currentTab ===
                            DashboardTabsEnum.ACCOUNT_MANAGEMENT &&
                            this.renderAccountManagement()}
                    </Hidden>
                </div>
            );
        }
    };
}

export default withStyles(styles(mtfTheme))(Dashboard);
