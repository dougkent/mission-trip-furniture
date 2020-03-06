// React
import React from 'react';

// Material UI
import {
    Button,
    createStyles,
    makeStyles,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

// MTF
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchBarContainer: {
            display: 'flex',
            width: '100%',
        },
        searchButton: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },

        searchButtonMobile: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        searchButtonDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
        searchIcon: {
            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing(1),
            },
        },
    })
);

const Search: React.FC = () => {
    const classes = useStyles(mtfTheme);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSearch} className={classes.searchBarContainer}>
            <TextField
                variant='filled'
                name='search'
                label='Search Plans'
                type='search'
                fullWidth
            />
            <Button
                variant='contained'
                type='submit'
                color='secondary'
                className={classes.searchButton}
                onClick={handleSearch}>
                <SearchSharpIcon
                    className={classes.searchButtonMobile}
                    fontSize='large'
                />
                <SearchSharpIcon
                    className={`${classes.searchButtonDesktop} ${classes.searchIcon}`}
                />
                <span className={classes.searchButtonDesktop}>Search</span>
            </Button>
        </form>
    );
};

export default Search;
