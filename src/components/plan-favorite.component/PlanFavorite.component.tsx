// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    IconButton,
    makeStyles,
    Theme,
    createStyles,
    Typography,
} from '@material-ui/core';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';

// MTF
import { PlanFavoriteProps } from '../../models/props/plan-favorite.props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            alignContent: 'center',
        },
        favIcon: {
            color: '#ec407a',
        },
    })
);

const PlanFavorite: React.FC<PlanFavoriteProps> = (
    props: PlanFavoriteProps
) => {
    const classes = useStyles(mtfTheme);

    const [isFavoritedByUser, setIsFavoritedByUser] = useState(
        props.isFavoritedByUser
    );
    const [favoritedCount, setFavoritedCount] = useState(props.favoritedCount);

    useEffect(() => {
        setIsFavoritedByUser(props.isFavoritedByUser);
    }, [props.isFavoritedByUser]);

    const getFavoritedCount = (num: number): string => {
        const symbols = ['', 'k', 'M'];

        const tier = (Math.log10(num) / 3) | 0;

        if (tier === 0) return num.toString();

        const suffix = symbols[tier];
        const scale = Math.pow(10, tier * 3);

        const scaled = num / scale;

        const digits = Math.round(scaled * 10) % 10 > 0 ? 1 : 0;

        return scaled.toFixed(digits) + suffix;
    };

    const handleFavoriteToggle = async () => {
        await setIsFavoritedByUser(!isFavoritedByUser);

        if (!isFavoritedByUser) {
            setFavoritedCount(favoritedCount + 1);
        } else {
            setFavoritedCount(favoritedCount - 1);
        }

        props.onToggleFavorite(!isFavoritedByUser);
    };

    return (
        <div className={classes.flex}>
            <IconButton size='small' onClick={handleFavoriteToggle}>
                {(() => {
                    if (isFavoritedByUser) {
                        return (
                            <FavoriteSharpIcon className={classes.favIcon} />
                        );
                    } else {
                        return <FavoriteBorderSharpIcon />;
                    }
                })()}
            </IconButton>
            <Typography variant='subtitle1'>
                {getFavoritedCount(favoritedCount)}
            </Typography>
        </div>
    );
};

export default PlanFavorite;
