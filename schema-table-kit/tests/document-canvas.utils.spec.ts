import { describe, expect, it } from 'vitest';

import type { DocTableColumn, DocumentBlock, TableItem } from '../../document-canvas-kit/src/core';

import {
  computeBlockStyles,
  computeBlockItemsTotal,
  computeSeparatorLineStyles,
  computeTableColspan,
  createBlock,
  createTableBlock,
  getBlockItemRows,
  getBlockSumColumnIndex,
  getBlockTableColumns,
  getItemField,
  insertPlaceholderText,
  resolveTableColumns,
  trackBlock,
} from '../../document-canvas-kit/src/angular/document-canvas.utils';

// ── Block style helpers ────────────────────────────────────────────────────

describe('computeBlockStyles', () => {
  it('returns default styles for empty settings', () => {
    const block: DocumentBlock = {
      type: 'text',
      order: 0,
      content: '',
      settings: {},
    };
    const styles = computeBlockStyles(block);
    expect(styles['text-align']).toBe('left');
    expect(styles['font-size']).toBe('11px');
    expect(styles['font-weight']).toBe('400');
    expect(styles['padding-top']).toBe('8px');
    expect(styles['padding-bottom']).toBe('8px');
  });

  it('resolves bold and semibold font weights', () => {
    const bold: DocumentBlock = {
      type: 'header',
      order: 0,
      content: '',
      settings: { fontWeight: 'bold' },
    };
    const semibold: DocumentBlock = {
      type: 'header',
      order: 0,
      content: '',
      settings: { fontWeight: 'semibold' },
    };
    expect(computeBlockStyles(bold)['font-weight']).toBe('700');
    expect(computeBlockStyles(semibold)['font-weight']).toBe('600');
  });

  it('includes color and backgroundColor if set', () => {
    const block: DocumentBlock = {
      type: 'text',
      order: 0,
      content: '',
      settings: { color: '#ff0000', backgroundColor: '#f0f0f0' },
    };
    const styles = computeBlockStyles(block);
    expect(styles['color']).toBe('#ff0000');
    expect(styles['background-color']).toBe('#f0f0f0');
  });
});

describe('computeSeparatorLineStyles', () => {
  it('uses defaults when no lineWidth/lineColor', () => {
    const block: DocumentBlock = {
      type: 'separator',
      order: 0,
      content: '',
      settings: {},
    };
    const styles = computeSeparatorLineStyles(block);
    expect(styles['border-top-width']).toBe('1px');
    expect(styles['border-top-color']).toBe('#d1d5db');
    expect(styles['border-top-style']).toBe('solid');
  });

  it('respects custom width and color', () => {
    const block: DocumentBlock = {
      type: 'separator',
      order: 0,
      content: '',
      settings: { lineWidth: 3, lineColor: '#000' },
    };
    const styles = computeSeparatorLineStyles(block);
    expect(styles['border-top-width']).toBe('3px');
    expect(styles['border-top-color']).toBe('#000');
  });

  it('accepts custom defaultColor parameter', () => {
    const block: DocumentBlock = {
      type: 'separator',
      order: 0,
      content: '',
      settings: {},
    };
    const styles = computeSeparatorLineStyles(block, '#aaa');
    expect(styles['border-top-color']).toBe('#aaa');
  });
});

// ── Table helpers ──────────────────────────────────────────────────────────

describe('resolveTableColumns', () => {
  it('returns DEFAULT_TABLE_COLUMNS for unknown kind', () => {
    const cols = resolveTableColumns(undefined, {});
    expect(cols.length).toBeGreaterThan(0);
    expect(cols[0].field).toBe('index');
  });

  it('returns custom columns if provided', () => {
    const custom: DocTableColumn[] = [{ field: 'foo', header: 'Foo' }];
    const cols = resolveTableColumns('custom', { custom });
    expect(cols).toEqual(custom);
  });

  it('falls back to default for empty custom array', () => {
    const cols = resolveTableColumns('custom', { custom: [] });
    expect(cols[0].field).toBe('index');
  });
});

describe('getBlockTableColumns', () => {
  it('returns empty array for non-table block', () => {
    const block: DocumentBlock = {
      type: 'text', order: 0, content: '', settings: {},
    };
    expect(getBlockTableColumns(block, {})).toEqual([]);
  });

  it('resolves columns by tableKind', () => {
    const custom: DocTableColumn[] = [{ field: 'x', header: 'X' }];
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {}, tableKind: 'custom',
    };
    expect(getBlockTableColumns(block, { custom })).toEqual(custom);
  });
});

describe('getBlockItemRows', () => {
  const items: TableItem[] = [
    { sku: 'A', name: 'Item A', qty: 1, unit: 'pc', price: 10, sum: 10, order: 0, tableKind: 'products' },
    { sku: 'B', name: 'Item B', qty: 2, unit: 'pc', price: 20, sum: 40, order: 1, tableKind: 'services' },
  ];

  it('returns empty for non-table block', () => {
    const block: DocumentBlock = {
      type: 'text', order: 0, content: '', settings: {},
    };
    expect(getBlockItemRows(block, items)).toEqual([]);
  });

  it('filters by tableKind', () => {
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {}, tableKind: 'services',
    };
    const rows = getBlockItemRows(block, items);
    expect(rows).toHaveLength(1);
    expect(rows[0].item.sku).toBe('B');
  });

  it('defaults to products for undefined tableKind', () => {
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {},
    };
    const rows = getBlockItemRows(block, items);
    expect(rows).toHaveLength(1);
    expect(rows[0].item.sku).toBe('A');
  });
});

