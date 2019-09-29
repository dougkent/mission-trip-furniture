export interface PdfUploaderProps {
    onSelect(file: File): void;
    onDeselect(): void;
    pdfFile: File;
}
