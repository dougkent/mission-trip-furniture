export interface ImageUploaderProps {
    onSelect(file: File): void;
    onDeselect(): void;
    image: File;
}