describe('computeBlockItemsTotal', () => {
  it('sums all items in the block', () => {
    const items: TableItem[] = [
      { sku: 'A', name: 'A', qty: 2, unit: 'pc', price: 10, sum: 20, order: 0, tableKind: 'products' },
      { sku: 'B', name: 'B', qty: 3, unit: 'pc', price: 5, sum: 15, order: 1, tableKind: 'products' },
    ];
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {}, tableKind: 'products',
    };
    expect(computeBlockItemsTotal(block, items)).toBe(35);
  });

  it('returns 0 for empty items', () => {
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {},
    };
    expect(computeBlockItemsTotal(block, [])).toBe(0);
  });
});

describe('getItemField', () => {
  const item: TableItem = {
    sku: 'ART-001', name: 'Test', qty: 5, unit: 'pc', price: 100, sum: 500, order: 2,
  };

  it('computes sum field', () => {
    expect(getItemField(item, 'sum')).toBe(500);
  });

  it('computes index from order + 1', () => {
    expect(getItemField(item, 'index')).toBe(3);
  });

  it('returns direct field value', () => {
    expect(getItemField(item, 'sku')).toBe('ART-001');
    expect(getItemField(item, 'name')).toBe('Test');
  });

  it('returns em dash for null/undefined', () => {
    expect(getItemField({} as TableItem, 'sku')).toBe('—');
  });
});

describe('computeTableColspan', () => {
  it('returns column count or 6 minimum', () => {
    expect(computeTableColspan(undefined, {})).toBeGreaterThanOrEqual(6);
    expect(computeTableColspan('custom', { custom: [{ field: 'a', header: 'A' }] })).toBe(1);
  });
});

describe('getBlockSumColumnIndex', () => {
  it('returns index of sum column', () => {
    const block: DocumentBlock = {
      type: 'table', order: 0, content: '', settings: {}, tableKind: 'products',
    };
    const idx = getBlockSumColumnIndex(block, {});
    expect(typeof idx).toBe('number');
    expect(idx).toBeGreaterThanOrEqual(0);
  });
});

// ── Block factories ────────────────────────────────────────────────────────

describe('createBlock', () => {
  it('creates a text block with defaults', () => {
    const block = createBlock('text', 5);
    expect(block.type).toBe('text');
    expect(block.order).toBe(5);
    expect(block.content).toBe('Новый текст…');
    expect(block.settings.fontSize).toBe(11);
  });

  it('creates a separator block with defaults', () => {
    const block = createBlock('separator', 3);
    expect(block.type).toBe('separator');
    expect(block.order).toBe(3);
    expect(block.content).toBe('');
    expect(block.settings.paddingBottom).toBe(4);
  });
});

describe('createTableBlock', () => {
  it('creates a table block with given params', () => {
    const block = createTableBlock(2, 'Услуги', 'services');
    expect(block.type).toBe('table');
    expect(block.order).toBe(2);
    expect(block.title).toBe('Услуги');
    expect(block.tableKind).toBe('services');
    expect(block.settings.fontSize).toBe(10);
  });
});

// ── Placeholder insertion ───────────────────────────────────────────────────

describe('insertPlaceholderText', () => {
  const blocks: DocumentBlock[] = [
    { type: 'text', order: 0, content: 'Hello ', settings: {} },
    { type: 'header', order: 1, content: 'Title', settings: {} },
    { type: 'separator', order: 2, content: '', settings: {} },
  ];

  it('appends token to text block', () => {
    const result = insertPlaceholderText(blocks, 0, '{{org.name}}');
    expect(result).not.toBe(blocks);
    expect(result[0].content).toBe('Hello {{org.name}}');
  });

  it('appends token to header block', () => {
    const result = insertPlaceholderText(blocks, 1, '{{doc.number}}');
    expect(result[1].content).toBe('Title{{doc.number}}');
  });

  it('skips non-text/header blocks', () => {
    const result = insertPlaceholderText(blocks, 2, '{{token}}');
    expect(result).toBe(blocks);
  });

  it('returns same array for null index', () => {
    const result = insertPlaceholderText(blocks, null, '{{token}}');
    expect(result).toBe(blocks);
  });

  it('returns same array for out-of-range index', () => {
    const result = insertPlaceholderText(blocks, 99, '{{token}}');
    expect(result).toBe(blocks);
  });
});

// ── TrackBy ────────────────────────────────────────────────────────────────

describe('trackBlock', () => {
  it('uses _id when available', () => {
    expect(trackBlock(0, { type: 'text', _id: 'abc', order: 0, content: '', settings: {} })).toBe('abc');
  });

  it('falls back to type-index', () => {
    expect(trackBlock(3, { type: 'header', order: 0, content: '', settings: {} })).toBe('header-3');
  });
});
