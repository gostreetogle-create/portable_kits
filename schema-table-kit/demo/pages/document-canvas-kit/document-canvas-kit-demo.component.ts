import { JsonPipe } from '@angular/common';
import { Component, effect, model, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentCanvasComponent } from '@document-canvas-kit/angular';
import { productsToTableItems } from '@quotation-editor/core';
import { PlaceholderPickerComponent } from '@placeholder-kit/angular';
import { EntityPickerComponent } from '@entity-picker-kit/angular';
import type { DocumentBlock, TableItem } from '@document-canvas-kit/core';
import type { EntityPickerRow } from '@entity-picker-kit/core';
import {
  resolvePlaceholders,
  type PlaceholderContext,
} from '@placeholder-kit/core';

@Component({
  selector: 'demo-document-canvas-kit',
  standalone: true,
  imports: [
    RouterLink,
    JsonPipe,
    DocumentCanvasComponent,
    PlaceholderPickerComponent,
    EntityPickerComponent,
  ],
  templateUrl: './document-canvas-kit-demo.component.html',
  styleUrl: './document-canvas-kit-demo.component.scss',
})
export class DocumentCanvasKitDemoComponent {
  readonly canvas = viewChild.required(DocumentCanvasComponent);

  readonly blocks = model<DocumentBlock[]>([]);
  readonly tableItems = signal<TableItem[]>([]);
  readonly pickerVisible = signal(false);
  readonly productPickerVisible = signal(false);
  readonly mode = signal<'template' | 'instance'>('template');

  readonly previewContext: PlaceholderContext = {
    org: { name: 'ООО «Ромашка»' },
    client: { name: 'ИП Иванов' },
  };

  readonly resolvedPreview = signal('');

  constructor() {
    effect(() => {
      const text = this.blocks()
        .map((b) => b.content)
        .join('\n---\n');
      this.resolvedPreview.set(resolvePlaceholders(text, this.previewContext));
    });
  }

  openPlaceholderPicker(): void {
    this.pickerVisible.set(true);
  }

  openProductPicker(): void {
    this.productPickerVisible.set(true);
  }

  onPlaceholderSelected(token: string): void {
    this.canvas().insertPlaceholder(token);
  }

  onProductsPicked(rows: EntityPickerRow[]): void {
    this.tableItems.update((items) => [...items, ...productsToTableItems(rows)]);
  }

  toggleMode(): void {
    this.mode.update((m) => (m === 'template' ? 'instance' : 'template'));
  }
}
