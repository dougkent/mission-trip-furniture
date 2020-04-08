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
    Plan,
    SearchPlansQuery,
    SearchablePlanFilterInput,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';
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
    private planFavoriteService = new PlanFavoriteService();

    constructor(props: PlanListProps) {
        super(props);

        this.state = {
            userId: props.userId,
            materials: props.materials,
            tools: props.tools,
            filterState: {
                filterMaterials: [],
                filterTools: [],
                filterCreatedAfter: null,
            },
            searchState: {
                searchTerm: null,
            },
            loading: false,
            plans: [],
            nextToken: null,
            totalCount: 0,
        };
    }
    componentDidMount() {
        ReactGA.ga('send', 'pageview', window.location.pathname);

        this.loadPlans();
    }

    componentDidUpdate(prevProps: PlanListProps) {
        if (
            this.props.userId !== prevProps.userId ||
            this.props.materials !== prevProps.materials ||
            this.props.tools !== prevProps.tools
        ) {
            this.setState({
                userId: this.props.userId,
                materials: this.props.materials,
                tools: this.props.tools,
            });
        }
    }

    private handleApplyFilter = (filterState: FilterState) => {
        this.setState(prevState => ({
            ...prevState,
            filterState: filterState,
        }));

        this.loadPlans();

        ReactGA.event({
            category: 'search',
            action: 'User Filtered Plan List',
        });
    };

    private handleSearch = async (searchState: SearchState) => {
        await this.setState(prevState => ({
            ...prevState,
            searchState: searchState,
        }));

        this.loadPlans();

        ReactGA.event({
            category: 'search',
            action: 'User Searched Plan List',
        });
    };

    private handleNextPage = () => {
        this.loadPlans(true);
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

    private loadPlans = async (isNextPage: boolean = false) => {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));

        let search: SearchablePlanFilterInput = null;

        if (this.state.searchState.searchTerm?.length) {
            const descriptionSearch: SearchablePlanFilterInput = {
                description: {
                    matchPhrase: this.state.searchState.searchTerm,
                },
            };
            const nameSearch: SearchablePlanFilterInput = {
                name: {
                    matchPhrase: this.state.searchState.searchTerm,
                },
            };

            search = {
                id: { wildcard: '*' },
                or: [nameSearch, descriptionSearch],
            };
        }

        const nextToken: string = isNextPage ? this.state.nextToken : null;

        const result: GqlQuery<SearchPlansQuery> = await API.graphql({
            query: graphQLQueries.searchPlansQuery,
            variables: {
                limit: 10,
                filter: search,
                nextToken: nextToken,
            },
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        const { searchPlans } = result.data;

        const mappedPlans = searchPlans.items.map(plan => {
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

        this.setState(prevState => ({
            ...prevState,
            loading: false,
            plans: isNextPage
                ? prevState.plans.concat(mappedPlans)
                : mappedPlans,
            nextToken: searchPlans.nextToken,
            totalCount: searchPlans.total,
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
                        materials={this.state.materials}
                        tools={this.state.tools}
                        onApply={this.handleApplyFilter}
                    />
                </div>
                <PlanGrid
                    plans={this.state.plans}
                    userId={this.state.userId}
                    nextToken={this.state.nextToken}
                    totalCount={this.state.totalCount}
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
