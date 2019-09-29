// React
import React, { useState } from 'react';

// Material UI
import { Button, IconButton } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';

// MTF
import { ImageUploaderProps } from '../../models/props/image-uploader.props';

const ImageUploader: React.FC<ImageUploaderProps> = (
    props: ImageUploaderProps
) => {
    const [imageUrl, setImageUrl] = useState();

    const handleImageDeselect = () => {
        setImageUrl(null);

        props.onDeselect();
    };

    const handleImageSelect = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const file = element.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            setImageUrl(reader.result);
        };

        props.onSelect(file);
    };

    if (props.image) {
        return (
            <>
                <img
                    src={imageUrl}
                    alt='Plan Cover'
                    width='200px'
                    height='200px'
                />
                <IconButton
                    color='secondary'
                    onClick={() => handleImageDeselect()}>
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
                        document.getElementById('add-image-file-input').click()
                    }
                    type='button'
                    variant='contained'>
                    Image Upload&nbsp;
                    <CloudUploadIcon />
                </Button>
                <input
                    accept='image/*'
                    id='add-image-file-input'
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                    type='file'
                />
            </>
        );
    }
};

export default ImageUploader;
