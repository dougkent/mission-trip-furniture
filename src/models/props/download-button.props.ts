export interface DownloadButtonProps {
    downloadUrl: string;
    disabled: boolean;
    onDownload(): void;
}
