import { Material } from './material.model';
import { Tool } from './tool.model';

export interface Plan {
    id: string;
    name: string;
    description: string;
    // TODO Pdf Info
    // TODO Image Info
    materials: Material[];
    tools: Tool[];
    created: Date;
    createdBy: string;
}
