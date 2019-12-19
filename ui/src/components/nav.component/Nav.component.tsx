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
} from '@material-ui/core';
import {
    fade,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core/styles';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

// MTF
import mtfTheme from '../../theme';

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
            width: 200,
        },
        mobileMenuItem: {
            margin: theme.spacing(4),
        },
        mobileNavLink: {
            textDecoration: 'none',
            color: 'inherit',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            width: '100%',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    })
);

const Nav: React.FC = () => {
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
                {/* <ListItem>
                    <Authenticator hideDefault={true}>
                        <Greetings />
                    </Authenticator>
                </ListItem> */}
            </List>
            {/* <Divider />
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchSharpIcon />
                </div>
                <InputBase
                    placeholder='Search…'
                    className={classes.inputInput}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div> */}
        </SwipeableDrawer>
    );

    return (
        <>
            <AppBar position='sticky' color='default'>
                <Toolbar className={classes.flex}>
                    <div className={`${classes.sectionMobile} ${classes.flex}`}>
                        <Typography variant='h5' color='primary' noWrap>
                            <ReactRouter.Link
                                to='/'
                                className={classes.navLink}>
                                <HotelSharpIcon /> &nbsp; Mission Trip Furniture
                            </ReactRouter.Link>
                        </Typography>
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
                        className={`${classes.flex} ${classes.flexLeft} ${classes.sectionDesktop}`}>
                        <Typography variant='h6' color='primary' noWrap>
                            <ReactRouter.Link
                                to='/'
                                className={classes.navLink}>
                                <HotelSharpIcon />
                                &nbsp; Mission Trip Furniture
                            </ReactRouter.Link>
                        </Typography>
                        <Typography variant='h6' noWrap color='primary'>
                            <ReactRouter.Link
                                className={classes.navLink}
                                to='/plans'>
                                Plans
                            </ReactRouter.Link>
                        </Typography>
                        {/* <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchSharpIcon />
                            </div>
                            <InputBase
                                placeholder='Search…'
                                className={classes.inputInput}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div> */}
                    </div>
                    <div className={classes.grow}></div>
                    <div
                        className={`${classes.flex} ${classes.flexRight} ${classes.sectionDesktop}`}>
                        <Typography variant='h6' noWrap color='primary'>
                            <ReactRouter.Link
                                to='/my-mtf'
                                className={classes.navLink}>
                                <AccountCircleSharpIcon />
                                &nbsp;My Account
                            </ReactRouter.Link>
                        </Typography>
                        <Authenticator hideDefault={true}>
                            <Greetings />
                        </Authenticator>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </>
    );
};

export default Nav;
