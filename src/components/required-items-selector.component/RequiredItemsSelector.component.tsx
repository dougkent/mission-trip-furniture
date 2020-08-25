// React
import React from 'react';

// RequiredItem UI
import {
    Checkbox,
    Chip,
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
    TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankSharpIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';

// MTF
import { RequiredItemsSelectorProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { RequiredItem } from '../../models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: 3,
        },
        textBox: {
            '& .MuiAutocomplete-inputRoot': {
                paddingRight: `${theme.spacing(3)}px !important`,
            },
        },
    })
);

const RequiredItemsSelector: React.FC<RequiredItemsSelectorProps> = (
    props: RequiredItemsSelectorProps
) => {
    const classes = useStyles(mtfTheme);

    const getOptionLabel = (option: RequiredItem): string => {
        return option.name;
    };

    const handleChange = (event: object, value: RequiredItem[]) => {
        props.onSelect(value);
    };

    if (props.loading) {
        return <CircularProgress size='24px' />;
    } else {
        return (
            <Autocomplete
                getOptionLabel={getOptionLabel}
                loading={props.loading}
                multiple
                disableCloseOnSelect
                onChange={handleChange}
                options={props.requiredItems}
                renderInput={(params) => (
                    <TextField
                        className={classes.textBox}
                        {...params}
                        label={props.label}
                        fullWidth
                    />
                )}
                renderOption={(requiredItem, { selected }) => (
                    <>
                        <Checkbox
                            icon={
                                <CheckBoxOutlineBlankSharpIcon fontSize='small' />
                            }
                            checkedIcon={<CheckBoxSharpIcon fontSize='small' />}
                            checked={selected}
                        />
                        {requiredItem.name}
                    </>
                )}
                renderTags={(value, getTagProps) => (
                    <>
                        {value
                            .filter(
                                (requiredItem, index) =>
                                    index < props.numSelectedItemsToRender
                            )
                            .map((requiredItem, index) => (
                                <Chip
                                    variant='outlined'
                                    color='secondary'
                                    label={requiredItem.name}
                                    size='small'
                                    {...getTagProps({ index })}
                                />
                            ))}
                        {value.length > props.numSelectedItemsToRender && (
                            <Chip
                                size='small'
                                color='secondary'
                                variant='outlined'
                                className={classes.chip}
                                label={
                                    '+' +
                                    (
                                        value.length -
                                        props.numSelectedItemsToRender
                                    ).toString()
                                }
                            />
                        )}
                    </>
                )}
                value={props.selectedItems}
            />
        );
    }
};

export default RequiredItemsSelector;
