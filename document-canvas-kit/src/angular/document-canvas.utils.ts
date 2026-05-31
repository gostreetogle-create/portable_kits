import {
  computeTableItemSum,
  DEFAULT_TABLE_COLUMNS,
  normalizeBlockOrder,
  tableSumColumnIndex,
  type DocTableColumn,
  type DocumentBlock,
  type DocumentTextAlign,
  type TableItem,
} from '../core';

// ── Style helpers ──────────────────────────────────────────────────────────

/** Compute [ngStyle] object for a document block. */
export function computeBlockStyles(block: DocumentBlock): Record<string, string> {
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

/** Compute [ngStyle] object for a separator block's <hr>. */
export function computeSeparatorLineStyles(
  block: DocumentBlock,
  defaultColor = '#d1d5db',
): Record<string, string> {
  const width = block.settings.lineWidth ?? 1;
  const color = block.settings.lineColor || defaultColor;
  return {
    'border-top-width': `${width}px`,
    'border-top-color': color,
    'border-top-style': 'solid',
  };
}

// ── Table helpers ──────────────────────────────────────────────────────────

/** Resolve table columns for a given table kind. Falls back to DEFAULT_TABLE_COLUMNS. */
export function resolveTableColumns(
  tableKind: string | undefined,
  tableTypeColumns: Record<string, DocTableColumn[]>,
): DocTableColumn[] {
  if (!tableKind) return DEFAULT_TABLE_COLUMNS;
  const custom = tableTypeColumns[tableKind];
  return custom?.length ? custom : DEFAULT_TABLE_COLUMNS;
}

/** Get columns for a DocumentBlock of type 'table'. */
export function getBlockTableColumns(
  block: DocumentBlock,
  tableTypeColumns: Record<string, DocTableColumn[]>,
): DocTableColumn[] {
  if (block.type !== 'table') return [];
  return resolveTableColumns(block.tableKind, tableTypeColumns);
}

/** Get item rows for a table block, filtered by tableKind. */
export function getBlockItemRows(
  block: DocumentBlock,
  tableItems: TableItem[],
): { item: TableItem; index: number }[] {
  if (block.type !== 'table') return [];
  const kind = block.tableKind ?? 'products';
  return tableItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => (item.tableKind ?? 'products') === kind);
}

/** Compute total sum for items in a table block. */
export function computeBlockItemsTotal(
  block: DocumentBlock,
  tableItems: TableItem[],
): number {
  return getBlockItemRows(block, tableItems).reduce(
    (acc, { item }) => acc + computeTableItemSum(item),
    0,
  );
}

/** Get a formatted cell value for a table item. */
export function getItemField(item: TableItem, field: string): string | number {
  if (field === 'sum') return computeTableItemSum(item);
  if (field === 'index') return (item.order ?? 0) + 1;
  const value = item[field as keyof TableItem];
  if (value == null) return '—';
  return value as string | number;
}

/** Compute colspan for a table block (minimum 6). */
export function computeTableColspan(
  tableKind: string | undefined,
  tableTypeColumns: Record<string, DocTableColumn[]>,
): number {
  const cols = resolveTableColumns(tableKind, tableTypeColumns);
  return cols.length > 0 ? cols.length : 6;
}

/** Get sum column index for a table block. */
export function getBlockSumColumnIndex(
  block: DocumentBlock,
  tableTypeColumns: Record<string, DocTableColumn[]>,
): number {
  return tableSumColumnIndex(getBlockTableColumns(block, tableTypeColumns));
}

// ── TrackBy helper ─────────────────────────────────────────────────────────

export function trackBlock(index: number, block: DocumentBlock): string {
  return block._id ?? `${block.type}-${index}`;
}

// ── Block factory helpers ──────────────────────────────────────────────────

/** Create a new text or separator block with default settings. */
export function createBlock(
  type: 'text' | 'separator',
  order: number,
): DocumentBlock {
  return type === 'text'
    ? {
        type: 'text',
        order,
        content: 'Новый текст…',
        settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
      }
    : {
        type: 'separator',
        order,
        content: '',
        settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 4 },
      };
}

/** Create a new table block with given label and tableKind. */
export function createTableBlock(
  order: number,
  title: string,
  tableKind: string,
): DocumentBlock {
  return {
    type: 'table',
    order,
    title,
    tableKind,
    content: '',
    settings: { fontSize: 10, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
  };
}

/** Insert a placeholder token into a block at the given index. Returns new blocks array. */
export function insertPlaceholderText(
  blocks: DocumentBlock[],
  activeIndex: number | null,
  token: string,
): DocumentBlock[] {
  if (activeIndex === null || activeIndex < 0 || activeIndex >= blocks.length) return blocks;
  const block = blocks[activeIndex];
  if (block.type !== 'text' && block.type !== 'header') return blocks;
  const updated = [...blocks];
  updated[activeIndex] = { ...block, content: (block.content ?? '') + token };
  return updated;
}

// ── File helpers ───────────────────────────────────────────────────────────

/** Read a File as a base64 data URL. */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsDataURL(file);
  });
}
