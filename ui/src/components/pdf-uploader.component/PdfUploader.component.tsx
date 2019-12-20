// React
import React from 'react';

// Material UI
import {
    Button,
    IconButton,
    makeStyles,
    Theme,
    createStyles,
    Typography,
    Card,
    CardActions,
    CardContent,
} from '@material-ui/core';
import CloudUploadSharpIcon from '@material-ui/icons/CloudUploadSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';

// MTF
import { PdfUploaderProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        cardTitle: {
            maxWidth: 100,
            [theme.breakpoints.up('sm')]: {
                maxWidth: 'none',
            },
        },
        fileIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

const PdfUploader: React.FC<PdfUploaderProps> = (props: PdfUploaderProps) => {
    const classes = useStyles(mtfTheme);

    async function handlePdfDeselect() {
        await props.onDeselect();
    }

    async function handlePdfSelect(event: React.ChangeEvent) {
        const element = event.target as HTMLInputElement;
        const file = element.files[0];

        if (file.type === 'application/pdf') {
            await props.onSelect(file);
        }
    }

    if (props.pdfFile) {
        return (
            <Card className={classes.flex}>
                <CardContent className={classes.flex}>
                    <DescriptionSharpIcon className={classes.fileIcon} />
                    <Typography
                        variant='subtitle1'
                        noWrap
                        className={classes.cardTitle}>
                        {props.pdfFile.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        color='secondary'
                        onClick={() => handlePdfDeselect()}>
                        <DeleteSharpIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    } else {
        return (
            <>
                <Button
                    color='default'
                    onClick={() =>
                        document.getElementById('add-pdf-file-input').click()
                    }
                    type='button'
                    variant='contained'>
                    Pdf Upload&nbsp;
                    <CloudUploadSharpIcon />
                </Button>
                <input
                    accept='application/pdf'
                    id='add-pdf-file-input'
                    onChange={handlePdfSelect}
                    style={{ display: 'none' }}
                    type='file'
                />
            </>
        );
    }
};

export default PdfUploader;
