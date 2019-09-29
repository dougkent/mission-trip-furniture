// React
import React from 'react';

// Material UI
import { Button, IconButton } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

// MTF
import { PdfUploaderProps } from '../../models/props';

const PdfUploader: React.FC<PdfUploaderProps> = (props: PdfUploaderProps) => {
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
            <>
                <label>{props.pdfFile.name}</label>&nbsp;
                <IconButton
                    color='secondary'
                    onClick={() => handlePdfDeselect()}>
                    <DeleteIcon />
                </IconButton>
            </>
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
                    <CloudUploadIcon />
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
