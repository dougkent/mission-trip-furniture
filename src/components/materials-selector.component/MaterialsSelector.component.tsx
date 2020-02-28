// React
import React from 'react';

// Material UI
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// MTF
import { Material } from '../../models/api-models';
import { MaterialSelectorProps } from '../../models/props';

const MaterialsSelector: React.FC<MaterialSelectorProps> = (
    props: MaterialSelectorProps
) => {
    const getOptionLabel = (option: Material): string => {
        return option.name;
    };

    const handleChange = (event: object, value: Material[]) => {
        props.onSelect(value);
    };

    return (
        <Autocomplete
            getOptionLabel={getOptionLabel}
            loading={props.loading}
            multiple
            onChange={handleChange}
            options={props.materials}
            renderInput={params => (
                <TextField
                    {...params}
                    label='Select Materials Required for this Plan'
                    fullWidth
                />
            )}
        />
    );
};

export default MaterialsSelector;
