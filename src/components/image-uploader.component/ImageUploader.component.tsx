// React
import React, { useState } from 'react';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        image: {
            width: '100%',
            height: 100,
            objectFit: 'cover',
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(25),
                height: theme.spacing(25),
            },
        },
        cardContentContainer: {
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        cardContent: {
            maxWidth: theme.spacing(32),
            paddingTop: 0,
        },
        cardTitle: {
            display: 'flex',
            maxWidth: theme.spacing(21),
            alignItems: 'center',
        },
        cardActions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
        imageIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

const ImageUploader: React.FC<ImageUploaderProps> = (
    props: ImageUploaderProps
) => {
    const classes = useStyles(mtfTheme);
    const [imageUrl, setImageUrl] = useState(null);

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
            <Card className={classes.card}>
                <img
                    src={imageUrl}
                    className={classes.image}
                    alt='Plan Cover'
                />
                <div className={classes.cardContentContainer}>
                    <CardActions className={classes.cardActions}>
                        <div className={classes.cardTitle}>
                            <ImageSharpIcon className={classes.imageIcon} />
                            <Typography variant='subtitle1' noWrap>
                                {props.image.name}
                            </Typography>
                        </div>
                        <IconButton
                            color='secondary'
                            onClick={() => handleImageDeselect()}>
                            <DeleteSharpIcon />
                        </IconButton>
                    </CardActions>
                    <CardContent className={classes.cardContent}>
                        <Typography variant='body1' noWrap>
                            Size: {Math.round(props.image.size / 1000)} KB
                        </Typography>

                        <Typography variant='body1' noWrap>
                            Image Type: {props.image.type}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
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
                    <CloudUploadSharpIcon />
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
