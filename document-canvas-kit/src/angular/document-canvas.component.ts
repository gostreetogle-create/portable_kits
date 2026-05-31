import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { DecimalPipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SortableHandleDirective,
  SortableItemDirective,
  SortableListDirective,
  moveSortableItems,
} from '@sortable-kit/angular';

import {
  DEFAULT_DOCUMENT_BLOCKS,
  FALLBACK_TABLE_BLOCK_OPTIONS,
  normalizeBlockOrder,
  type DocTableColumn,
  type DocumentBlock,
  type DocumentCanvasMode,
  type DocumentTextAlign,
  type TableItem,
} from '../core';
import { DOCUMENT_CANVAS_KIT_CONFIG } from './tokens';
import {
  computeBlockStyles,
  computeBlockItemsTotal,
  computeSeparatorLineStyles,
  createBlock,
  createTableBlock,
  getBlockItemRows,
  getBlockSumColumnIndex,
  getBlockTableColumns,
  getItemField,
  insertPlaceholderText,
  readFileAsDataUrl,
  trackBlock,
} from './document-canvas.utils';

@Component({
  selector: 'dc-document-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DecimalPipe,
    NgStyle,
    FormsModule,
    SortableListDirective,
    SortableItemDirective,
    SortableHandleDirective,
  ],
  templateUrl: './document-canvas.component.html',
  styleUrl: './document-canvas.component.scss',
})
export class DocumentCanvasComponent {
  private readonly config = inject(DOCUMENT_CANVAS_KIT_CONFIG, { optional: true }) ?? {};

  readonly mode = input<DocumentCanvasMode>('template');
  readonly reorderLocked = input(false);
  readonly blocks = model<DocumentBlock[]>([]);
  readonly tableItems = input<TableItem[]>([]);
  readonly tableTypeColumns = input<Record<string, DocTableColumn[]>>({});
  readonly tableBlockOptions = input(FALLBACK_TABLE_BLOCK_OPTIONS);
  readonly enablePicker = input(false);
  readonly backgroundImage = model<string | undefined>(undefined);

  readonly placeholderRequested = output<void>();
  readonly pickerRequested = output<number>();
  readonly backgroundChange = output<string | undefined>();
  /** Emitted when background file read fails. */
  readonly backgroundError = output<string>();

  readonly activeBlockIndex = signal<number | null>(null);
  readonly showAddMenu = signal(false);
  readonly selectedTableKind = signal('products');
  readonly bgDragOver = signal(false);

  /** Exposed for template — default separator color. */
  readonly defaultSeparatorLineColor = '#d1d5db';

  readonly availableTableBlockOptions = computed(() => {
    const existing = new Set(
      this.blocks()
        .filter((b) => b.type === 'table' && b.tableKind)
        .map((b) => b.tableKind!),
    );
    return this.tableBlockOptions().filter((opt) => !existing.has(opt.value));
  });

  /** Exposed for template — pure utility references. */
  readonly computeBlockStyles = computeBlockStyles;
  readonly computeSeparatorLineStyles = computeSeparatorLineStyles;
  readonly computeBlockItemsTotal = computeBlockItemsTotal;
  readonly getBlockTableColumns = getBlockTableColumns;
  readonly getBlockItemRows = getBlockItemRows;
  readonly getItemField = getItemField;
  readonly getBlockSumColumnIndex = getBlockSumColumnIndex;
  readonly trackBlock = trackBlock;

  constructor() {
    effect(() => {
      if (this.blocks().length === 0) {
        const defaults = this.config.defaultBlocks ?? DEFAULT_DOCUMENT_BLOCKS;
        this.blocks.set(structuredClone(defaults));
      }
    });
  }

  onBlockDropped(event: { previousIndex: number; currentIndex: number }): void {
    if (this.reorderLocked()) return;
    if (event.previousIndex === event.currentIndex) return;
    this.blocks.update((items: DocumentBlock[]) => normalizeBlockOrder(moveSortableItems(items, event)));
  }

