// React
import React from 'react';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material UI
import { Typography, Grid } from '@material-ui/core';

// MTF
import PlanCard from '../../components/plan-card.component/PlanCard.component';
//import { Plan } from '../../models';
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { GqlQuery, ListPlansQuery } from '../../models/api-models';

// Configure
Amplify.configure(aws_exports);

class PlansListComponent extends React.Component<AppProps, AppState> {
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
            }
        }
    }`;

    constructor(props: AppProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: AppProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }
    private handleTogglePlanFavorite(
        planId: string,
        toggleFavOn: boolean
    ): void {}
    private renderPlansList(data: ListPlansQuery, loading: boolean): any {
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
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
        return (
            <>
                <Typography variant='h2'>Plans</Typography>
                <Connect query={graphqlOperation(this.listPlansQuery)}>
                    {({ data, loading }: GqlQuery<ListPlansQuery>) => {
                        return this.renderPlansList(data, loading);
                    }}
                </Connect>
            </>
        );
    }
}

export default PlansListComponent;
