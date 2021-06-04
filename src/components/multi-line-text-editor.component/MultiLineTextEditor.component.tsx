// React
import React from 'react';

// Material UI
import { createStyles, makeStyles, Theme } from '@material-ui/core';

// MUI RTE
import MUIRichTextEditor from 'mui-rte';
import { ContentState, EditorState, convertToRaw } from 'draft-js';

// MTF
import { MultiLineTextEditorProps } from '../../models/props';
import { mtfTheme } from '../../themes';

Object.assign(mtfTheme, {
    overrides: {
        MUIRichTextEditor: {
            placeHolder: {
                position: 'inherit',
            },
            editor: {
                borderBottom: '1px solid rgba(0,0,0,0.42)',
            },
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editorContainer: {
            width: '100%',
        },
    })
);

const isJsonString = (str: string): boolean => {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }
    return true;
};

const getDescription = (text: string): string => {
    let description: string;

    if (!text) {
        description = JSON.stringify(
            convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
    } else if (!isJsonString(text)) {
        description = JSON.stringify(
            convertToRaw(
                EditorState.createWithContent(
                    ContentState.createFromText(text)
                ).getCurrentContent()
            )
        );
    } else {
        description = text;
    }

    return description;
};

const MultiLineTextEditor: React.FC<MultiLineTextEditorProps> = (
    props: MultiLineTextEditorProps
) => {
    const classes = useStyles(mtfTheme);
    const description = getDescription(props.text);

    const handleChange = (state: EditorState) => {
        const text: string = JSON.stringify(
            convertToRaw(state.getCurrentContent())
        );

        if (props.onChange) {
            props.onChange(text);
        }
    };

    return (
        <div className={classes.editorContainer}>
            <MUIRichTextEditor
                label='Description *'
                defaultValue={description}
                onChange={handleChange}
                maxLength={props.maxLength}
                toolbar={!props.isReadOnly}
                readOnly={props.isReadOnly}
                controls={[
                    'title',
                    'bold',
                    'italic',
                    'underline',
                    'numberList',
                    'bulletList',
                ]}
            />
        </div>
    );
};

export default MultiLineTextEditor;
