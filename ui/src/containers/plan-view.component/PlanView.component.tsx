// React
import React from 'react';

// AWS
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    Button,
    Chip,
    CircularProgress,
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// MTF
import { AppProps } from '../../models/props';
import { ViewPlanState } from '../../models/states';
import { GqlQuery, GetPlanQuery } from '../../models/api-models';
import { mtfTheme } from '../../themes';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        loading: {
            margin: `${theme.spacing(4)}px auto`,
            width: theme.spacing(12),
        },
        viewPlanContainer: {
            marginTop: 40,
            display: 'flex',
            flexWrap: 'wrap',
        },
        title: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        image: {
            width: '100%',
            height: theme.spacing(25),
            [theme.breakpoints.up('sm')]: {
                width: '50%',
                height: theme.spacing(25),
            },
            [theme.breakpoints.up('lg')]: {
                height: '100%',
            },
            '& img': {
                width: '100%',
                height: theme.spacing(25),
                objectFit: 'cover',
                [theme.breakpoints.up('lg')]: {
                    height: '700px',
                },
            },
        },

        planContent: {
            width: '100%',
            padding: `0 ${theme.spacing(2)}px`,
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
        },
        row: {
            width: '100%',
            flexGrow: 1,
            marginBottom: `${theme.spacing(2)}px`,
            display: 'flex',
        },
        rowTitle: {
            marginRight: theme.spacing(1),
        },
        descriptionTitle: {
            marginTop: theme.spacing(3),
        },
        buttonRow: {
            marginTop: theme.spacing(3),
        },
    });

export interface ViewPlanProps extends AppProps, WithStyles<typeof styles> {
    planId: string;
}
class PlanViewComponent extends React.Component<ViewPlanProps, ViewPlanState> {
    private getPlanQuery = `query GetPlan($id: ID!) {
        getPlan(id: $id) {
            id
            name
            description
            pdfS3Key
            imageS3Info {
                key   
            }
            created
            createdBy {
                id
                username
            }
            favoritedCount
            materialsRequired {
                items {
                    material {
                        name
                    }
                }
            }
            toolsRequired {
                items {
                    tool {
                        name
                    }
                }
            }
        }
    }`;

    constructor(props: ViewPlanProps) {
        super(props);

        this.state = {
            plan: null,
            planId: props.planId,
            userId: props.userId,
            downloadUrl: null,
            loading: true,
        };
    }

    async componentDidMount() {
        const planResult: GqlQuery<GetPlanQuery> = await API.graphql(
            graphqlOperation(this.getPlanQuery, {
                id: this.props.planId,
            })
        );

        const downloadUrl = await Storage.get(
            planResult.data.getPlan.pdfS3Key,
            {
                level: 'protected',
                identityId: planResult.data.getPlan.createdBy.id,
            }
        );

        console.log(downloadUrl);

        this.setState(prevState => ({
            ...prevState,
            planId: this.props.planId,
            plan: planResult.data.getPlan,
            downloadUrl: downloadUrl as string,
            loading: false,
        }));
    }

    componentDidUpdate(prevProps: ViewPlanProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState(prevState => ({
                ...prevState,
                userId: this.props.userId,
            }));
        }
    }

    render() {
        const { classes } = this.props;

        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        } else {
            return (
                <div className={classes.viewPlanContainer}>
                    <Typography variant='h2' className={classes.title}>
                        {this.state.plan.name}
                    </Typography>
                    <div className={classes.image}>
                        <S3Image
                            level='protected'
                            imgKey={this.state.plan.imageS3Info.key}
                            identityId={this.state.plan.createdBy.id}
                        />
                    </div>
                    <div className={classes.planContent}>
                        <div className={classes.row}>
                            <Typography
                                variant='subtitle1'
                                className={classes.rowTitle}>
                                Materials:
                            </Typography>
                            {this.state.plan.materialsRequired?.items?.map(
                                planMaterial => (
                                    <Chip
                                        size='small'
                                        color='secondary'
                                        label={planMaterial.material.name}
                                    />
                                )
                            )}
                        </div>
                        <div className={classes.row}>
                            <Typography
                                variant='subtitle1'
                                className={classes.rowTitle}>
                                Tools:
                            </Typography>
                            {this.state.plan.toolsRequired?.items?.map(
                                planTool => (
                                    <Chip
                                        size='small'
                                        color='secondary'
                                        label={planTool.tool.name}
                                    />
                                )
                            )}
                        </div>
                        <Typography
                            variant='h5'
                            className={classes.descriptionTitle}>
                            Description
                        </Typography>
                        <Typography variant='body1' className={classes.row}>
                            {this.state.plan.description}
                        </Typography>
                        <div className={classes.buttonRow}>
                            <Button
                                color='secondary'
                                variant='contained'
                                href={this.state.downloadUrl}
                                target='_blank'>
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(styles(mtfTheme))(PlanViewComponent);
