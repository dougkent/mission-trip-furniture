export interface MultiLineTextEditorProps {
    maxLength: number;
    isReadOnly: boolean;
    text: string;
    onChange?: (text: string) => void;
}
