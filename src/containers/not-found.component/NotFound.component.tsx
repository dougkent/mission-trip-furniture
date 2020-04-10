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

// MTF
import { BaseProps } from '../../models/props';
import { BaseState } from '../../models/states';
import { mtfTheme } from '../../themes';

const styles = (theme: Theme) =>
    createStyles({
        notFoundContainer: {
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('lg')]: {
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        row: {
            marginBottom: theme.spacing(4),
        },
        subtitle: {
            fontFamily: theme.typography.fontFamily,
        },
        buttons: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            [theme.breakpoints.up('md')]: {
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        link: {
            textDecoration: 'none',
        },
    });

export interface NotFoundProps extends BaseProps, WithStyles<typeof styles> {}

class NotFound extends React.Component<NotFoundProps, BaseState> {
    constructor(props: NotFoundProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidMount = () => {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    };

    componentDidUpdate = (prevProps: NotFoundProps) => {
        if (this.props.userId !== prevProps.userId) {
            this.setState({
                userId: this.props.userId,
            });
        }
    };

    render = () => {
        const { classes } = this.props;

        return (
            <div className={classes.notFoundContainer}>
                <Typography variant='h2' className={classes.row}>
                    Oops We've Misplaced This Page
                </Typography>
                <Typography variant='h4' className={`${classes.row}`}>
                    Just Like that Tool You Just Had In Your Hand
                </Typography>
                <Typography
                    variant='h6'
                    className={`${classes.row} ${classes.subtitle}`}>
                    This Page Has Either Moved or No Longer Exists. Here Are
                    Some Other Options:
                </Typography>
                <div className={`${classes.row} ${classes.buttons}`}>
                    <Link to='/plans' className={classes.link}>
                        <Button variant='outlined' color='secondary'>
                            Search Plans
                        </Button>
                    </Link>
                    <Link to='/my-mtf' className={classes.link}>
                        <Button variant='outlined' color='secondary'>
                            Dashboard
                        </Button>
                    </Link>
                    <Link to='/contact' className={classes.link}>
                        <Button variant='outlined' color='secondary'>
                            Contact
                        </Button>
                    </Link>
                </div>
            </div>
        );
    };
}

export default withStyles(styles(mtfTheme))(NotFound);
