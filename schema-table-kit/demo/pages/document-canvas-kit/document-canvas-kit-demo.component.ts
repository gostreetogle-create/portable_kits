import { JsonPipe } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentCanvasComponent } from '@document-canvas-kit/angular';
import { PlaceholderPickerComponent } from '@placeholder-kit/angular';
import type { DocumentBlock } from '@document-canvas-kit/core';
import {
  resolvePlaceholders,
  type PlaceholderContext,
} from '@placeholder-kit/core';

@Component({
  selector: 'demo-document-canvas-kit',
  standalone: true,
  imports: [RouterLink, JsonPipe, DocumentCanvasComponent, PlaceholderPickerComponent],
  templateUrl: './document-canvas-kit-demo.component.html',
  styleUrl: './document-canvas-kit-demo.component.scss',
})
export class DocumentCanvasKitDemoComponent {
  readonly canvas = viewChild.required(DocumentCanvasComponent);

  readonly blocks = signal<DocumentBlock[]>([]);
  readonly pickerVisible = signal(false);
  readonly mode = signal<'template' | 'instance'>('template');

  readonly previewContext: PlaceholderContext = {
    org: { name: 'ООО «Ромашка»' },
    client: { name: 'ИП Иванов' },
  };

  readonly resolvedPreview = signal('');

  onBlocksChange(blocks: DocumentBlock[]): void {
    this.blocks.set(blocks);
    const text = blocks.map((b) => b.content).join('\n---\n');
    this.resolvedPreview.set(resolvePlaceholders(text, this.previewContext));
  }

  openPlaceholderPicker(): void {
    this.pickerVisible.set(true);
  }

  onPlaceholderSelected(token: string): void {
    this.canvas().insertPlaceholder(token);
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'template' ? 'instance' : 'template'));
  }
}
