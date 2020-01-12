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
import { Plan } from '../../models';
import { AppProps } from '../../models/props';
import { ListPlansQuery } from '../../models/api.models';

// Configure
Amplify.configure(aws_exports);

class PlansListComponent extends React.Component<AppProps> {
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
                favoritedCount
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
    private toPlanModel(plan: any): Plan {
        return {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            pdfS3Key: plan.pdfS3Key,
            imageS3Info: {
                key: plan.imageS3Info.key,
            },
            createdDate: plan.created,
            createdBy: plan.createdBy == null ? '' : plan.createdBy.username,
            toolsRequired: [],
            materialsRequired: [],
            favoritedBy: [],
        };
    }

    private renderPlansListContent(data: ListPlansQuery): any {
        return data.listPlans.items.map(plan => (
            <PlanCard plan={this.toPlanModel(plan)} />
        ));
    }

    private renderPlansList(data: ListPlansQuery, loading: boolean): any {
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
        } else if (!loading && data && data.listPlans && data.listPlans.items) {
            return (
                <Grid container spacing={2}>
                    {this.renderPlansListContent(data)}
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
                    {({
                        data,
                        loading,
                    }: {
                        data: ListPlansQuery;
                        loading: boolean;
                    }) => {
                        return this.renderPlansList(data, loading);
                    }}
                </Connect>
            </>
        );
    }
}

export default PlansListComponent;
