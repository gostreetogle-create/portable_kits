import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentCanvasComponent } from '@document-canvas-kit/angular';
import type { DocumentBlock, TableItem } from '@document-canvas-kit/core';
import { EntityPickerComponent } from '@entity-picker-kit/angular';
import type { EntityPickerRow } from '@entity-picker-kit/core';
import { PlaceholderPickerComponent } from '@placeholder-kit/angular';

import { productsToTableItems } from '../core';
import { QUOTATION_EDITOR_KIT_CONFIG } from './tokens';

@Component({
  selector: 'qe-quotation-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DecimalPipe,
    FormsModule,
    DocumentCanvasComponent,
    EntityPickerComponent,
    PlaceholderPickerComponent,
  ],
  template: `
    <section class="qe-editor">
      <header class="qe-editor__header">
        <input
          class="qe-editor__title"
          type="text"
          [ngModel]="title()"
          (ngModelChange)="title.set($event)"
          placeholder="Название КП"
        />
        <span class="qe-editor__total">Итого: {{ totalSum() | number: '1.2-2' }} ₽</span>
      </header>

      <dc-document-canvas
        mode="instance"
        [(blocks)]="blocks"
        [tableItems]="tableItems()"
        [enablePicker]="true"
        [(backgroundImage)]="backgroundImage"
        (placeholderRequested)="openPlaceholderPicker()"
        (pickerRequested)="openProductPicker($event)"
      />

      <ep-entity-picker
        entityKey="products"
        selectionMode="multiple"
        [(visible)]="pickerVisible"
        (selectedMany)="onProductsPicked($event)"
      />

      <ph-placeholder-picker
        [(visible)]="placeholderVisible"
        (placeholderSelected)="onPlaceholderSelected($event)"
      />
    </section>
  `,
  styles: `
    .qe-editor {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .qe-editor__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .qe-editor__title {
      flex: 1;
      min-width: 200px;
      font-size: 1.25rem;
      font-weight: 600;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .qe-editor__total {
      font-weight: 700;
      color: #2563eb;
    }
  `,
})
export class QuotationEditorComponent {
  private readonly config = inject(QUOTATION_EDITOR_KIT_CONFIG, { optional: true }) ?? {};

  readonly canvas = viewChild.required(DocumentCanvasComponent);

  readonly title = signal(this.config.defaultTitle ?? 'Коммерческое предложение');
  readonly blocks = model<DocumentBlock[]>([]);
  readonly tableItems = signal<TableItem[]>([]);
  readonly backgroundImage = model<string | undefined>(undefined);

  readonly pickerVisible = signal(false);
  readonly placeholderVisible = signal(false);
  readonly activeTableBlockIndex = signal<number | null>(null);

  readonly totalSum = signal(0);

  openPlaceholderPicker(): void {
    this.placeholderVisible.set(true);
  }

  onPlaceholderSelected(token: string): void {
    this.canvas().insertPlaceholder(token);
  }

  openProductPicker(blockIndex: number): void {
    this.activeTableBlockIndex.set(blockIndex);
    this.pickerVisible.set(true);
  }

  onProductsPicked(rows: EntityPickerRow[]): void {
    const block = this.blocks()[this.activeTableBlockIndex() ?? -1];
    const kind = block?.tableKind ?? 'products';
    const newItems = productsToTableItems(rows, kind);
    this.tableItems.update((items) => [...items, ...newItems]);
    this.recalcTotal();
  }

  private recalcTotal(): void {
    const sum = this.tableItems().reduce((acc, item) => acc + (item.qty || 0) * (item.price || 0), 0);
    this.totalSum.set(sum);
  }
}
