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
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { GqlQuery, ListPlansQuery } from '../../models/api-models';
import { mtfTheme } from '../../themes';

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
    });

export interface PlanListProps extends AppProps, WithStyles<typeof styles> {}

class PlansList extends React.Component<PlanListProps, AppState> {
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
                created
                createdBy {
                    id
                    username
                }
                favoritedCount
                favoritedBy  {
                    items {
                        user {
                            id
                        }
                    }
                }
                downloadedCount
            }
        }
    }`;

    constructor(props: PlanListProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: PlanListProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }
    private handleTogglePlanFavorite(
        planId: string,
        toggleFavOn: boolean
    ): void {}
    private renderPlansList(data: ListPlansQuery, loading: boolean): any {
        const { classes } = this.props;

        if (loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        } else if (!loading && data && data.listPlans && data.listPlans.items) {
            return (
                <Grid container spacing={2}>
                    {data.listPlans.items.map(plan => (
                        <PlanCard
                            plan={plan}
                            userId={this.state.userId}
                            onToggleFavorite={this.handleTogglePlanFavorite}
                        />
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Found</Typography>;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.plansListContainer}>
                <Typography variant='h2'>Plans</Typography>
                <Connect query={graphqlOperation(this.listPlansQuery)}>
                    {({ data, loading }: GqlQuery<ListPlansQuery>) => {
                        return this.renderPlansList(data, loading);
                    }}
                </Connect>
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(PlansList);
