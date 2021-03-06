// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    Button,
    IconButton,
    Card,
    makeStyles,
    Theme,
    createStyles,
    CardActions,
    CardContent,
    Typography,
} from '@material-ui/core';
import CloudUploadSharpIcon from '@material-ui/icons/CloudUploadSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';

// MTF
import { ImageUploaderProps } from '../../models/props/image-uploader.props';
import { mtfTheme } from '../../themes';
import { ImageModel } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: theme.spacing(1),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                flexWrap: 'noWrap',
            },
            [theme.breakpoints.up('lg')]: {
                width: '48%',
                marginRight: theme.spacing(1),
            },
        },
        image: {
            width: '100%',
            height: 200,
            objectFit: 'cover',
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(25),
                height: theme.spacing(25),
            },
        },
        cardContentContainer: {
            width: '100%',
        },
        cardContent: {
            maxWidth: theme.spacing(32),
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: theme.spacing(21),
            alignItems: 'center',
            [theme.breakpoints.up('sm')]: {
                maxWidth: 'none',
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: theme.spacing(16),
            },
            [theme.breakpoints.up('xl')]: {
                maxWidth: 'none',
            },
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        },
        imageIcon: {
            marginRight: theme.spacing(1),
        },
        btnRow: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        },
    })
);

const ImageUploader: React.FC<ImageUploaderProps> = (
    props: ImageUploaderProps
) => {
    const classes = useStyles(mtfTheme);

    const [imageFiles, setImageFiles] = useState<ImageModel[]>(
        props.imageFiles
    );

    useEffect(() => {
        setImageFiles(props.imageFiles);
    }, [props.imageFiles]);

    const handleImageDeselect = (index: number) => () => {
        setImageFiles(imageFiles.filter((imageFile, idx) => idx !== index));
        props.onDeselect(index);
    };

    const handleImageSelect = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const file = element.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            props.onSelect(file, reader.result as string);
        };
    };

    return (
        <>
            {imageFiles.map((imageFile: ImageModel, index: number) => (
                <Card className={classes.card} key={index} elevation={2}>
                    <img
                        src={imageFile.url}
                        className={classes.image}
                        alt='Plan Cover'
                    />
                    <div className={classes.cardContentContainer}>
                        <CardActions className={classes.cardActions}>
                            <div className={classes.cardTitle}>
                                <ImageSharpIcon className={classes.imageIcon} />
                                <Typography variant='subtitle1' noWrap>
                                    {imageFile.file.name}
                                </Typography>
                            </div>
                            <IconButton
                                color='secondary'
                                onClick={handleImageDeselect(index)}>
                                <DeleteSharpIcon />
                            </IconButton>
                        </CardActions>
                        <CardContent className={classes.cardContent}>
                            <Typography variant='body1' noWrap>
                                Size: {Math.round(imageFile.file.size / 1000)}{' '}
                                KB
                            </Typography>

                            <Typography variant='body1' noWrap>
                                Image Type: {imageFile.file.type}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            ))}
            {imageFiles.length < 3 && (
                <div className={classes.btnRow}>
                    <Button
                        color='default'
                        onClick={() =>
                            document
                                .getElementById('add-image-file-input')
                                .click()
                        }
                        type='button'
                        variant='contained'>
                        Image Upload&nbsp;
                        <CloudUploadSharpIcon />
                    </Button>
                    <input
                        accept='image/*'
                        id='add-image-file-input'
                        onChange={handleImageSelect}
                        style={{ display: 'none' }}
                        type='file'
                    />
                    {props.tooltip}
                </div>
            )}
        </>
    );
};

export default ImageUploader;
