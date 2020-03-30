// React
import React from 'react';

// Material UI
import { Chip, CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// MTF
import { MaterialSelectorProps } from '../../models/props';
import { Material } from '../../models/api-models';

const MaterialsSelector: React.FC<MaterialSelectorProps> = (
    props: MaterialSelectorProps
) => {
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
                onChange={handleChange}
                options={props.materials}
                renderInput={params => (
                    <TextField {...params} label={props.label} fullWidth />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((material, index) => (
                        <Chip
                            variant='outlined'
                            color='secondary'
                            label={material.name}
                            size='small'
                            {...getTagProps({ index })}
                        />
                    ))
                }
                value={props.selectedMaterials}
            />
        );
    }
};

export default MaterialsSelector;
