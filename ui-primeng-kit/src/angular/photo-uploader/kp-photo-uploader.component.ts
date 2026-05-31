import { Component, input, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { KpInputComponent } from '../input';
import { KpButtonComponent } from '../button';

export interface PhotoItem {
  url: string;
  position?: { x: number; y: number };
  scale?: number;
}

const DEFAULT_POSITION = { x: 50, y: 50 };

@Component({
  selector: 'up-kp-photo-uploader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, KpInputComponent, KpButtonComponent],
  templateUrl: './kp-photo-uploader.component.html',
  styleUrl: './kp-photo-uploader.component.scss',
})
export class KpPhotoUploaderComponent {
  readonly label = input<string>('');
  readonly photos = model<PhotoItem[]>([]);
  readonly isDragOver = signal(false);
  readonly newUrl = signal('');
  readonly zoomedUrl = signal<string | null>(null);
  readonly isProcessing = signal(false);
  readonly editingFrameIndex = signal<number | null>(null);

  private readonly frameDrag = signal<{
    startX: number; startY: number;
    posX: number; posY: number;
  } | null>(null);

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
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    }
    input.value = '';
  }

  addUrl(): void {
    const url = this.newUrl().trim();
    if (!url) return;
    const item: PhotoItem = { url };
    this.photos.update((arr) => [...arr, item]);
    this.newUrl.set('');
  }

  remove(index: number, event: Event): void {
    event.stopPropagation();
    this.photos.update((arr) => arr.filter((_, i) => i !== index));
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

    this.photos.update((arr) => {
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
    this.photos.update((arr) => {
      const updated = [...arr];
      updated[idx] = { ...updated[idx], scale };
      return updated;
    });
  }

  resetFrame(idx: number): void {
    this.photos.update((arr) => {
      const updated = [...arr];
      updated[idx] = { ...updated[idx], position: { x: 50, y: 50 }, scale: 1 };
      return updated;
    });
  }

  private processFiles(fileList: FileList): void {
    const imageFiles = Array.from(fileList).filter((f) =>
      f.type.startsWith('image/'),
    );

    if (imageFiles.length === 0) return;

    this.isProcessing.set(true);
    Promise.all(imageFiles.map((f) => this.fileToBase64(f)))
      .then((dataUrls) => {
        const items: PhotoItem[] = dataUrls.map((url) => ({ url }));
        this.photos.update((arr) => [...arr, ...items]);
      })
      .catch((err) => {
        console.warn('[KpPhotoUploader] Failed to convert file(s):', err);
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
