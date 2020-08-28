// React
import React from 'react';

// AWS
import { API } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

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
    Plan,
    SearchPlansQuery,
    SearchablePlanFilterInput,
    SearchablePlanSortInput,
    SearchablePlanSortableFieldsEnum,
    SearchableSortDirectionEnum,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';

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
            [theme.breakpoints.up('lg')]: {
                width: theme.spacing(63),
            },
        },
    });

export interface PlanListProps extends AppProps, WithStyles<typeof styles> {}

class PlansList extends React.Component<PlanListProps, PlanListState> {
    constructor(props: PlanListProps) {
        super(props);

        this.state = {
            userId: props.userId,
            materials: props.materials,
            tools: props.tools,
            userFavoritedPlanIds: props.userFavoritedPlanIds,
            filterState: {
                filterMaterials: [],
                filterTools: [],
                filterCreatedAfter: null,
                sortProperty: SearchablePlanSortableFieldsEnum.created,
                sortDirection: SearchableSortDirectionEnum.desc,
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
    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);

        this.loadPlans();
    };

    componentDidUpdate = async (prevProps: PlanListProps) => {
        if (this.props.userId !== prevProps.userId) {
            await this.setState({
                userId: this.props.userId,
            });
        }

        if (
            this.props.materials !== prevProps.materials ||
            this.props.tools !== prevProps.tools
        ) {
            await this.setState({
                materials: this.props.materials,
                tools: this.props.tools,
            });

            const decoratedPlans = this.decoratePlans(this.state.plans);

            this.setState({
                plans: decoratedPlans,
            });
        }

        if (
            this.props.userFavoritedPlanIds !== prevProps.userFavoritedPlanIds
        ) {
            await this.setState({
                userFavoritedPlanIds: this.props.userFavoritedPlanIds,
            });

            const decoratedPlans = this.decoratePlans(this.state.plans);

            this.setState({
                plans: decoratedPlans,
            });
        }
    };
    private buildSearch = (): SearchablePlanFilterInput => {
        let search: SearchablePlanFilterInput = null;

        if (this.state.searchState.searchTerm?.length) {
            search = {
                or: [
                    {
                        name: {
                            matchPhrase: this.state.searchState.searchTerm,
                        },
                    },
                    {
                        name: {
                            matchPhrasePrefix: this.state.searchState
                                .searchTerm,
                        },
                    },
                    {
                        name: {
                            wildcard:
                                '*' + this.state.searchState.searchTerm + '*',
                        },
                    },
                    {
                        description: {
                            matchPhrase: this.state.searchState.searchTerm,
                        },
                    },
                    {
                        description: {
                            matchPhrasePrefix: this.state.searchState
                                .searchTerm,
                        },
                    },
                    {
                        description: {
                            wildcard:
                                '*' + this.state.searchState.searchTerm + '*',
                        },
                    },
                ],
            };
        }

        if (this.state.filterState.filterMaterials.length) {
            let materialSearch = this.state.filterState.filterMaterials.map(
                (material): SearchablePlanFilterInput => {
                    return {
                        requiredMaterialIds: {
                            eq: material.id,
                        },
                    };
                }
            );

            if (search?.and) {
                materialSearch = [...search.and, ...materialSearch];
            }

            search = { ...search, and: [...materialSearch] };
        }

        if (this.state.filterState.filterTools.length) {
            let toolSearch = this.state.filterState.filterTools.map(
                (tool): SearchablePlanFilterInput => {
                    return {
                        requiredToolIds: {
                            eq: tool.id,
                        },
                    };
                }
            );

            if (search?.and) {
                toolSearch = [...search.and, ...toolSearch];
            }

            search = { ...search, and: [...toolSearch] };
        }

        if (this.state.filterState.filterCreatedAfter) {
            let createdSearch: SearchablePlanFilterInput[] = [
                {
                    created: {
                        gte: this.state.filterState.filterCreatedAfter.toISOString(),
                    },
                },
            ];

            if (search?.and) {
                createdSearch = [...search.and, ...createdSearch];
            }

            search = { ...search, and: [...createdSearch] };
        }

        return search;
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

    private handleApplyFilter = async (filterState: FilterState) => {
        await this.setState({
            filterState: filterState,
        });

        this.loadPlans();

        ReactGA.event({
            category: 'search',
            action: 'User Filtered Plan List',
        });
    };

    private handleSearch = async (searchState: SearchState) => {
        await this.setState({
            searchState: searchState,
        });

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
        ReactGA.event({
            category: 'favorite',
            action: toggleFavOn
                ? 'User Favorited Plan'
                : 'User Unfavorited Plan',
            label: 'favorite on plan list page',
        });

        this.props.onPlanFavorite(planId, toggleFavOn);
    };

    private loadPlans = async (isNextPage: boolean = false) => {
        this.setState({
            loading: true,
        });

        const search = this.buildSearch();

        const sort: SearchablePlanSortInput = {
            field: this.state.filterState.sortProperty,
            direction: this.state.filterState.sortDirection,
        };

        const nextToken: string = isNextPage ? this.state.nextToken : null;

        const result = (await API.graphql({
            query: graphQLQueries.searchPlansQuery,
            variables: {
                limit: 10,
                filter: search,
                sort: sort,
                nextToken: nextToken,
            },
            authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })) as GraphQLResult<SearchPlansQuery>;

        const { searchPlans } = result.data;

        const mappedPlans = this.decoratePlans(searchPlans.items);

        this.setState((prevState) => ({
            ...prevState,
            loading: false,
            plans: isNextPage
                ? prevState.plans.concat(mappedPlans)
                : mappedPlans,
            nextToken: searchPlans.nextToken,
            totalCount: searchPlans.total,
        }));
    };
    render = () => {
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
                        onClear={this.handleApplyFilter}
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
                    onTogglePlanFavorite={this.handleTogglePlanFavorite}
                />
            </div>
        );
    };
}

export default withStyles(styles(mtfTheme))(PlansList);
