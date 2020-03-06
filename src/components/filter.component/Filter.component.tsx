// React
import React from 'react';

// Material UI
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';

// MTF
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterButton: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        filterIcon: {
            [theme.breakpoints.up('md')]: {
                marginRight: theme.spacing(1),
            },
        },
        filterButtonMobile: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        filterButtonDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'inline',
            },
        },
    })
);

const Filter: React.FC = () => {
    const classes = useStyles(mtfTheme);

    const handleToggleFilter = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <Button
            type='submit'
            color='secondary'
            className={classes.filterButton}
            onClick={handleToggleFilter}>
            <FilterListSharpIcon
                fontSize='large'
                className={classes.filterButtonMobile}
            />
            <FilterListSharpIcon
                className={`${classes.filterButtonDesktop} ${classes.filterIcon}`}
            />
            <span className={classes.filterButtonDesktop}>Filter</span>
        </Button>
    );
};

export default Filter;
