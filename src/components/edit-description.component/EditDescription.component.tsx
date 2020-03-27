// React
import React, { useState } from 'react';

// Material UI
import {
    Button,
    CircularProgress,
    createStyles,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';

// MTF
import { EditDescriptionProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editButtonRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        editTextField: {
            marginBottom: theme.spacing(1),
        },
        editButton: {
            marginRight: theme.spacing(1),
        },
    })
);

const EditDescription: React.FC<EditDescriptionProps> = (
    props: EditDescriptionProps
) => {
    const classes = useStyles(mtfTheme);

    const [description, setDescription] = useState<string>(props.description);
    const [saving, setSaving] = useState<boolean>(props.saving);

    const handleCancel = () => {
        props.onCancel();
    };

    const handleSave = async () => {
        setSaving(true);

        props.onSave(description).catch(() => setSaving(false));
    };

    const handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;

        setDescription(element.value);
    };

    return (
        <>
            <TextField
                inputProps={{ maxLength: 500 }}
                multiline
                name='description'
                onChange={handleTextChange}
                label='Description'
                required
                rows='8'
                fullWidth
                value={description}
                className={classes.editTextField}
                disabled={saving}
            />
            <div className={classes.editButtonRow}>
                {saving && (
                    <CircularProgress
                        size='24px'
                        className={classes.editButton}
                    />
                )}
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={handleSave}
                    className={classes.editButton}
                    disabled={saving}>
                    Save
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleCancel}
                    className={classes.editButton}
                    disabled={saving}>
                    Cancel
                </Button>
            </div>
        </>
    );
};

export default EditDescription;
