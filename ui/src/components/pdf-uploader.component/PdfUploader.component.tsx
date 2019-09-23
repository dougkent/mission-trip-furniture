// React
import React from 'react';

// AWS
import { S3Image } from 'aws-amplify-react';

// Material UI
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// MTF
import { PdfUploaderProps } from '../../models/props';

const PdfUploader: React.FC<PdfUploaderProps> = (props: PdfUploaderProps) => {
    let uploading: boolean = false;

    async function handlePdfUpload(event: React.ChangeEvent) {
        uploading = true;

        const element = event.target as HTMLInputElement;
        const file = element.files[0];

        await props.onUpload(file);

        uploading = false;
    }

    if (props.pdfS3Key) {
        return <S3Image key={props.pdfS3Key} />;
    } else {
        return (
            <>
                <Button
                    color='primary'
                    type='button'
                    variant='contained'
                    disabled={uploading}
                    onClick={() =>
                        document.getElementById('add-pdf-file-input').click()
                    }>
                    {uploading ? 'Uploading' : 'Pdf Upload'}
                    <CloudUploadIcon />
                </Button>
                <input
                    id='add-pdf-file-input'
                    type='file'
                    accept='application/pdf'
                    onChange={handlePdfUpload}
                    style={{ display: 'none' }}
                />
            </>
        );
    }
};

export default PdfUploader;
