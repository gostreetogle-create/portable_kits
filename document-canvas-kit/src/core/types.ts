export type DocumentBlockType = 'text' | 'header' | 'table' | 'separator' | 'image';

export type DocumentCanvasMode = 'template' | 'instance';

export type DocumentTextAlign = 'left' | 'center' | 'right';

export interface DocumentBlockCell {
  content: string;
  align?: DocumentTextAlign;
}

export interface DocumentBlockSettings {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'semibold';
  align?: DocumentTextAlign;
  paddingTop?: number;
  paddingBottom?: number;
  color?: string;
  backgroundColor?: string;
  borderStyle?: 'none' | 'dashed' | 'solid';
  columns?: number;
  hidden?: boolean;
  lineHidden?: boolean;
  lineColor?: string;
  lineWidth?: number;
}

export interface DocumentBlock {
  _id?: string;
  type: DocumentBlockType;
  order: number;
  title?: string;
  content: string;
  tableKind?: string;
  cells?: DocumentBlockCell[];
  settings: DocumentBlockSettings;
}

export interface DocumentCanvasKitConfig {
  /** Initial blocks when component receives empty array. */
  defaultBlocks?: DocumentBlock[];
}

export interface DocTableColumn {
  field: string;
  header: string;
  type?: string;
  width?: string;
  visible?: boolean;
}

/** Row item for table blocks in instance mode. */
export interface TableItem {
  _id?: string;
  productId?: string;
  tableKind?: string;
  sku: string;
  photo?: string;
  name: string;
  qty: number;
  unit: string;
  price: number;
  sum: number;
  order: number;
}

export const DEFAULT_TABLE_KIND = 'products';

export const DEFAULT_TABLE_COLUMNS: DocTableColumn[] = [
  { field: 'index', header: '№', type: 'text', width: '40px' },
  { field: 'sku', header: 'Арт.', type: 'text', width: '80px' },
  { field: 'name', header: 'Наименование', type: 'text' },
  { field: 'qty', header: 'Кол-во', type: 'number', width: '80px' },
  { field: 'unit', header: 'Ед.', type: 'text', width: '60px' },
  { field: 'price', header: 'Цена, ₽', type: 'currency', width: '100px' },
  { field: 'sum', header: 'Сумма, ₽', type: 'currency', width: '120px' },
];

export const FALLBACK_TABLE_BLOCK_OPTIONS: { label: string; value: string }[] = [
  { label: 'Товары', value: 'products' },
  { label: 'Услуги', value: 'services' },
  { label: 'Работы', value: 'work' },
];

export const DEFAULT_BLOCK_SETTINGS: DocumentBlockSettings = {
  fontSize: 11,
  fontWeight: 'normal',
  align: 'center',
  paddingTop: 8,
  paddingBottom: 8,
};

export const DEFAULT_DOCUMENT_BLOCKS: DocumentBlock[] = [
  {
    type: 'header',
    order: 0,
    content: 'Заголовок документа',
    settings: { fontSize: 18, fontWeight: 'bold', align: 'center', paddingTop: 8, paddingBottom: 12 },
  },
  {
    type: 'text',
    order: 1,
    title: 'Информация',
    content: 'Поставщик: {{org.name}}\nКлиент: {{client.name}}',
    settings: { fontSize: 11, fontWeight: 'normal', align: 'center', paddingTop: 8, paddingBottom: 8 },
  },
  {
    type: 'table',
    order: 2,
    title: 'Товары',
    tableKind: 'products',
    content: '',
    settings: { fontSize: 10, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
  },
  {
    type: 'text',
    order: 3,
    content: 'Условия оплаты: предоплата 100%',
    settings: { fontSize: 10, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
  },
  {
    type: 'separator',
    order: 4,
    content: '',
    settings: { fontSize: 11, fontWeight: 'normal', align: 'left', paddingTop: 0, paddingBottom: 4 },
  },
  {
    type: 'text',
    order: 5,
    content: 'Руководитель: ___________________  (подпись)',
    settings: { fontSize: 11, fontWeight: 'normal', align: 'right', paddingTop: 8, paddingBottom: 8 },
  },
];

/** Re-index block order after reorder or mutation. */
export function normalizeBlockOrder(blocks: DocumentBlock[]): DocumentBlock[] {
  return blocks.map((block, order) => ({ ...block, order }));
}

/** Sum column index for table footer (defaults to last column). */
export function tableSumColumnIndex(columns: DocTableColumn[]): number {
  if (!columns.length) return 0;
  const sumIdx = columns.findIndex((c) => c.field === 'sum');
  return sumIdx >= 0 ? sumIdx : columns.length - 1;
}

/** Compute line total for a table item row. */
export function computeTableItemSum(item: Pick<TableItem, 'qty' | 'price'>): number {
  return (item.qty || 0) * (item.price || 0);
}
