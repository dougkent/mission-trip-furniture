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
    InputBase,
    IconButton,
    List,
    ListItem,
    ListItemText,
    SwipeableDrawer,
    Divider,
} from '@material-ui/core';
import {
    fade,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core/styles';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';

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
            textAlign: 'center',
        },
        mobileNavLink: {
            margin: theme.spacing(2),
        },
        search: {
            position: 'relative',
            backgroundColor: fade(theme.palette.secondary.main, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.secondary.main, 0.25),
            },
            //marginRight: theme.spacing(2),
            //marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 400,
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            justifyContent: 'space-between',
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
            <List>
                <ListItemText>
                    <Typography
                        variant='h6'
                        noWrap
                        className={classes.mobileNavLink}>
                        <ReactRouter.Link
                            to='/plans'
                            onClick={handleMobileMenuClose}>
                            Plans
                        </ReactRouter.Link>
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography
                        variant='h6'
                        noWrap
                        className={classes.mobileNavLink}>
                        <ReactRouter.Link
                            to='/my-mtf'
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
            <Divider />
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchSharpIcon />
                </div>
                <InputBase
                    placeholder='Search…'
                    className={classes.inputInput}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </SwipeableDrawer>
    );

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar className={classes.flex}>
                    <div className={classes.sectionMobile}>
                        <Typography
                            variant='h6'
                            noWrap
                            className={classes.mobileNavLink}>
                            <ReactRouter.Link to='/'>
                                <HotelSharpIcon />
                            </ReactRouter.Link>
                        </Typography>
                        <IconButton
                            edge='start'
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
                        <Typography
                            variant='h6'
                            noWrap
                            className={classes.navLink}>
                            <ReactRouter.Link to='/'>
                                Mission Trip Furniture
                            </ReactRouter.Link>
                        </Typography>
                        <Typography
                            variant='h6'
                            noWrap
                            className={classes.navLink}>
                            <ReactRouter.Link to='/plans'>
                                Plans
                            </ReactRouter.Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchSharpIcon />
                            </div>
                            <InputBase
                                placeholder='Search…'
                                className={classes.inputInput}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>
                    <div className={classes.grow}></div>
                    <div
                        className={`${classes.flex} ${classes.flexRight} ${classes.sectionDesktop}`}>
                        <Typography
                            variant='h6'
                            noWrap
                            className={classes.navLink}>
                            <ReactRouter.Link to='/my-mtf'>
                                My Account
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
