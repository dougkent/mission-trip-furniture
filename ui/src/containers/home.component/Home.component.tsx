// React
import React from 'react';

// Material UI
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
import * as homeBackgroundImage from '../assets/home-background.JPG';

const styles = (theme: Theme) =>
    createStyles({
        homeBackground: {
            background: `url(${homeBackgroundImage})`,
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
            marginTop: theme.spacing(15),
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
            [theme.breakpoints.up('lg')]: {
                marginTop: theme.spacing(22),
            },
        },
        title: {
            width: '100%',
        },
        learnMore: {
            marginTop: theme.spacing(15),
            border: `2px solid ${theme.palette.secondary.main}`,
            background: 'rgba(244, 244, 246, 0.4)',
            padding: '10px 20px',
            '&:hover': {
                border: `2px solid ${theme.palette.secondary.main}`,
                background: 'rgba(244, 244, 246, 0.4)',
            },
        },
        learnMoreText: {
            fontFamily: mtfTheme.typography.fontFamily,
            fontWeight: 400,
            textTransform: 'none',
        },
    });

export interface HomeProps extends AppProps, WithStyles<typeof styles> {}

class HomeComponent extends React.Component<HomeProps, AppState> {
    constructor(props: HomeProps) {
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
            <>
                <div className={classes.homeBackground}>
                    <div className={classes.backgroundOverlay}></div>
                </div>
                <div className={classes.homeContainer}>
                    <Typography variant='h2' className={classes.title}>
                        Mission Trip Furniture
                    </Typography>
                    <Button
                        variant='outlined'
                        color='secondary'
                        className={classes.learnMore}
                        size='large'
                        href='/about'>
                        <Typography
                            variant='h5'
                            className={classes.learnMoreText}>
                            Learn More
                        </Typography>
                    </Button>
                </div>
            </>
        );
    }
}

export default withStyles(styles(mtfTheme))(HomeComponent);
