// React
import React from 'react';

// React Select
import Select from 'react-select';

// MTF
import { Tool } from '../../models';
import { ToolsSelectorProps } from '../../models/props';
import { ValueType } from 'react-select/src/types';

const ToolsSelector: React.FC<ToolsSelectorProps> = (
    props: ToolsSelectorProps
) => {
    function getOptionLabel(option: Tool): string {
        return option.name;
    }

    function getOptionValue(option: Tool): string {
        return option.id;
    }

    function handleChange(value: ValueType<Tool>): void {
        let tools: Tool[];

        if (!value) {
            tools = [];
        } else if (Array.isArray(value)) {
            tools = value;
        } else {
            tools = [value as Tool];
        }

        props.onSelect(tools);
    }

    return (
        <Select
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            hideSelectedOptions={true}
            isLoading={props.loading}
            isMulti
            name='tools'
            onChange={handleChange}
            options={props.tools}
        />
    );
};

export default ToolsSelector;
