// React
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import {
    Button,
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

//MTF
import { AppProps } from '../../models/props';
import { AppState } from '../../models/states';
import { mtfTheme } from '../../themes';

const styles = (theme: Theme) =>
    createStyles({
        aboutContainer: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('lg')]: {
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        actionsRow: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            marginBottom: theme.spacing(2),
        },
        actionItem: {
            width: '100%',
            marginBottom: theme.spacing(1),
        },

        actionItemLink: {
            textDecoration: 'none',
        },
        actionItemButton: {
            border: `2px solid ${theme.palette.secondary.main}`,
            padding: '10px 20px',
            '&:hover': {
                border: `2px solid ${theme.palette.secondary.main}`,
            },
        },
        actionItemText: {
            textTransform: 'none',
        },
        superScript: {
            fontSize: '0.55rem',
        },
    });

export interface AboutProps extends AppProps, WithStyles<typeof styles> {}

class HomeComponent extends React.Component<AboutProps, AppState> {
    constructor(props: AboutProps) {
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
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.aboutContainer}>
                <Typography variant='h3'>The Mission</Typography>
                <Typography variant='body1' paragraph>
                    Mission Trip Furniture is a website dedicated to the
                    distribution of free furniture plans to those seeking
                    projects for mission trips of any length. Mission Trip
                    Furniture is run by Doug Kent of Kent Craftsmanship
                    (handmade furniture in Texas). The idea for this website
                    came from personal experience when looking for plans to
                    build bunk-beds for an orphanage in Haiti. He had the idea
                    of creating a database of searchable free plans specifically
                    designed to use in impoverished areas with limited
                    resources. Doug is a programmer during the day and thus, had
                    the skills to craft a platform to host such a database.
                </Typography>
                <Typography variant='body1' paragraph>
                    Short-term mission trips are tricky endeavors. There is the
                    obvious trickiness of location (this is especially the case
                    for international missions). The less obvious complexities
                    are the ones surrounding the effectiveness of short-term
                    missions in less affluent communities.
                    <sup className={classes.superScript}>1</sup> Doug has the
                    belief that one of the ways short-term mission trips can be
                    extremely effective is through furniture projects.
                </Typography>
                <Typography variant='body1' paragraph>
                    Furniture projects not only provide the finished pieces to
                    the communities, they are also methods in which you, the
                    missionaries, are able to bring knowledge and skill
                    development to those communities. Some of the areas of
                    knowledge that we are able to bring are solid construction
                    principles, power tool usage and safety, and some structural
                    engineering concepts.
                </Typography>
                <div className={classes.actionsRow}>
                    <Typography variant='h5' className={classes.actionItem}>
                        To Upload Your Own Plans
                    </Typography>
                    <div className={classes.actionItem}>
                        <Link to='/my-mtf' className={classes.actionItemLink}>
                            <Button
                                variant='outlined'
                                color='secondary'
                                size='large'
                                className={classes.actionItemButton}>
                                <Typography
                                    variant='h5'
                                    className={classes.actionItemText}>
                                    {(() => {
                                        if (this.props.userId) {
                                            return 'Go To My Dashboard';
                                        } else {
                                            return 'Sign In or Create an Account';
                                        }
                                    })()}
                                </Typography>
                            </Button>
                        </Link>
                    </div>
                    <Typography variant='h5' className={classes.actionItem}>
                        or
                    </Typography>
                    <div className={classes.actionItem}>
                        <Link to='/plans' className={classes.actionItemLink}>
                            <Button
                                variant='outlined'
                                color='secondary'
                                size='large'
                                className={classes.actionItemButton}>
                                <Typography
                                    variant='h5'
                                    className={classes.actionItemText}>
                                    Search Plans
                                </Typography>
                            </Button>
                        </Link>
                    </div>
                </div>
                <Typography variant='caption'>
                    <sup>1</sup>There are other resources that do a better job
                    of explaining those complexities, and Mission Trip Furniture
                    is not here to supplement those explanations.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(HomeComponent);
