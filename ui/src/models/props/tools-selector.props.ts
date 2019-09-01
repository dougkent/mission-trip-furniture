import { Tool } from '../tool.model';

export interface ToolsSelectorProps {
    loading: boolean;
    tools: Tool[] | null;
    onSelect(tools: Tool[]): void;
}
