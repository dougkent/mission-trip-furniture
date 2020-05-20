// React
import React, { useState } from 'react';

// Material UI
import {
    Button,
    createStyles,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';

// MTF
import { SearchProps } from '../../models/props';
import { SearchState } from '../../models/states';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchBarContainer: {
            display: 'flex',
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '50%',
            },
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

const Search: React.FC<SearchProps> = (props: SearchProps) => {
    const classes = useStyles(mtfTheme);

    const [searchState, setSearchState] = useState<SearchState>(
        props.searchState
    );

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        props.onSearch(searchState);
    };

    const handleTextChange = async (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;

        setSearchState({
            ...searchState,
            searchTerm: element.value,
        });
    };

    return (
        <form onSubmit={handleSearch} className={classes.searchBarContainer}>
            <TextField
                variant='filled'
                name='search'
                label='Search Plans'
                type='search'
                fullWidth
                onChange={handleTextChange}
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
