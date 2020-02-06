// React
import React from 'react';
import * as ReactRouter from 'react-router-dom';

// AWS
import { Authenticator, Greetings } from 'aws-amplify-react';

// Material UI
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItemText,
    SwipeableDrawer,
    Divider,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { AppProps } from '../../models/props';

// MTF
import { mtfTheme, mtfAmplifyTheme, mtfAmplifyMobileTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        flex: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        flexLeft: {
            flexGrow: 0.2,
        },
        flexRight: {
            flexGrow: 0.1,
        },
        navLink: {
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        mobileMenu: {
            width: 300,
        },
        mobileMenuItem: {
            margin: theme.spacing(4),
        },
        mobileNavLink: {
            textDecoration: 'none',
            color: 'inherit',
        },
        mobileSignOut: {
            margin: theme.spacing(3),
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            width: '100%',
            justifyContent: 'flex-end',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        homeMenuLink: {
            marginRight: theme.spacing(4),
            minWidth: 223,
        },
        myAccountLink: {
            marginRight: theme.spacing(4),
        },

        signInLink: {
            background: 'none',
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            display: 'block',
            fontFamily: mtfTheme.typography.h1.fontFamily,
            fontSize: '1.15rem',
            fontWeight: 400,
            lineHeight: 1,
            minWidth: 'auto',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
        },
        mobileSignInItem: {
            display: 'flex',
            justifyContent: 'center',
        },
    })
);

const Nav: React.FC<AppProps> = (props: AppProps) => {
    const classes = useStyles(mtfTheme);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(
        false
    );

    const handleMobileMenuOpen = () => {
        setIsMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const renderMobileMenu = (
        <SwipeableDrawer
            id='mobile-menu'
            open={isMobileMenuOpen}
            onOpen={handleMobileMenuOpen}
            onClose={handleMobileMenuClose}
            anchor='right'>
            <List className={classes.mobileMenu}>
                <ListItemText>
                    <Typography
                        variant='h5'
                        noWrap
                        color='primary'
                        className={classes.mobileMenuItem}>
                        <ReactRouter.Link
                            to='/plans'
                            className={classes.mobileNavLink}
                            onClick={handleMobileMenuClose}>
                            Plans
                        </ReactRouter.Link>
                    </Typography>
                </ListItemText>

                {(() => {
                    if (props.userId) {
                        return (
                            <ListItemText>
                                <Typography
                                    variant='h5'
                                    noWrap
                                    color='primary'
                                    className={classes.mobileMenuItem}>
                                    <ReactRouter.Link
                                        to='/my-mtf'
                                        className={classes.mobileNavLink}
                                        onClick={handleMobileMenuClose}>
                                        My Account
                                    </ReactRouter.Link>
                                </Typography>
                            </ListItemText>
                        );
                    }
                })()}
            </List>
            <Divider />
            {(() => {
                if (props.userId) {
                    return (
                        <>
                            <Typography
                                variant='h5'
                                noWrap
                                color='primary'
                                className={classes.mobileSignOut}>
                                <Authenticator
                                    hideDefault={true}
                                    theme={mtfAmplifyMobileTheme}>
                                    <Greetings
                                        inGreeting={(
                                            username: string
                                        ): string => null}
                                    />
                                </Authenticator>
                            </Typography>
                        </>
                    );
                } else {
                    return (
                        <Typography
                            variant='h5'
                            noWrap
                            color='primary'
                            className={`${classes.mobileMenuItem} ${classes.mobileSignInItem}`}>
                            <ReactRouter.Link
                                to='/my-mtf'
                                className={`${classes.signInLink}  ${classes.mobileNavLink}`}>
                                Sign In
                                <br />
                                or
                                <br />
                                Create an Account
                            </ReactRouter.Link>
                        </Typography>
                    );
                }
            })()}
        </SwipeableDrawer>
    );

    return (
        <>
            <AppBar position='sticky' color='default'>
                <Toolbar className={classes.flex}>
                    <Typography
                        variant='h5'
                        color='primary'
                        noWrap
                        className={classes.homeMenuLink}>
                        <ReactRouter.Link to='/' className={classes.navLink}>
                            <HotelSharpIcon />
                            &nbsp; Mission Trip Furniture
                        </ReactRouter.Link>
                    </Typography>
                    <div
                        className={`${classes.sectionMobile} ${classes.flex} ${classes.grow}`}>
                        <IconButton
                            edge='end'
                            color='inherit'
                            aria-label='open drawer'
                            aria-controls='mobile-menu'
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}>
                            <MenuSharpIcon />
                        </IconButton>
                    </div>
                    <div
                        className={`${classes.sectionDesktop} ${classes.flex} ${classes.grow}`}>
                        <Typography variant='h5' noWrap color='primary'>
                            <ReactRouter.Link
                                className={classes.navLink}
                                to='/plans'>
                                Plans
                            </ReactRouter.Link>
                        </Typography>
                        <div className={classes.grow}></div>
                        {(() => {
                            if (props.userId) {
                                return (
                                    <Typography
                                        variant='h5'
                                        noWrap
                                        color='primary'
                                        className={classes.myAccountLink}>
                                        <ReactRouter.Link
                                            to='/my-mtf'
                                            className={classes.navLink}>
                                            <AccountCircleSharpIcon />
                                            &nbsp;My Account
                                        </ReactRouter.Link>
                                    </Typography>
                                );
                            } else {
                                return (
                                    <ReactRouter.Link
                                        to='/my-mtf'
                                        className={classes.signInLink}>
                                        Sign In or Create an Account
                                    </ReactRouter.Link>
                                );
                            }
                        })()}
                        <Typography variant='h5' noWrap color='primary'>
                            <Authenticator
                                hideDefault={true}
                                theme={mtfAmplifyTheme}>
                                <Greetings />
                            </Authenticator>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </>
    );
};

export default Nav;
