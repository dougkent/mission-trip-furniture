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
    Paper,
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
        verifyEmailForm: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(2),
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
    const [verificationCode, setVerificationCode] = useState<string>('');

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
            case 'verificationCode':
                setVerificationCode(value);
                break;
        }
    };

    const handleRequestVerificationCode = (event: React.FormEvent) => {
        event.preventDefault();

        props.onRequestVerificationCode();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        props.onSave(email, name);
    };

    const handleVerify = (event: React.FormEvent) => {
        event.preventDefault();

        props.onVerify(verificationCode);
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

    const isVerifyButtonDisabled = (): boolean => {
        if (props.verifying) {
            return true;
        }

        if (!verificationCode) {
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
                    {!emailVerified && (
                        <Paper className={classes.verifyEmailForm}>
                            <Typography variant='h6'>
                                Verify Email Address
                            </Typography>
                            <div className={classes.formRow}>
                                <TextField
                                    inputProps={{ maxLength: 50 }}
                                    name='verificationCode'
                                    label='Enter Email Verification Code *'
                                    value={verificationCode}
                                    fullWidth
                                    onChange={handleChange}
                                />
                                <Button
                                    color='secondary'
                                    size='small'
                                    onClick={handleRequestVerificationCode}>
                                    Resend Verification Code?
                                </Button>
                            </div>
                            <div className={classes.buttonRow}>
                                {props.verifying && (
                                    <CircularProgress
                                        size='24px'
                                        className={classes.loadingIcon}
                                    />
                                )}
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    disabled={isVerifyButtonDisabled()}
                                    onClick={handleVerify}>
                                    Verify
                                </Button>
                            </div>
                        </Paper>
                    )}
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
