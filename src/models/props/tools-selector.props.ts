import { Tool } from '../api-models';

export interface ToolsSelectorProps {
    label: string;
    loading: boolean;
    tools: Tool[] | null;
    selectedTools: Tool[] | null;
    numSelectedToolsToRender: number;
    onSelect(tools: Tool[]): void;
}
