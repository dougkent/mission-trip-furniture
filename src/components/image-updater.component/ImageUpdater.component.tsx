// React
import React, { useState } from 'react';

// Material UI
import { Fab, Card, makeStyles, Theme, createStyles } from '@material-ui/core';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

// MTF
import { ImageUpdaterProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { Image, ImageUploader } from '../.';
import { ImageModel } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: theme.spacing(1),
            width: '100%',
            position: 'relative',
            [theme.breakpoints.up('sm')]: {
                flexWrap: 'noWrap',
            },
            [theme.breakpoints.up('lg')]: {
                width: '48%',
                marginRight: theme.spacing(1),
            },
        },
        cardActions: {
            position: 'absolute',
            bottom: theme.spacing(1.5),
            right: theme.spacing(1.5),
        },
    })
);

const ImageUpdater: React.FC<ImageUpdaterProps> = (
    props: ImageUpdaterProps
) => {
    const classes = useStyles(mtfTheme);

    const [imageFiles, setImageFiles] = useState<ImageModel[]>([]);
    const [imageS3Keys, setImageS3Keys] = useState<string[]>(props.imageS3Keys);

    const handleExistingImageDeselect = (
        imageS3KeyToDeselect: string
    ) => () => {
        setImageS3Keys(
            imageS3Keys.filter(
                (imageS3Key) => imageS3Key !== imageS3KeyToDeselect
            )
        );
    };

    const handleNewImageDeselect = (index: number) => () => {
        setImageFiles(imageFiles.filter((imageFile, idx) => idx !== index));
    };

    const handleImageSelect = (file: File, url: string) => {
        var newImageModel: ImageModel = {
            file: file,
            url: url,
        };
        setImageFiles([...imageFiles, newImageModel]);
    };

    return (
        <>
            {imageS3Keys.map((imageS3Key, index) => (
                <Card key={index} elevation={2} className={classes.card}>
                    <Image
                        imageKey={imageS3Key}
                        userId={props.userId}
                        className={props.imageClassName}
                    />
                    <div className={classes.cardActions}>
                        <Fab
                            size='small'
                            onClick={handleExistingImageDeselect(imageS3Key)}
                            disabled={
                                imageS3Keys.length + imageFiles.length === 1
                            }>
                            <DeleteSharpIcon />
                        </Fab>
                    </div>
                </Card>
            ))}
            <ImageUploader
                maxFilesToUpload={3 - imageS3Keys.length}
                imageFiles={imageFiles}
                onDeselect={handleNewImageDeselect}
                onSelect={handleImageSelect}
            />
        </>
    );
};

export default ImageUpdater;
