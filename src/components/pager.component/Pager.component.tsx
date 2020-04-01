// React
import React from 'react';

// Material UI
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// MTF
import { PagerProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pager: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
        },
    })
);

const Pager: React.FC<PagerProps> = (props: PagerProps) => {
    const classes = useStyles(mtfTheme);

    const handleNextPage = () => {
        props.onNextPage();
    };

    return (
        <div className={classes.pager}>
            <Button onClick={handleNextPage}>Load More</Button>
        </div>
    );
};

export default Pager;
