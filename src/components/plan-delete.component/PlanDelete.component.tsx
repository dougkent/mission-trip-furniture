// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    Button,
    CircularProgress,
    createStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    makeStyles,
    Theme,
} from '@material-ui/core';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

// MTF
import { PlanDeleteProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteDialog: {
            backgroundColor: theme.palette.error.dark,
            color: '#fff',
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
                color: '#fff',
            },
        },
    })
);

const PlanDelete: React.FC<PlanDeleteProps> = (props: PlanDeleteProps) => {
    const classes = useStyles(mtfTheme);

    const [deleting, setDeleting] = useState<boolean>(props.deleting);
    const [dialogOpen, setDialogOpen] = useState<boolean>(props.dialogOpen);

    useEffect(() => {
        setDialogOpen(props.deleting);
    }, [props.deleting]);

    useEffect(() => {
        setDialogOpen(props.dialogOpen);
    }, [props.dialogOpen]);

    const handleDeleteDialogClose = () => {
        if (!deleting) {
            setDialogOpen(false);
            props.onCancel();
        }
    };

    const handleDelete = () => {
        setDeleting(true);

        props.onDelete();
    };

    return (
        <Dialog onClose={handleDeleteDialogClose} open={dialogOpen}>
            <DialogTitle className={classes.deleteDialog}>
                Delete {props.planName}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this plan? It will remove it
                    from the website and no one will be able to access it
                    anymore.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {deleting && <CircularProgress size='24px' />}
                <Button
                    className={classes.deleteDialog}
                    onClick={handleDelete}
                    disabled={deleting}>
                    <DeleteOutlineSharpIcon /> Delete
                </Button>
                <Button onClick={handleDeleteDialogClose} disabled={deleting}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlanDelete;
