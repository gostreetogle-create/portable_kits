import type { PhotoItem } from './types';

/** Convert a File to a data-URL (base64) string. */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/** Filter image files from a FileList. */
export function filterImageFiles(fileList: FileList | File[]): File[] {
  return Array.from(fileList).filter((f) => f.type.startsWith('image/'));
}

export const DEFAULT_PHOTO_POSITION = { x: 50, y: 50 } as const;

export function photoPositionStyle(photo: PhotoItem): string {
  const pos = photo.position ?? DEFAULT_PHOTO_POSITION;
  return `${pos.x}% ${pos.y}%`;
}
