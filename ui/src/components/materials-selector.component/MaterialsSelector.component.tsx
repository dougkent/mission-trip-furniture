// React
import React from 'react';

// Material UI
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// MTF
import { Material } from '../../models';
import { MaterialSelectorProps } from '../../models/props';

const MaterialsSelector: React.FC<MaterialSelectorProps> = (
    props: MaterialSelectorProps
) => {
    function getOptionLabel(option: Material): string {
        return option.name;
    }
    function handleChange(event: object, value: Material) {
        let materials: Material[];

        if (!value) {
            materials = [];
        } else if (Array.isArray(value)) {
            materials = value;
        } else {
            materials = [value];
        }

        props.onSelect(materials);
    }

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
