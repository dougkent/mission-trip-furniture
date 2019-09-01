// React
import React from 'react';

// React Select
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';

// MTF
import { Material } from '../../models';
import { MaterialSelectorProps } from '../../models/props';

const MaterialsSelector: React.FC<MaterialSelectorProps> = (
    props: MaterialSelectorProps
) => {
    function getOptionLabel(option: Material): string {
        return option.name;
    }

    function getOptionValue(option: Material): string {
        return option.id;
    }
    function handleChange(value: ValueType<Material>): void {
        let materials: Material[];

        if (!value) {
            materials = [];
        } else if (Array.isArray(value)) {
            materials = value;
        } else {
            materials = [value as Material];
        }

        props.onSelect(materials);
    }

    return (
        <Select
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            hideSelectedOptions={true}
            isLoading={props.loading}
            isMulti
            name='materials'
            onChange={handleChange}
            options={props.materials}
            placeholder='Select Materials Required for this Plan'
        />
    );
};

export default MaterialsSelector;
