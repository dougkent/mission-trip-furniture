// React
import React from 'react';

// Material UI
import { Chip, TextField } from '@material-ui/core';
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

    function handleChange(event: object, value: Tool[]): void {
        props.onSelect(value);
    }

    return (
        <Autocomplete
            getOptionLabel={getOptionLabel}
            loading={props.loading}
            multiple
            onChange={handleChange}
            options={props.tools}
            renderInput={params => (
                <TextField {...params} label={props.label} fullWidth />
            )}
            renderTags={(value, getTagProps) =>
                value.map((tool, index) => (
                    <Chip
                        variant='outlined'
                        color='secondary'
                        label={tool.name}
                        size='small'
                        {...getTagProps({ index })}
                    />
                ))
            }
            value={props.selectedTools}
        />
    );
};

export default ToolsSelector;
