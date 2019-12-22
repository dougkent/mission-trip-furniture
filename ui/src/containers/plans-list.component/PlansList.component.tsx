// React
import React from 'react';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material UI
import {
    Typography,
    Grid,
    Card,
    CardActions,
    CardContent,
} from '@material-ui/core';

// MTF
import { AppProps } from '../../models/props';
import { ListPlansQuery } from '../../models/api.models';

// Configure
Amplify.configure(aws_exports);

class PlansListComponent extends React.Component<AppProps, AppProps> {
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

    renderPlansListContent(data: ListPlansQuery): any {
        return data.listPlans.items.map(plan => (
            <Grid item>
                <Card>
                    <img src={plan.imageS3Info.key} alt='Plan Cover' />
                    <div>
                        <CardActions>
                            <div>
                                <Typography variant='h5' noWrap>
                                    {plan.name}
                                </Typography>
                            </div>
                        </CardActions>
                        <CardContent>
                            <Typography variant='body1' noWrap>
                                {plan.description}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </Grid>
        ));
    }

    renderPlansList(data: ListPlansQuery, loading: boolean): any {
        console.log(loading, data);
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
        } else if (!loading && data.listPlans.items.length > 0) {
            return <Grid container>{this.renderPlansListContent(data)}</Grid>;
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
