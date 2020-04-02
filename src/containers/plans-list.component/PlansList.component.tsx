// React
import React from 'react';

// AWS
import { API } from 'aws-amplify';

// Material UI
import {
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { FilterState, PlanListState, SearchState } from '../../models/states';
import { mtfTheme } from '../../themes';
import { Filter, PlanGrid, Search } from '../../components';
import {
    GqlQuery,
    SearchPlansQuery,
    Material,
    Tool,
    Plan,
} from '../../models/api-models';
import { PlanFavoriteService } from '../../services';

const styles = (theme: Theme) =>
    createStyles({
        loading: {
            margin: `${theme.spacing(4)}px auto`,
            width: theme.spacing(12),
        },
        plansListContainer: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(2),
        },
        searchFilterBar: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                flexWrap: 'wrap',
            },
        },
        gridItem: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
            [theme.breakpoints.up('md')]: {
                height: theme.spacing(29),
            },
            [theme.breakpoints.up('lg')]: {
                width: theme.spacing(63),
            },
        },
    });

export interface PlanListProps extends AppProps, WithStyles<typeof styles> {}

class PlansList extends React.Component<PlanListProps, PlanListState> {
    private searchPlansQuery = `query SearchPlans($limit: Int!, $nextToken: String) {
        searchPlans(limit: $limit, nextToken: $nextToken) {
            nextToken
            items {
                id
                name
                description
                imageS3Info {
                    key
                    width
                    height
                }
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
            }
        }
    }`;

    private planFavoriteService = new PlanFavoriteService();

    constructor(props: PlanListProps) {
        super(props);

        this.state = {
            filterState: {
                filterMaterials: [],
                filterTools: [],
                filterFavoritedByUser: false,
                filterDownloadedByUser: false,
                filterCreatedByUser: false,
                filterCreatedRangeStart: null,
                filterCreatedRangeEnd: null,
            },
            searchState: {
                searchTerm: null,
            },
            loading: false,
            plans: [],
            nextToken: null,
            userId: props.userId,
        };
    }

    async componentDidMount() {
        this.loadPlans();

        ReactGA.ga('send', 'pageview', window.location.pathname);
    }

    componentDidUpdate(prevProps: PlanListProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    private getFilterMaterials = (): Material[] => {
        if (!this.state.plans.length) return [];

        return this.state.plans
            .map(plan => {
                return plan.materialsRequired.items.map(
                    planMaterial => planMaterial.material
                );
            })
            .reduce((materials1, materials2) => materials1.concat(materials2));
    };

    private getFilterTools = (): Tool[] => {
        if (!this.state.plans.length) return [];

        return this.state.plans
            .map(plan => {
                return plan.toolsRequired.items.map(planTool => planTool.tool);
            })
            .reduce((tools1, tools2) => tools1.concat(tools2));
    };

    private handleApplyFilter = (filterState: FilterState) => {
        this.setState(prevState => ({
            ...prevState,
            filterState: filterState,
        }));

        ReactGA.event({
            category: 'search',
            action: 'User Filtered Plan List',
        });
    };

    private handleSearch = (searchState: SearchState) => {
        this.setState(prevState => ({
            ...prevState,
            searchState: searchState,
        }));

        ReactGA.event({
            category: 'search',
            action: 'User Searched Plan List',
        });
    };

    private handleNextPage = () => {
        this.loadPlans();
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

    private isFavoritedByUser = (plan: Plan): boolean => {
        return this.planFavoriteService.isFavoritedByUser(
            this.state.userId,
            plan
        );
    };

    private loadPlans = async () => {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));

        const result: GqlQuery<SearchPlansQuery> = await API.graphql({
            query: this.searchPlansQuery,
            variables: {
                limit: 10,
                nextToken: this.state.nextToken,
            },
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        const { searchPlans } = result.data;

        this.setState(prevState => ({
            ...prevState,
            loading: false,
            plans: prevState.plans.concat(searchPlans.items),
            nextToken: searchPlans.nextToken,
        }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.plansListContainer}>
                <Typography variant='h2'>Plans</Typography>
                <div className={classes.searchFilterBar}>
                    <Search
                        searchState={this.state.searchState}
                        onSearch={this.handleSearch}
                    />
                    <Filter
                        filterState={this.state.filterState}
                        materials={this.getFilterMaterials()}
                        tools={this.getFilterTools()}
                        onApply={this.handleApplyFilter}
                    />
                </div>
                <PlanGrid
                    plans={this.state.plans}
                    userId={this.state.userId}
                    nextToken={this.state.nextToken}
                    loading={this.state.loading}
                    emptyText='No Plans Found'
                    gridItemClassName={classes.gridItem}
                    onNextPage={this.handleNextPage}
                    isFavoritedByUser={this.isFavoritedByUser}
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(PlansList);
