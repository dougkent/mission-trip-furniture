// React
import React from 'react';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material UI
import {
    CircularProgress,
    createStyles,
    Grid,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// MTF
import PlanCard from '../../components/plan-card.component/PlanCard.component';
import Search from '../../components/search.component/Search.component';
import Filter from '../../components/filter.component/Filter.component';
import { AppProps } from '../../models/props';
import { FilterState, PlanListState, SearchState } from '../../models/states';
import {
    GqlQuery,
    ListPlansQuery,
    Material,
    Tool,
    Plan,
} from '../../models/api-models';
import { mtfTheme } from '../../themes';
import { PlanFavoriteService } from '../../services';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        loading: {
            margin: `${theme.spacing(4)}px auto`,
            width: theme.spacing(12),
        },
        plansListContainer: {
            marginTop: theme.spacing(4),
        },
        searchFilterBar: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                flexWrap: 'wrap',
            },
        },
    });

export interface PlanListProps extends AppProps, WithStyles<typeof styles> {}

class PlansList extends React.Component<PlanListProps, PlanListState> {
    private listPlansQuery = `query ListPlans {
        listPlans {
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
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: PlanListProps) {
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
        } else {
            await this.planFavoriteService.deleteFavorite(
                planId,
                this.state.userId
            );
        }
    };

    private handleApplyFilter = (filterState: FilterState) => {
        this.setState(prevState => ({
            ...prevState,
            filterState: filterState,
        }));
    };

    private handleSearch = (searchState: SearchState) => {
        this.setState(prevState => ({
            ...prevState,
            searchState: searchState,
        }));
    };

    private isFavoritedByUser = (plan: Plan): boolean => {
        return this.planFavoriteService.isFavoritedByUser(
            this.state.userId,
            plan
        );
    };

    private getFilterMaterials = (data: ListPlansQuery): Material[] => {
        return data.listPlans.items
            .map(plan => {
                return plan.materialsRequired.items.map(
                    planMaterial => planMaterial.material
                );
            })
            .reduce((materials1, materials2) => materials1.concat(materials2));
    };

    private getFilterTools = (data: ListPlansQuery): Tool[] => {
        return data.listPlans.items
            .map(plan => {
                return plan.toolsRequired.items.map(planTool => planTool.tool);
            })
            .reduce((tools1, tools2) => tools1.concat(tools2));
    };

    private renderPlansList = (data: ListPlansQuery) => {
        return (
            <Grid container spacing={2}>
                {data.listPlans.items.map(plan => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        userId={this.state.userId}
                        isFavoritedByUser={this.isFavoritedByUser(plan)}
                        onToggleFavorite={this.handleTogglePlanFavorite}
                    />
                ))}
            </Grid>
        );
    };

    private renderPlans = (data: ListPlansQuery, loading: boolean) => {
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
            data.listPlans &&
            data.listPlans.items &&
            data.listPlans.items.length
        ) {
            return (
                <>
                    {this.renderSearchAndFilter(data)}
                    {this.renderPlansList(data)}
                </>
            );
        } else {
            return <Typography variant='h4'>No Plans Found</Typography>;
        }
    };

    private renderSearchAndFilter = (data: ListPlansQuery) => {
        const { classes } = this.props;

        return (
            <div className={classes.searchFilterBar}>
                <Search
                    searchState={this.state.searchState}
                    onSearch={this.handleSearch}
                />
                <Filter
                    filterState={this.state.filterState}
                    materials={this.getFilterMaterials(data)}
                    tools={this.getFilterTools(data)}
                    onApply={this.handleApplyFilter}
                />
            </div>
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.plansListContainer}>
                <Typography variant='h2'>Plans</Typography>

                <Connect query={graphqlOperation(this.listPlansQuery)}>
                    {({ data, loading }: GqlQuery<ListPlansQuery>) => {
                        return this.renderPlans(data, loading);
                    }}
                </Connect>
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(PlansList);
