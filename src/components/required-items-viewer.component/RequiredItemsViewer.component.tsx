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
import { RequiredItemsSelector } from '../.';
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
            // display: 'flex',
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

    const [selectedItems, setSelectedItems] = useState<RequiredItem[]>(
        props.selectedItems
    );

    useEffect(() => {
        setSelectedItems(props.selectedItems);
    }, [props.selectedItems]);

    const handleChange = (newSelectedItems: RequiredItem[]) => {
        props.onChange(newSelectedItems);
    };

    return (
        <div className={classes.requiredItemRow}>
            {!props.editing && (
                <>
                    <Typography
                        variant='subtitle1'
                        className={classes.rowTitle}>
                        {props.label}
                    </Typography>
                    {selectedItems?.map((requiredItem) => (
                        <Chip
                            className={classes.requiredItem}
                            key={requiredItem.id}
                            size='small'
                            color='secondary'
                            label={requiredItem.name}
                        />
                    ))}
                </>
            )}
            {props.editing && (
                <RequiredItemsSelector
                    label={props.selectorLabel}
                    loading={false}
                    requiredItems={props.requiredItems}
                    selectedItems={selectedItems}
                    numSelectedItemsToRender={2}
                    onSelect={handleChange}
                />
            )}
        </div>
    );
};

export default RequiredItemsViewer;
