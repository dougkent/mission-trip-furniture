// React
import React, { useState, useEffect } from 'react';

// Material UI
import { Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// MTF
import { ErrorMessageProps } from '../../models/props/error-message.props';

const ErrorMessage: React.FC<ErrorMessageProps> = (
    props: ErrorMessageProps
) => {
    const [error, setError] = useState<string>(props.error);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

    const handleClearError = () => {
        setError(null);

        props.onClearError();
    };

    return (
        <Snackbar open={!!error} onClose={handleClearError}>
            <Alert severity='error' onClose={handleClearError}>
                <Typography variant='subtitle1'>{error}</Typography>
            </Alert>
        </Snackbar>
    );
};

export default ErrorMessage;
