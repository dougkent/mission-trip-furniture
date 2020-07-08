// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    Button,
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';

// MTF
import { DescriptionViewProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { MultiLineTextEditor } from '../.';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editButtonRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: theme.spacing(1),
        },
        editTextField: {
            marginBottom: theme.spacing(1),
        },
        editButton: {
            marginRight: theme.spacing(1),
        },
        editBorder: {
            borderTop: '1px solid rgba(0,0,0,0.42)',
            marginTop: theme.spacing(1),
        },
    })
);

const DescriptionViewer: React.FC<DescriptionViewProps> = (
    props: DescriptionViewProps
) => {
    const classes = useStyles(mtfTheme);

    const [description, setDescription] = useState<string>(props.description);
    const [saving, setSaving] = useState<boolean>(props.saving);
    const [editing, setEditing] = useState<boolean>(props.editing);

    useEffect(() => {
        setEditing(props.editing);
    }, [props.editing]);

    const handleCancel = () => {
        props.onCancel();
    };

    const handleSave = async () => {
        setSaving(true);

        props.onSave(description).catch(() => setSaving(false));
    };

    const handleDescriptionChange = (text: string) => {
        setDescription(text);
    };

    return (
        <>
            <Typography variant='h5'>Description: </Typography>
            <div className={editing && classes.editBorder}>
                <MultiLineTextEditor
                    text={description}
                    maxLength={2000}
                    isReadOnly={!editing}
                    onChange={handleDescriptionChange}
                />
            </div>
            {editing && (
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
            )}
        </>
    );
};

export default DescriptionViewer;
