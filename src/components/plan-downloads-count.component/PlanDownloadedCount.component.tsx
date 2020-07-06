// React
import React, { useState, useEffect } from 'react';

// Material UI
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp';

// MTF
import { PlanDownloadedCountProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            alignContent: 'center',
        },
        icon: {
            marginRight: theme.spacing(0.5),
        },
    })
);

const PlanDownloadedCount: React.FC<PlanDownloadedCountProps> = (
    props: PlanDownloadedCountProps
) => {
    const classes = useStyles(mtfTheme);

    const [downloadedCount, setDownloadedCount] = useState<number>(
        props.downloadedCount
    );

    useEffect(() => {
        setDownloadedCount(props.downloadedCount);
    }, [props.downloadedCount]);

    const getDownloadsCount = (num: number): string => {
        const symbols = ['', 'k', 'M'];

        const tier = (Math.log10(num) / 3) | 0;

        if (tier === 0) return num.toString();

        const suffix = symbols[tier];
        const scale = Math.pow(10, tier * 3);

        const scaled = num / scale;

        const digits = Math.round(scaled * 10) % 10 > 0 ? 1 : 0;

        return scaled.toFixed(digits) + suffix;
    };

    return (
        <div className={classes.flex}>
            <CloudDownloadSharpIcon className={classes.icon} />
            <Typography variant='subtitle1'>
                {getDownloadsCount(downloadedCount)}
            </Typography>
        </div>
    );
};

export default PlanDownloadedCount;
