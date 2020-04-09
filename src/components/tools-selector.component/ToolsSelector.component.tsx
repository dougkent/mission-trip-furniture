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
import { ToolsSelectorProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { Tool } from '../../models/api-models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: 3,
        },
    })
);

const ToolsSelector: React.FC<ToolsSelectorProps> = (
    props: ToolsSelectorProps
) => {
    const classes = useStyles(mtfTheme);

    function getOptionLabel(option: Tool): string {
        return option.name;
    }

    function handleChange(event: object, value: Tool[]): void {
        props.onSelect(value);
    }

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
                options={props.tools}
                renderOption={(tool, { selected }) => (
                    <>
                        <Checkbox
                            icon={
                                <CheckBoxOutlineBlankSharpIcon fontSize='small' />
                            }
                            checkedIcon={<CheckBoxSharpIcon fontSize='small' />}
                            checked={selected}
                        />
                        {tool.name}
                    </>
                )}
                renderInput={params => (
                    <TextField {...params} label={props.label} fullWidth />
                )}
                renderTags={(value, getTagProps) => (
                    <>
                        {value
                            .filter((tool, index) => index < 2)
                            .map((tool, index) => (
                                <Chip
                                    variant='outlined'
                                    color='secondary'
                                    label={tool.name}
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
                value={props.selectedTools}
            />
        );
    }
};

export default ToolsSelector;
