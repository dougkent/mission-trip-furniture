// React
import React, { useState } from 'react';

// AWS
import { Storage } from 'aws-amplify';

// Material UI
import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';

// MTF
import { ImageProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
);

const Image: React.FC<ImageProps> = (props: ImageProps) => {
    const classes = useStyles(mtfTheme);

    const [loading, setLoading] = useState<boolean>(true);

    const [imageUrl, setImageUrl] = useState<string>('');

    if (!imageUrl) {
        Storage.get(props.imageKey, {
            level: 'protected',
            identityId: props.userId,
        }).then((res) => {
            setImageUrl(res as string);
            setLoading(false);
        });
    }

    if (loading) {
        return (
            <div className={`${props.className} ${classes.loading}`}>
                <CircularProgress size='48px' />
            </div>
        );
    } else {
        return (
            <div
                className={props.className}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}></div>
        );
    }
};

export default Image;
