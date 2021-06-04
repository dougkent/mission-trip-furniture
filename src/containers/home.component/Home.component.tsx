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

// Google Analytics
import ReactGA from 'react-ga';

//MTF
import { BaseProps } from '../../models/props';
import { BaseState } from '../../models/states';
import { mtfTheme } from '../../themes';
import { ReactComponent as MtfLogo } from '../../assets/mtf-logo-dark.svg';
import * as homeBackgroundImage from '../../assets/home-background.jpg';

const styles = (theme: Theme) =>
    createStyles({
        homeBackground: {
            background: `url(${homeBackgroundImage.default})`,
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -999,
        },
        backgroundOverlay: {
            background: 'rgba(244, 244, 246, 0.2)',
            height: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
        },
        homeContainer: {
            marginTop: theme.spacing(10),
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(15),
            },
            [theme.breakpoints.up('lg')]: {
                marginTop: theme.spacing(22),
            },
        },
        title: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        logo: {
            width: theme.spacing(9),
            height: theme.spacing(9),
            marginRight: theme.spacing(2),
        },
        learnMore: {
            marginTop: theme.spacing(15),
            textDecoration: 'none',
        },
        learnMoreButton: {
            border: `2px solid ${theme.palette.secondary.main}`,
            background: 'rgba(244, 244, 246, 0.45)',
            padding: '10px 20px',
            '&:hover': {
                border: `2px solid ${theme.palette.secondary.main}`,
                background: 'rgba(244, 244, 246, 0.45)',
            },
        },
        learnMoreText: {
            fontWeight: 400,
            textTransform: 'none',
        },
    });

export interface HomeProps extends BaseProps, WithStyles<typeof styles> {}

class Home extends React.Component<HomeProps, BaseState> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    };

    componentDidUpdate = (prevProps: HomeProps) => {
        if (this.props.userId !== prevProps.userId) {
            this.setState({
                userId: this.props.userId,
            });
        }
    };
    render = () => {
        const { classes } = this.props;

        return (
            <>
                <div className={classes.homeBackground}>
                    <div className={classes.backgroundOverlay}></div>
                </div>
                <div className={classes.homeContainer}>
                    <Typography variant='h2' className={classes.title}>
                        <MtfLogo className={classes.logo} />
                        Mission Trip Furniture
                    </Typography>
                    <Link to='/about' className={classes.learnMore}>
                        <Button
                            variant='outlined'
                            color='secondary'
                            className={classes.learnMoreButton}
                            size='large'>
                            <Typography
                                variant='h5'
                                className={classes.learnMoreText}>
                                Learn More About Our Mission
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </>
        );
    };
}

export default withStyles(styles(mtfTheme))(Home);
