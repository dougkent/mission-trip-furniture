// React
import React from 'react';

// Material UI
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';

// MTF
import { DownloadButtonProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        downloadButton: {
            marginRight: theme.spacing(3),
        },
    })
);

const DownloadButton: React.FC<DownloadButtonProps> = (
    props: DownloadButtonProps
) => {
    const classes = useStyles(mtfTheme);

    const handleDownload = () => {
        props.onDownload();
    };

    return (
        <Button
            className={classes.downloadButton}
            color='secondary'
            variant='contained'
            href={props.downloadUrl}
            target='_blank'
            disabled={props.disabled}
            onClick={handleDownload}>
            Download PDF
        </Button>
    );
};

export default DownloadButton;
