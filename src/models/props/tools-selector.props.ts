import { Tool } from '../api-models';

export interface ToolsSelectorProps {
    label: string;
    loading: boolean;
    tools: Tool[] | null;
    selectedTools: Tool[] | null;
    onSelect(tools: Tool[]): void;
}
