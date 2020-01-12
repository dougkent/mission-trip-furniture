// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator, Connect } from 'aws-amplify-react';

// Material UI
import {
    Typography,
    Grid,
    Paper,
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';

// MTF
import PlanCard from '../../components/plan-card.component/PlanCard.component';
import { signUpConfig } from '../../models/sign-up-config.model';
import { AppProps } from '../../models/props';
import { Plan } from '../../models';
import { mtfAmplifyTheme, mtfTheme } from '../../themes';
import { GetUserQuery } from '../../models/api.models';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        dashboardContainer: {
            marginTop: 40,
            [theme.breakpoints.up('lg')]: {
                display: 'flex',
                justifyContent: 'space-evenly',
            },
        },
        paper: {
            padding: 20,
            width: '100%',
            marginBottom: 40,

            [theme.breakpoints.up('lg')]: {
                padding: 40,
                minWidth: 523,
                width: 'auto',
            },
        },
        paperTitle: {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'flex-end',
            padding: 10,
        },
    });

export interface DashboardProps extends AppProps, WithStyles<typeof styles> {}

class DashboardComponent extends React.Component<DashboardProps, AppProps> {
    private getUserQuery = `query GetUser($id: ID!) {
        getUser(id: $id) {
            createdPlans {
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
                    favoritedCount
                }
            }
            favoritedPlans {
                items {
                    plan {
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
                        favoritedCount
                    }
                }
            }
        }
    }`;

    constructor(props: DashboardProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: DashboardProps) {
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

    private renderMyPlansList(data: GetUserQuery, loading: boolean): any {
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
        } else if (
            !loading &&
            data &&
            data.getUser &&
            data.getUser.createdPlans &&
            data.getUser.createdPlans.items &&
            data.getUser.createdPlans.items.length
        ) {
            return (
                <Grid container spacing={2}>
                    {data.getUser.createdPlans.items.map(plan => (
                        <PlanCard plan={this.toPlanModel(plan)} />
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Created Yet</Typography>;
        }
    }

    private renderFavoritedPlansList(
        data: GetUserQuery,
        loading: boolean
    ): any {
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
        } else if (
            !loading &&
            data &&
            data.getUser &&
            data.getUser.favoritedPlans &&
            data.getUser.favoritedPlans.items &&
            data.getUser.favoritedPlans.items.length
        ) {
            return (
                <Grid container spacing={2}>
                    {data.getUser.favoritedPlans.items.map(plan => (
                        <PlanCard plan={this.toPlanModel(plan)} />
                    ))}
                </Grid>
            );
        } else {
            return <Typography variant='h4'>No Plans Favorited Yet</Typography>;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <div className={classes.dashboardContainer}>
                    <Connect
                        query={graphqlOperation(this.getUserQuery, {
                            id: this.state.userId,
                        })}>
                        {({
                            data,
                            loading,
                        }: {
                            data: GetUserQuery;
                            loading: boolean;
                        }) => {
                            return (
                                <>
                                    <div className={classes.paper}>
                                        <div className={classes.paperTitle}>
                                            <Typography variant='h2'>
                                                My Plans
                                            </Typography>
                                            <Link
                                                to='/my-mtf/create-plan'
                                                className='nav-item'>
                                                <AddCircleSharpIcon
                                                    color='secondary'
                                                    fontSize='large'
                                                />
                                            </Link>
                                        </div>

                                        {this.renderMyPlansList(data, loading)}
                                    </div>
                                    <div className={classes.paper}>
                                        <Typography variant='h2'>
                                            Favorited Plans
                                        </Typography>
                                        {this.renderFavoritedPlansList(
                                            data,
                                            loading
                                        )}
                                    </div>
                                </>
                            );
                        }}
                    </Connect>
                </div>
            </>
        );
    }
}

export default withStyles(styles(mtfTheme))(
    withAuthenticator(DashboardComponent, {
        signUpConfig: signUpConfig,
        theme: mtfAmplifyTheme,
    })
);
