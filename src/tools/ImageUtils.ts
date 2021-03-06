export function loadImage(src: string) {
    return new Promise<CanvasImageSource>((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
        return image;
    });
}