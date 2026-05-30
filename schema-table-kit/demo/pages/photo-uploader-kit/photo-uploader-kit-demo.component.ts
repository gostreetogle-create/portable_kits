import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhotoUploaderComponent } from '@photo-uploader-kit/angular';
import type { PhotoItem } from '@photo-uploader-kit/core';

@Component({
  selector: 'demo-photo-uploader-kit',
  standalone: true,
  imports: [RouterLink, PhotoUploaderComponent],
  templateUrl: './photo-uploader-kit-demo.component.html',
  styleUrl: './photo-uploader-kit-demo.component.scss',
})
export class PhotoUploaderKitDemoComponent {
  readonly photos = signal<PhotoItem[]>([
    {
      url: 'https://picsum.photos/seed/demo1/200/200',
      position: { x: 50, y: 50 },
    },
  ]);

  readonly jsonPreview = signal('');

  onPhotosChange(items: PhotoItem[]): void {
    this.photos.set(items);
    this.jsonPreview.set(JSON.stringify(items, null, 2));
  }

  constructor() {
    this.onPhotosChange(this.photos());
  }
}
