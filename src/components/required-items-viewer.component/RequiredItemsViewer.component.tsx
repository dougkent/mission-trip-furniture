// React
import React, { useState, useEffect } from 'react';

// Material UI
import {
    Chip,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';

// MTF
import { RequiredItemsViewerProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { RequiredItem } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rowTitle: {
            marginRight: theme.spacing(1),
        },
        requiredItemRow: {
            flexWrap: 'wrap',
            width: '100%',
            flexGrow: 1,
            marginBottom: `${theme.spacing(2)}px`,
            display: 'flex',
        },
        requiredItem: {
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
    })
);

const RequiredItemsViewer: React.FC<RequiredItemsViewerProps> = (
    props: RequiredItemsViewerProps
) => {
    const classes = useStyles(mtfTheme);

    const [requiredItems, setRequiredItems] = useState<RequiredItem[]>(
        props.requiredItems
    );

    useEffect(() => {
        setRequiredItems(props.requiredItems);
    }, [props.requiredItems]);

    return (
        <div className={classes.requiredItemRow}>
            <Typography variant='subtitle1' className={classes.rowTitle}>
                Materials:
            </Typography>
            {requiredItems?.map((requiredItem) => (
                <Chip
                    className={classes.requiredItem}
                    key={requiredItem.id}
                    size='small'
                    color='secondary'
                    label={requiredItem.name}
                />
            ))}
        </div>
    );
};

export default RequiredItemsViewer;
