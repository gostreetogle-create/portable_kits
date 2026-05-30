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
    type: 'text',
    order: 2,
    content: 'Условия оплаты: предоплата 100%',
    settings: { fontSize: 10, fontWeight: 'normal', align: 'left', paddingTop: 8, paddingBottom: 8 },
  },
];

/** Re-index block order after reorder or mutation. */
export function normalizeBlockOrder(blocks: DocumentBlock[]): DocumentBlock[] {
  return blocks.map((block, order) => ({ ...block, order }));
}
