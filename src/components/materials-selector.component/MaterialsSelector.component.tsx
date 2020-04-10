// React
import React from 'react';

// Material UI
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
import { MaterialSelectorProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { Material } from '../../models/api-models';

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

const MaterialsSelector: React.FC<MaterialSelectorProps> = (
    props: MaterialSelectorProps
) => {
    const classes = useStyles(mtfTheme);

    const getOptionLabel = (option: Material): string => {
        return option.name;
    };

    const handleChange = (event: object, value: Material[]) => {
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
                options={props.materials}
                renderInput={params => (
                    <TextField
                        className={classes.textBox}
                        {...params}
                        label={props.label}
                        fullWidth
                    />
                )}
                renderOption={(material, { selected }) => (
                    <>
                        <Checkbox
                            icon={
                                <CheckBoxOutlineBlankSharpIcon fontSize='small' />
                            }
                            checkedIcon={<CheckBoxSharpIcon fontSize='small' />}
                            checked={selected}
                        />
                        {material.name}
                    </>
                )}
                renderTags={(value, getTagProps) => (
                    <>
                        {value
                            .filter((material, index) => index < 2)
                            .map((material, index) => (
                                <Chip
                                    variant='outlined'
                                    color='secondary'
                                    label={material.name}
                                    size='small'
                                    {...getTagProps({ index })}
                                />
                            ))}
                        {value.length > 2 && (
                            <Chip
                                size='small'
                                color='secondary'
                                variant='outlined'
                                className={classes.chip}
                                label={'+' + (value.length - 2).toString()}
                            />
                        )}
                    </>
                )}
                value={props.selectedMaterials}
            />
        );
    }
};

export default MaterialsSelector;
