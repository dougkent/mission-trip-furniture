import { Tool } from '../api-models';

export interface ToolsSelectorProps {
    loading: boolean;
    tools: Tool[] | null;
    onSelect(tools: Tool[]): void;
}
