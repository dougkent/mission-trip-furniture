// React
import React from 'react';

// Material UI
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

// MTF
import { DescriptionViewProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { MultiLineTextEditor } from '../.';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

    const handleDescriptionChange = (text: string) => {
        props.onChange(text);
    };

    return (
        <>
            <Typography variant='h5'>Description: </Typography>
            <div className={props.editing ? classes.editBorder : ''}>
                <MultiLineTextEditor
                    text={props.description}
                    maxLength={2000}
                    isReadOnly={!props.editing}
                    onChange={handleDescriptionChange}
                />
            </div>
        </>
    );
};

export default DescriptionViewer;
