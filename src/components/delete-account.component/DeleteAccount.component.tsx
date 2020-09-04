// React
import React, { useState } from 'react';

// Material UI
import {
    Typography,
    Button,
    createStyles,
    makeStyles,
    Theme,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
} from '@material-ui/core';

// MTF
import { mtfTheme } from '../../themes';
import { DeleteAccountProps } from '../../models/props';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonRow: {
            textAlign: 'right',
        },
        deleteDialogButton: {
            color: theme.palette.error.dark,
        },
        deleteButton: {
            color: '#fff',
            backgroundColor: theme.palette.error.dark,
        },
    })
);

const DeleteAccount: React.FC<DeleteAccountProps> = (
    props: DeleteAccountProps
) => {
    const classes = useStyles(mtfTheme);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<string>('');

    const handleDelete = () => {
        props.onDelete();

        handleDialogClose();
    };

    const handleDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const value: string = element.value;

        setDeleteConfirmation(value);
    };

    const isDeleteButtonDisabled = () => {
        if (props.deleting) {
            return true;
        }

        if (deleteConfirmation !== 'delete') {
            return true;
        }

        return false;
    };

    const renderDialog = () => {
        return (
            <Dialog open={deleteDialogOpen} onClose={handleDialogClose}>
                <DialogContent>
                    <Typography>
                        This action cannot be undone. All the plans you have
                        uploaded will still exist but you will no longer be able
                        to interact with Mission Trip Furniture using this
                        account. If you are sure you want to complete this
                        action enter the word <i>delete</i> below.
                    </Typography>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='deleteConfirm'
                        label='Enter confirmation text'
                        value={deleteConfirmation}
                        fullWidth
                        onChange={handleTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleDelete}
                        disabled={isDeleteButtonDisabled()}
                        className={classes.deleteButton}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            <Typography variant='h5'>Delete Account</Typography>
            <div>
                <Typography>
                    Permenantly delete this account. This action cannot be
                    undone.
                </Typography>
                <div className={classes.buttonRow}>
                    <Button
                        onClick={handleDialogOpen}
                        className={classes.deleteDialogButton}>
                        Delete Account
                    </Button>
                </div>
            </div>
            {renderDialog()}
        </>
    );
};

export default DeleteAccount;
