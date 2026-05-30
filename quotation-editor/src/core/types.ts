import type { DocumentBlock } from '@document-canvas-kit/core';
import type { TableItem } from '@document-canvas-kit/core';

export interface QuotationEditorState {
  title: string;
  blocks: DocumentBlock[];
  tableItems: TableItem[];
  backgroundImage?: string;
}

export interface QuotationEditorKitConfig {
  defaultTitle?: string;
}

/** Map picked product rows to table items. */
export function productsToTableItems(
  rows: Record<string, unknown>[],
  tableKind = 'products',
): TableItem[] {
  return rows.map((row, order) => ({
    _id: String(row['_id'] ?? `item-${order}`),
    productId: String(row['_id'] ?? ''),
    tableKind,
    sku: String(row['sku'] ?? ''),
    name: String(row['name'] ?? ''),
    qty: 1,
    unit: 'шт',
    price: parsePrice(row['listPrice']),
    sum: parsePrice(row['listPrice']),
    order,
  }));
}

function parsePrice(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  const normalized = value.replace(/[^\d.,-]/g, '').replace(',', '.');
  const num = Number.parseFloat(normalized);
  return Number.isFinite(num) ? num : 0;
}
