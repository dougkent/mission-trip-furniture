import { BaseProps } from '.';
import { Material, Tool } from '../api-models';
export interface AppProps extends BaseProps {
    materials: Material[];
    tools: Tool[];
}
