// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    Typography,
    TextField,
    CircularProgress,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';

// MTF
import { PersonalInfoProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formRow: {
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
        buttonRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        loadingIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

const PersonalInfo: React.FC<PersonalInfoProps> = (
    props: PersonalInfoProps
) => {
    const classes = useStyles(mtfTheme);

    const [email, setEmail] = useState<string>(props.email);
    const [emailVerified, setEmailVerified] = useState<boolean>(
        props.emailVerified
    );
    const [name, setName] = useState<string>(props.name);

    useEffect(() => {
        setEmail(props.email);
    }, [props.email]);

    useEffect(() => {
        setEmailVerified(props.emailVerified);
    }, [props.emailVerified]);

    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    const handleChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const key: string = element.name;
        const value: string = element.value;

        switch (key) {
            case 'email':
                setEmail(value);
                break;
            case 'name':
                setName(value);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        props.onSave(email, name);
    };

    const isSaveButtonDisabled = (): boolean => {
        if (props.saving) {
            return true;
        }

        if (!emailVerified) {
            return true;
        }

        if (!name || !email) {
            return true;
        }

        return false;
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Typography variant='h5'>Change Personal Info</Typography>
                <div className={classes.formRow}>
                    <TextField
                        inputProps={{ maxLength: 50 }}
                        name='email'
                        label='Email Address *'
                        value={email}
                        fullWidth
                        onChange={handleChange}
                        disabled={!emailVerified}
                    />
                </div>
                <div className={classes.formRow}>
                    <TextField
                        inputProps={{ maxLength: 50 }}
                        name='name'
                        label='Name *'
                        value={name}
                        fullWidth
                        onChange={handleChange}
                        disabled={!emailVerified}
                    />
                </div>
                <div className={classes.buttonRow}>
                    {props.saving && (
                        <CircularProgress
                            size='24px'
                            className={classes.loadingIcon}
                        />
                    )}
                    <Button
                        color='secondary'
                        type='submit'
                        variant='contained'
                        disabled={isSaveButtonDisabled()}>
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
};

export default PersonalInfo;
