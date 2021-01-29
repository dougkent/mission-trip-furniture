export interface ImageUpdaterProps
{
    imageClassName: string;
    imageS3Keys: string[];
    userId: string;
    handleNewImageDeselect?: (index: number) => void
    handleExistingImageDeselect?: (imageS3Key: string) => void
    handleImageSelect?: (index: number) => void
}