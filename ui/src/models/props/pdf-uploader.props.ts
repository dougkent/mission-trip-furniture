export interface PdfUploaderProps {
    pdfS3Key: string;
    onUpload(file: File): void;
}
