import { Tool } from '../api-models';

export interface ToolsSelectorProps {
    label: string;
    loading: boolean;
    tools: Tool[] | null;
    onSelect(tools: Tool[]): void;
}
