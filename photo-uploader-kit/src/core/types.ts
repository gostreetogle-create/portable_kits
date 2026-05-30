/** Photo display settings (frame position + scale). */
export interface PhotoItem {
  url: string;
  /** CSS object-position in percent (default center = 50% 50%). */
  position?: { x: number; y: number };
  /** Scale 0.5–2.0 (default 1). */
  scale?: number;
}

export interface PhotoUploaderKitConfig {
  /** Drop zone hint text. */
  dropzoneHint?: string;
  /** Max photos (0 = unlimited). */
  maxPhotos?: number;
}
