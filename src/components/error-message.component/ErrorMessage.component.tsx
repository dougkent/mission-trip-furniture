// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    createStyles,
    makeStyles,
    Snackbar,
    Theme,
    Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// MTF
import { ErrorMessageProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        snackBar: {
            borderTop: `solid 1px ${theme.palette.error.dark}`,
            [theme.breakpoints.up('sm')]: {
                border: `solid 1px ${theme.palette.error.dark}`,
            },
        },
    })
);

const ErrorMessage: React.FC<ErrorMessageProps> = (
    props: ErrorMessageProps
) => {
    const classes = useStyles(mtfTheme);

    const [errors, setErrors] = useState<string[]>(props.errors);

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    const handleClearError = () => {
        setErrors([]);

        props.onClearErrors();
    };

    return (
        <Snackbar
            open={errors.length > 0}
            onClose={handleClearError}
            className={classes.snackBar}>
            <Alert severity='error' onClose={handleClearError}>
                {errors.map(error => (
                    <Typography key={error} variant='subtitle1'>
                        {error}
                    </Typography>
                ))}
            </Alert>
        </Snackbar>
    );
};

export default ErrorMessage;
