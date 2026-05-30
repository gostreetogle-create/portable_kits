import type { SchemaColumn } from '../../src/core';

/** Demo product rows — keyed by field name for products entity preview */
const PRODUCT_SAMPLE_ROWS: Record<string, string>[] = [
  {
    sku: 'BLT-M8-40',
    name: 'Болт М8×40',
    subcategory: 'Крепёж',
    kind: 'Товар',
    unit: 'шт.',
    categoryId: 'Метизы',
    listPrice: '12,50 ₽',
    costPrice: '8,40',
    stockQty: '240',
    status: 'Активен',
    description: 'Болт с шестигранной головкой',
    materials: 'Сталь оцинк.',
    weight: '0,012',
    _id: 'prod-001',
    createdAt: '12.01.2026',
    updatedAt: '28.05.2026',
  },
  {
    sku: 'NUT-M8',
    name: 'Гайка М8',
    subcategory: 'Крепёж',
    kind: 'Товар',
    unit: 'шт.',
    categoryId: 'Метизы',
    listPrice: '4,20 ₽',
    costPrice: '2,10',
    stockQty: '512',
    status: 'Активен',
    description: 'Гайка шестигранная',
    materials: 'Сталь оцинк.',
    weight: '0,006',
    _id: 'prod-002',
    createdAt: '15.02.2026',
    updatedAt: '20.05.2026',
  },
  {
    sku: 'WSH-M8',
    name: 'Шайба М8',
    subcategory: 'Крепёж',
    kind: 'Товар',
    unit: 'шт.',
    categoryId: 'Метизы',
    listPrice: '1,80 ₽',
    costPrice: '0,90',
    stockQty: '1024',
    status: 'Черновик',
    description: 'Шайба плоская',
    materials: 'Сталь',
    weight: '0,003',
    _id: 'prod-003',
    createdAt: '01.03.2026',
    updatedAt: '18.05.2026',
  },
];

const TYPE_FALLBACKS: Record<string, string[]> = {
  text: ['Пример текста', 'Другой текст', 'Третья строка'],
  number: ['42', '128', '7'],
  currency: ['1 250,00 ₽', '890,50 ₽', '3 400,00 ₽'],
  select: ['Вариант A', 'Вариант B', 'Вариант C'],
  date: ['28.05.2026', '15.04.2026', '01.01.2026'],
  boolean: ['Да', 'Нет', 'Да'],
  textarea: ['Краткое описание…', 'Длинный текст поля…', 'Ещё один абзац…'],
  image: ['🖼', '🖼', '🖼'],
};

function cellForColumn(col: SchemaColumn, rowIndex: number): string {
  if (col.isOrphan) {
    return '—';
  }

  const sampleRow = PRODUCT_SAMPLE_ROWS[rowIndex];
  if (col.field && sampleRow?.[col.field] !== undefined) {
    return sampleRow[col.field];
  }

  const fallbacks = TYPE_FALLBACKS[col.type] ?? TYPE_FALLBACKS['text'];
  return fallbacks[rowIndex % fallbacks.length];
}

export interface TablePreviewModel {
  columns: SchemaColumn[];
  rows: string[][];
}

/** Build 2–3 mock rows for the configured column list (demo only). */
export function buildTablePreview(columns: SchemaColumn[], rowCount = 3): TablePreviewModel {
  const visible = columns.filter((c) => c.field || c.header);
  if (!visible.length) {
    return { columns: [], rows: [] };
  }

  const count = Math.min(rowCount, PRODUCT_SAMPLE_ROWS.length);
  const rows = Array.from({ length: count }, (_, rowIndex) =>
    visible.map((col) => cellForColumn(col, rowIndex)),
  );

  return { columns: visible, rows };
}
