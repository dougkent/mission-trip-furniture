// React
import React from 'react';

// Material UI
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// MTF
import { Tool } from '../../models/api-models';
import { ToolsSelectorProps } from '../../models/props';

const ToolsSelector: React.FC<ToolsSelectorProps> = (
    props: ToolsSelectorProps
) => {
    function getOptionLabel(option: Tool): string {
        return option.name;
    }

    function handleChange(event: object, value: Tool): void {
        let tools: Tool[];

        if (!value) {
            tools = [];
        } else if (Array.isArray(value)) {
            tools = value;
        } else {
            tools = [value];
        }

        props.onSelect(tools);
    }

    return (
        <Autocomplete
            getOptionLabel={getOptionLabel}
            loading={props.loading}
            multiple
            onChange={handleChange}
            options={props.tools}
            renderInput={params => (
                <TextField
                    {...params}
                    label='Select Tools Required for this Plan'
                    fullWidth
                />
            )}
        />
    );
};

export default ToolsSelector;
