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
  DEFAULT_TABLE_COLUMNS,
  FALLBACK_TABLE_BLOCK_OPTIONS,
  computeTableItemSum,
  normalizeBlockOrder,
  tableSumColumnIndex,
  type DocTableColumn,
  type DocumentBlock,
  type DocumentCanvasMode,
  type DocumentTextAlign,
  type TableItem,
} from '../core';
import { DOCUMENT_CANVAS_KIT_CONFIG } from './tokens';

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

  readonly activeBlockIndex = signal<number | null>(null);
  readonly showAddMenu = signal(false);
  readonly selectedTableKind = signal('products');
  readonly bgDragOver = signal(false);

  readonly defaultSeparatorLineColor = '#d1d5db';

  readonly availableTableBlockOptions = computed(() => {
    const existing = new Set(
      this.blocks()
        .filter((b) => b.type === 'table' && b.tableKind)
        .map((b) => b.tableKind!),
    );
    return this.tableBlockOptions().filter((opt) => !existing.has(opt.value));
  });

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
    this.addBlock('text');
  }

  addBlock(type: 'text' | 'separator'): void {
    const newBlock: DocumentBlock =
      type === 'text'
        ? {
            type: 'text',
            order: this.blocks().length,
            content: 'Новый текст…',
            settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
          }
        : {
            type: 'separator',
            order: this.blocks().length,
            content: '',
            settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 4 },
          };
    this.blocks.update((items: DocumentBlock[]) => normalizeBlockOrder([...items, newBlock]));
    this.activeBlockIndex.set(this.blocks().length - 1);
    this.showAddMenu.set(false);
  }

  addTableBlock(kind?: string): void {
    const options = this.tableBlockOptions();
    const selectedKind = kind ?? this.selectedTableKind();
    const option = options.find((o) => o.value === selectedKind) ?? options[0];
    if (!option) return;

    const newBlock: DocumentBlock = {
      type: 'table',
      order: this.blocks().length,
      title: option.label,
      tableKind: String(option.value),
      content: '',
      settings: { fontSize: 10, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
    };
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
    this.blocks.update((items: DocumentBlock[]) => {
      const updated = [...items];
      updated[index] = { ...updated[index], content };
      return updated;
    });
  }

  setAlign(index: number, align: DocumentTextAlign): void {
    this.blocks.update((items: DocumentBlock[]) => {
      const updated = [...items];
      const block = updated[index];
      updated[index] = {
        ...block,
        settings: { ...block.settings, align },
      };
      return updated;
    });
  }

  toggleSeparatorLine(index: number, event: Event): void {
    event.stopPropagation();
    this.blocks.update((items: DocumentBlock[]) => {
      const updated = [...items];
      const block = updated[index];
      if (block.type !== 'separator') return items;
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
    if (idx === null || idx < 0 || idx >= this.blocks().length) return;
    const block = this.blocks()[idx];
    if (block.type !== 'text' && block.type !== 'header') return;
    this.updateContent(idx, (block.content ?? '') + token);
  }

  blockStyles(block: DocumentBlock): Record<string, string> {
    const s = block.settings;
    const styles: Record<string, string> = {
      'text-align': s.align ?? 'left',
      'font-size': `${s.fontSize ?? 11}px`,
      'font-weight': s.fontWeight === 'bold' ? '700' : s.fontWeight === 'semibold' ? '600' : '400',
      'padding-top': `${s.paddingTop ?? 8}px`,
      'padding-bottom': `${s.paddingBottom ?? 8}px`,
    };
    if (s.color) styles['color'] = s.color;
    if (s.backgroundColor) styles['background-color'] = s.backgroundColor;
    return styles;
  }

  separatorLineStyles(block: DocumentBlock): Record<string, string> {
    const width = block.settings.lineWidth ?? 1;
    const color = block.settings.lineColor || this.defaultSeparatorLineColor;
    return {
      'border-top-width': `${width}px`,
      'border-top-color': color,
      'border-top-style': 'solid',
    };
  }

  getTableColumns(tableKind?: string): DocTableColumn[] {
    if (!tableKind) return DEFAULT_TABLE_COLUMNS;
    const custom = this.tableTypeColumns()[tableKind];
    return custom?.length ? custom : DEFAULT_TABLE_COLUMNS;
  }

  blockTableColumns(block: DocumentBlock): DocTableColumn[] {
    if (block.type !== 'table') return [];
    return this.getTableColumns(block.tableKind);
  }

  blockItemRows(block: DocumentBlock): { item: TableItem; index: number }[] {
    if (block.type !== 'table') return [];
    const kind = block.tableKind ?? 'products';
    return this.tableItems()
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => (item.tableKind ?? 'products') === kind);
  }

  blockItemsTotal(block: DocumentBlock): number {
    return this.blockItemRows(block).reduce(
      (acc, { item }) => acc + computeTableItemSum(item),
      0,
    );
  }

  getItemField(item: TableItem, field: string): string | number {
    if (field === 'sum') return computeTableItemSum(item);
    if (field === 'index') return (item.order ?? 0) + 1;
    const value = item[field as keyof TableItem];
    if (value == null) return '—';
    return value as string | number;
  }

  tableColspan(tableKind?: string): number {
    const cols = this.getTableColumns(tableKind);
    return cols.length > 0 ? cols.length : 6;
  }

  blockSumColumnIndex(block: DocumentBlock): number {
    return tableSumColumnIndex(this.blockTableColumns(block));
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
      void this.processBgFile(file);
    }
  }

  onBgFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) void this.processBgFile(file);
    input.value = '';
  }

  removeBackground(): void {
    this.backgroundImage.set(undefined);
    this.backgroundChange.emit(undefined);
  }

  private async processBgFile(file: File): Promise<void> {
    const url = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(file);
    });
    this.backgroundImage.set(url);
    this.backgroundChange.emit(url);
  }

  trackBlock(index: number, block: DocumentBlock): string {
    return block._id ?? `${block.type}-${index}`;
  }
}
