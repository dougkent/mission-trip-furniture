import { ImageModel } from '..';

export interface ImageUploaderProps {
    onSelect: (file: File, url: string) => void;
    onDeselect: (index: number) => void;
    imageFiles: ImageModel[];
    maxFilesToUpload: number;
    tooltip?: JSX.Element;
}
