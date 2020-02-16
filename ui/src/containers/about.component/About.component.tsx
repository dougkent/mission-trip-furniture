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
import * as workingTogether1Image from '../../assets/working-together-1.jpg';
import * as workingTogether2Image from '../../assets/working-together-2.jpg';

const styles = (theme: Theme) =>
    createStyles({
        aboutContainer: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('lg')]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        title: {
            marginBottom: theme.spacing(2),
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
        list: {
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(2),
            margin: 0,
            [theme.breakpoints.up('md')]: {
                paddingLeft: theme.spacing(4),
            },
            '& li': {
                marginBottom: theme.spacing(1),
            },
        },
        flex: {
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        workingTogetherImage1: {
            background: `url(${workingTogether1Image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },

        workingTogetherImage1Mobile: {
            height: '350px',

            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        workingTogetherImage1Desktop: {
            display: 'none',
            marginLeft: theme.spacing(4),

            [theme.breakpoints.up('sm')]: {
                display: 'block',
                height: '500px',
                width: '50%',
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
            },
            [theme.breakpoints.up('md')]: {
                height: '450px',
            },
        },
        workingTogetherImage2: {
            background: `url(${workingTogether2Image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        workingTogetherImage2Mobile: {
            height: '200px',

            [theme.breakpoints.up('sm')]: {
                height: '300px',
            },
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        workingTogetherImage2Desktop: {
            display: 'none',
            marginRight: theme.spacing(4),
            marginBottom: theme.spacing(4),

            [theme.breakpoints.up('md')]: {
                display: 'block',
                height: '300px',
                width: '50%',
            },
        },
        workingTogetherImageMobile: {
            width: '100%',
            marginBottom: theme.spacing(1),
        },
        wrappedRight: {
            [theme.breakpoints.up('md')]: {
                width: '60%',
            },
            [theme.breakpoints.up('xl')]: {
                width: '70%',
            },
        },
        wrappedLeft: {
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
            [theme.breakpoints.up('md')]: {
                width: '60%',
            },
            [theme.breakpoints.up('xl')]: {
                width: '70%',
            },
        },
    });

export interface AboutProps extends AppProps, WithStyles<typeof styles> {}

class AboutComponent extends React.Component<AboutProps, AppState> {
    constructor(props: AboutProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: AboutProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.aboutContainer}>
                <Typography variant='h3' className={classes.title}>
                    The Mission
                </Typography>
                <div className={classes.actionsRow}>
                    <Button color='secondary' size='large' href='#get-started'>
                        <Typography variant='h6'>
                            Click Here to Get Started Or Read Below to Find Out
                            More
                        </Typography>
                    </Button>
                </div>
                <div className={classes.flex}>
                    <div
                        className={`${classes.workingTogetherImage2} ${classes.workingTogetherImage2Desktop}`}></div>
                    <div className={classes.wrappedRight}>
                        <Typography variant='body1' paragraph>
                            Mission Trip Furniture is a website dedicated to the
                            distribution of free furniture plans to those
                            seeking projects for mission trips of any length.
                            Mission Trip Furniture is run by Doug Kent of Kent
                            Craftsmanship (handmade furniture in Texas). The
                            idea for this website came from personal experience
                            when looking for plans to build bunk-beds for an
                            orphanage in Haiti. He had the idea of creating a
                            database of searchable free plans specifically
                            designed to use in impoverished areas with limited
                            resources. Doug is a programmer during the day and
                            thus, had the skills to craft a platform to host
                            such a database.
                        </Typography>
                        <div
                            className={`${classes.workingTogetherImage2} ${classes.workingTogetherImageMobile} ${classes.workingTogetherImage2Mobile}`}></div>
                        <Typography variant='body1' paragraph>
                            Short-term mission trips are tricky endeavors. There
                            is the obvious trickiness of location (this is
                            especially the case for international missions). The
                            less obvious complexities are the ones surrounding
                            the effectiveness of short-term missions in less
                            affluent communities.
                            <sup className={classes.superScript}>1</sup> Doug
                            has the belief that one of the ways short-term
                            mission trips can be extremely effective is through
                            furniture projects.
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Furniture projects not only provide the finished
                            pieces to the communities, they are also methods in
                            which you, the missionaries, are able to bring
                            knowledge and skill development to those
                            communities. Some of the areas of knowledge that we
                            are able to bring are solid construction principles,
                            power tool usage and safety, and some structural
                            engineering concepts.
                        </Typography>
                    </div>
                </div>
                <div className={classes.actionsRow}>
                    <Button color='secondary' size='large' href='#get-started'>
                        <Typography variant='h6'>
                            Click Here to Get Started Or Continue Reading Below
                            to Find Out More
                        </Typography>
                    </Button>
                </div>
                <div
                    className={`${classes.workingTogetherImage1} ${classes.workingTogetherImageMobile} ${classes.workingTogetherImage1Mobile}`}></div>
                <Typography variant='h4'>Recommendations</Typography>
                <Typography variant='body1'>
                    Mission Trip Furniture recommends some guiding principles to
                    maximize the effectiveness of your mission trip:
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.wrappedLeft}>
                        <Typography variant='body1' paragraph>
                            <ul className={classes.list}>
                                <li>
                                    Utilize Local Skilled Labor: In Haiti, Doug
                                    hired a couple of local carpenters to shadow
                                    him and the rest of the missionaries in an
                                    effort to teach them the necessary skills
                                    for future work.
                                </li>
                                <li>
                                    Utilize Local Unskilled Labor: One area this
                                    is extremely effective is with sanding and
                                    painting/staining the furniture. It can all
                                    be done by hand and takes almost no skill.
                                    Protip: One of the missionaries will need to
                                    quality check the pieces they are working on
                                    so that they meet your standards.
                                </li>
                                <li>
                                    Pay for the Local Labor: Especially those
                                    who might normally have a tough time finding
                                    a job (i.e., women and children). This is
                                    another way that more affluent missionaries
                                    are able to build up the communities they
                                    are supporting.
                                </li>
                                <li>
                                    Utilize Local Materials Suppliers: This is
                                    another way you are able to build up the
                                    communities in which you are serving. You
                                    might not be able to acquire all the
                                    materials you need in the community so be
                                    prepared that you might need to bring some
                                    materials with you (i.e., Screws, Bolts,
                                    Nuts)
                                </li>
                                <li>
                                    Bring Tools With You: Most likely they will
                                    not have good tools in the mission area.
                                    Some examples are drills, circular saws,
                                    tape measures.
                                </li>
                                <li>
                                    Pick a Community and Stick with Them:
                                    Returning to the same community
                                    year-after-year will build wonderful
                                    relationships and give you the opportunity
                                    to repair any furniture pieces that become
                                    damaged.
                                </li>
                            </ul>
                        </Typography>
                    </div>
                    <div
                        className={`${classes.workingTogetherImage1} ${classes.workingTogetherImage1Desktop}`}></div>
                </div>
                <div id='get-started' className={classes.actionsRow}>
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
                <Typography variant='caption' paragraph>
                    <sup>1</sup>There are other resources that do a better job
                    of explaining those complexities. Mission Trip Furniture is
                    not here to supplement those explanations; however is is
                    here to provide some free resources to those trying to plan
                    a mission trip.
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles(mtfTheme))(AboutComponent);
