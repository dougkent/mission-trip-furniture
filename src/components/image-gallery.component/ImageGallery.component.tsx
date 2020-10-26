// React
import React from 'react';

// Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core';

// Swiper
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// MTF
import { ImageGalleryProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { Image } from '../.';

SwiperCore.use([Pagination]);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        swiper: {
            '& .swiper-container': {
                width: '100%',
            },
            '& .swiper-slide': {
                width: '100%',
                display: 'flex',
            },
        },
    })
);

const ImageGallery: React.FC<ImageGalleryProps> = (
    props: ImageGalleryProps
) => {
    const classes = useStyles(mtfTheme);

    if (props.imageS3Keys.length > 1) {
        return (
            <div className={`${classes.swiper} ${props.galleryClassName}`}>
                <Swiper pagination={{ clickable: true }} spaceBetween={0}>
                    {props.imageS3Keys.map((imageS3Key) => (
                        <SwiperSlide key={imageS3Key}>
                            <Image
                                imageKey={imageS3Key}
                                userId={props.userId}
                                className={props.imageClassName}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    } else {
        return (
            <div className={`${classes.swiper} ${props.galleryClassName}`}>
                <Image
                    imageKey={props.imageS3Keys[0]}
                    userId={props.userId}
                    className={props.imageClassName}
                />
            </div>
        );
    }
};

export default ImageGallery;