  selectBlock(index: number, event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('textarea, button, input, select, .dc-block__handle, .dc-table__actions')) {
      return;
    }
    event.stopPropagation();
    this.activeBlockIndex.set(index);
  }

  onCanvasClick(): void {
    this.activeBlockIndex.set(null);
    this.showAddMenu.set(false);
  }

  toggleAddMenu(event: Event): void {
    event.stopPropagation();
    this.showAddMenu.update((v) => !v);
  }

  addTextBlock(): void {
    this.addBlockInternal('text');
  }

  addBlock(type: 'text' | 'separator'): void {
    this.addBlockInternal(type);
  }

  addTableBlock(kind?: string): void {
    const options = this.tableBlockOptions();
    const selectedKind = kind ?? this.selectedTableKind();
    const option = options.find((o) => o.value === selectedKind) ?? options[0];
    if (!option) return;

    const newBlock = createTableBlock(this.blocks().length, option.label, String(option.value));
    this.blocks.update((items: DocumentBlock[]) => normalizeBlockOrder([...items, newBlock]));
    this.activeBlockIndex.set(this.blocks().length - 1);
    this.showAddMenu.set(false);
  }

  removeBlock(index: number, event: Event): void {
    event.stopPropagation();
    if (this.blocks().length <= 1) return;
    this.blocks.update((items: DocumentBlock[]) =>
      normalizeBlockOrder(items.filter((_, i) => i !== index)),
    );
    if (this.activeBlockIndex() === index) {
      this.activeBlockIndex.set(null);
    }
  }

  updateContent(index: number, content: string): void {
    this.updateBlock(index, (block) => ({ ...block, content }));
  }

  setAlign(index: number, align: DocumentTextAlign): void {
    this.updateBlock(index, (block) => ({
      ...block,
      settings: { ...block.settings, align },
    }));
  }

  toggleSeparatorLine(index: number, event: Event): void {
    event.stopPropagation();
    this.blocks.update((items: DocumentBlock[]) => {
      const block = items[index];
      if (block.type !== 'separator') return items;
      const updated = [...items];
      updated[index] = {
        ...block,
        settings: { ...block.settings, lineHidden: !block.settings.lineHidden },
      };
      return updated;
    });
  }

  requestPlaceholder(index: number, event: Event): void {
    event.stopPropagation();
    this.activeBlockIndex.set(index);
    this.placeholderRequested.emit();
  }

  requestPicker(index: number, event: Event): void {
    event.stopPropagation();
    this.pickerRequested.emit(index);
  }

  insertPlaceholder(token: string): void {
    const idx = this.activeBlockIndex();
    const newBlocks = insertPlaceholderText(this.blocks(), idx, token);
    if (newBlocks !== this.blocks()) {
      this.blocks.set(newBlocks);
    }
  }

  onBgDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bgDragOver.set(true);
  }

  onBgDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bgDragOver.set(false);
  }

  onBgDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bgDragOver.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) {
      void this.#processBgFile(file);
    }
  }

  onBgFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) void this.#processBgFile(file);
    input.value = '';
  }

  removeBackground(): void {
    this.backgroundImage.set(undefined);
    this.backgroundChange.emit(undefined);
  }

  // ── Internal helpers ─────────────────────────────────────────────────────

  private addBlockInternal(type: 'text' | 'separator'): void {
    const newBlock = createBlock(type, this.blocks().length);
    this.blocks.update((items: DocumentBlock[]) => normalizeBlockOrder([...items, newBlock]));
    this.activeBlockIndex.set(this.blocks().length - 1);
    this.showAddMenu.set(false);
  }

  private updateBlock(index: number, mutate: (block: DocumentBlock) => DocumentBlock): void {
    this.blocks.update((items: DocumentBlock[]) => {
      const updated = [...items];
      updated[index] = mutate(updated[index]);
      return updated;
    });
  }

  async #processBgFile(file: File): Promise<void> {
    try {
      const url = await readFileAsDataUrl(file);
      this.backgroundImage.set(url);
      this.backgroundChange.emit(url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to read file';
      this.backgroundError.emit(message);
    }
  }
}
