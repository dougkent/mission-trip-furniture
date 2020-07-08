// React
import React, { useState } from 'react';

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

const MultiLineTextEditor: React.FC<MultiLineTextEditorProps> = (
    props: MultiLineTextEditorProps
) => {
    const classes = useStyles(mtfTheme);

    const isJsonString = (str: string): boolean => {
        try {
            JSON.parse(str);
        } catch {
            return false;
        }
        return true;
    };

    let initialState: string;

    if (!props.text) {
        initialState = JSON.stringify(
            convertToRaw(EditorState.createEmpty().getCurrentContent())
        );
    } else if (!isJsonString(props.text)) {
        initialState = JSON.stringify(
            convertToRaw(
                EditorState.createWithContent(
                    ContentState.createFromText(props.text)
                ).getCurrentContent()
            )
        );
    } else {
        initialState = props.text;
    }

    const [textState, setTextState] = useState<string>(initialState);

    const handleChange = (state: EditorState) => {
        const text: string = JSON.stringify(
            convertToRaw(state.getCurrentContent())
        );
        setTextState(text);
        if (props.onChange) {
            props.onChange(text);
        }
    };

    return (
        <div className={classes.editorContainer}>
            <MUIRichTextEditor
                label='Description *'
                defaultValue={textState}
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
