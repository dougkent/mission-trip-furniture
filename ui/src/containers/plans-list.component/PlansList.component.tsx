// React
import React from 'react';

// AWS
import Amplify, { graphqlOperation } from 'aws-amplify';
import { Connect, S3Image } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material UI
import {
    Typography,
    Grid,
    Card,
    CardActions,
    CardContent,
    createStyles,
    Theme,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// MTF
import { AppProps } from '../../models/props';
import { ListPlansQuery } from '../../models/api.models';
import { mtfTheme } from '../../themes';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        image: {
            width: '100%',
            height: 100,
            [theme.breakpoints.up('sm')]: {
                width: 200,
                height: 200,
            },
            '& img': {
                width: '100%',
                height: 100,
                objectFit: 'cover',
                [theme.breakpoints.up('sm')]: {
                    width: 200,
                    height: 200,
                },
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        cardContent: {
            maxWidth: 260,
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: 175,
            alignItems: 'center',
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
    });

export interface PlanListProps extends AppProps, WithStyles<typeof styles> {}

class PlansListComponent extends React.Component<PlanListProps> {
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

    renderPlansListContent(data: ListPlansQuery): any {
        const { classes } = this.props;

        return data.listPlans.items.map(plan => (
            <Grid item>
                <Card className={classes.card}>
                    <div className={classes.image}>
                        <S3Image
                            level='protected'
                            imgKey={plan.imageS3Info.key}
                        />
                    </div>
                    <div className={classes.cardContentContainer}>
                        <CardActions className={classes.cardActions}>
                            <div className={classes.cardTitle}>
                                <Typography variant='h5' noWrap>
                                    {plan.name}
                                </Typography>
                            </div>
                        </CardActions>
                        <CardContent className={classes.cardContent}>
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
        if (loading) {
            return <Typography variant='h4'>Loading...</Typography>;
        } else if (!loading && data.listPlans.items.length > 0) {
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

export default withStyles(styles(mtfTheme))(PlansListComponent);
