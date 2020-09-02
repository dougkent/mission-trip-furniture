// React
import React, { useState } from 'react';

// Material UI
import {
    Typography,
    makeStyles,
    Theme,
    createStyles,
    TextField,
    CircularProgress,
    Button,
} from '@material-ui/core';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';

// MTF
import { ChangePasswordProps } from '../../models/props';
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
        buttonRowIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

const ChangePassword: React.FC<ChangePasswordProps> = (
    props: ChangePasswordProps
) => {
    const classes = useStyles(mtfTheme);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

    const handleChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const key: string = element.name;
        const value: string = element.value;

        switch (key) {
            case 'oldPassword':
                setOldPassword(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            case 'newPasswordConfirm':
                setNewPasswordConfirm(value);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== newPasswordConfirm) {
            props.onError(['New passwords do not match.']);
            return;
        }

        props.onSave(oldPassword, newPassword);

        setOldPassword('');

        setNewPassword('');

        setNewPasswordConfirm('');
    };

    const isSaveButtonDisabled = (): boolean => {
        if (props.saving) {
            return true;
        }

        if (!oldPassword || !newPassword || !newPasswordConfirm) {
            return true;
        }

        return false;
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h5'>Change Password</Typography>
            <div className={classes.formRow}>
                <TextField
                    inputProps={{ maxLength: 50 }}
                    name='oldPassword'
                    label='Current Password *'
                    fullWidth
                    onChange={handleChange}
                    value={oldPassword}
                    type='password'
                />
            </div>
            <div className={classes.formRow}>
                <TextField
                    inputProps={{ maxLength: 50 }}
                    name='newPassword'
                    label='New Password *'
                    fullWidth
                    onChange={handleChange}
                    value={newPassword}
                    type='password'
                />
            </div>
            <div className={classes.formRow}>
                <TextField
                    inputProps={{ maxLength: 50 }}
                    name='newPasswordConfirm'
                    label='Re-enter New Password *'
                    fullWidth
                    onChange={handleChange}
                    value={newPasswordConfirm}
                    type='password'
                />
            </div>
            <div className={classes.buttonRow}>
                {props.saving && (
                    <CircularProgress
                        size='24px'
                        className={classes.buttonRowIcon}
                    />
                )}
                {props.saveSuccessful && (
                    <DoneSharpIcon
                        color='secondary'
                        className={classes.buttonRowIcon}
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
    );
};

export default ChangePassword;
