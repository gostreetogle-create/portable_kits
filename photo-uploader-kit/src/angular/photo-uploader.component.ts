import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import type { PhotoItem } from '../core';
import { PHOTO_UPLOADER_KIT_CONFIG } from './tokens';

const DEFAULT_POSITION = { x: 50, y: 50 };

@Component({
  selector: 'pu-photo-uploader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './photo-uploader.component.html',
  styleUrl: './photo-uploader.component.scss',
})
export class PhotoUploaderComponent {
  private readonly config = inject(PHOTO_UPLOADER_KIT_CONFIG, { optional: true }) ?? {};

  readonly label = input<string>('');
  readonly photos = model<PhotoItem[]>([]);

  readonly isDragOver = signal(false);
  readonly newUrl = signal('');
  readonly uploadError = output<string>();
  readonly errorMessage = signal<string | null>(null);
  readonly zoomedUrl = signal<string | null>(null);
  readonly isProcessing = signal(false);
  readonly editingFrameIndex = signal<number | null>(null);

  private readonly frameDrag = signal<{
    startX: number;
    startY: number;
    posX: number;
    posY: number;
  } | null>(null);

  readonly dropzoneHint = this.config.dropzoneHint ?? 'Перетащите фото сюда или выберите файлы';

  posStyle(photo: PhotoItem): string {
    const pos = photo.position || DEFAULT_POSITION;
    return `${pos.x}% ${pos.y}%`;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
  }

  onFilesSelected(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const files = inputEl.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
    inputEl.value = '';
  }

  addUrl(): void {
    const url = this.newUrl().trim();
    if (!url || !this.canAddMore()) return;
    this.photos.update((arr: PhotoItem[]) => [...arr, { url }]);
    this.newUrl.set('');
  }

  remove(index: number, event: Event): void {
    event.stopPropagation();
    this.photos.update((arr: PhotoItem[]) => arr.filter((_, i) => i !== index));
    if (this.editingFrameIndex() === index) {
      this.editingFrameIndex.set(null);
    }
  }

  zoom(url: string): void {
    this.zoomedUrl.set(url);
  }

  openFrameEditor(index: number, event: Event): void {
    event.stopPropagation();
    this.editingFrameIndex.set(index);
  }

  closeFrameEditor(): void {
    this.editingFrameIndex.set(null);
    this.frameDrag.set(null);
  }

  onFrameMouseDown(event: MouseEvent): void {
    const idx = this.editingFrameIndex();
    if (idx === null) return;
    const photo = this.photos()[idx];
    const pos = photo.position || DEFAULT_POSITION;
    this.frameDrag.set({
      startX: event.clientX,
      startY: event.clientY,
      posX: pos.x,
      posY: pos.y,
    });
  }

  onFrameMouseMove(event: MouseEvent): void {
    const drag = this.frameDrag();
    if (!drag) return;
    const idx = this.editingFrameIndex();
    if (idx === null) return;

    const container = (event.currentTarget as HTMLElement).querySelector('img')?.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const dx = ((event.clientX - drag.startX) / rect.width) * 100;
    const dy = ((event.clientY - drag.startY) / rect.height) * 100;

    const x = Math.max(0, Math.min(100, drag.posX + dx));
    const y = Math.max(0, Math.min(100, drag.posY + dy));

    this.photos.update((arr: PhotoItem[]) => {
      const updated = [...arr];
      updated[idx] = { ...updated[idx], position: { x, y } };
      return updated;
    });
  }

  onFrameMouseUp(): void {
    this.frameDrag.set(null);
  }

  onFrameScaleChange(event: Event, idx: number): void {
    const scale = parseFloat((event.target as HTMLInputElement).value);
    this.photos.update((arr: PhotoItem[]) => {
      const updated = [...arr];
      updated[idx] = { ...updated[idx], scale };
      return updated;
    });
  }

  resetFrame(idx: number): void {
    this.photos.update((arr: PhotoItem[]) => {
      const updated = [...arr];
      updated[idx] = { ...updated[idx], position: { x: 50, y: 50 }, scale: 1 };
      return updated;
    });
  }

  browseClick(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  private canAddMore(): boolean {
    const max = this.config.maxPhotos ?? 0;
    return max <= 0 || this.photos().length < max;
  }

  private processFiles(fileList: FileList): void {
    this.errorMessage.set(null);
    const imageFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0 || !this.canAddMore()) return;

    const max = this.config.maxPhotos ?? 0;
    const slice =
      max > 0 ? imageFiles.slice(0, Math.max(0, max - this.photos().length)) : imageFiles;

    this.isProcessing.set(true);
    Promise.all(slice.map((f) => this.fileToBase64(f)))
      .then((dataUrls) => {
        this.errorMessage.set(null);
        const items: PhotoItem[] = dataUrls.map((url) => ({ url }));
        this.photos.update((arr: PhotoItem[]) => [...arr, ...items]);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : String(err);
        this.errorMessage.set(message);
        this.uploadError.emit(message);
      })
      .finally(() => {
        this.isProcessing.set(false);
      });
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
      reader.readAsDataURL(file);
    });
  }
}
