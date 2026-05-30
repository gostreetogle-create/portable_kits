import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SortableHandleDirective,
  SortableItemDirective,
  SortableListDirective,
  moveSortableItems,
} from '@sortable-kit/angular';

import {
  DEFAULT_DOCUMENT_BLOCKS,
  normalizeBlockOrder,
  type DocumentBlock,
  type DocumentCanvasMode,
  type DocumentTextAlign,
} from '../core';
import { DOCUMENT_CANVAS_KIT_CONFIG } from './tokens';

@Component({
  selector: 'dc-document-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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

  readonly placeholderRequested = output<void>();

  readonly activeBlockIndex = signal<number | null>(null);

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
    if (target.closest('textarea, button, input, .dc-block__handle')) {
      return;
    }
    event.stopPropagation();
    this.activeBlockIndex.set(index);
  }

  onCanvasClick(): void {
    this.activeBlockIndex.set(null);
  }

  addTextBlock(): void {
    const newBlock: DocumentBlock = {
      type: 'text',
      order: this.blocks().length,
      content: 'Новый текст…',
      settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
    };
    this.blocks.update((items: DocumentBlock[]) => normalizeBlockOrder([...items, newBlock]));
    this.activeBlockIndex.set(this.blocks().length - 1);
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

  requestPlaceholder(index: number, event: Event): void {
    event.stopPropagation();
    this.activeBlockIndex.set(index);
    this.placeholderRequested.emit();
  }

  /** Insert placeholder token into active block (called from parent after picker). */
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

  trackBlock(index: number, block: DocumentBlock): string {
    return block._id ?? `${block.type}-${index}`;
  }
}
