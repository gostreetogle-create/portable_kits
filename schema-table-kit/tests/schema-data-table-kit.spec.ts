import { describe, expect, it } from 'vitest';
import { formatSchemaCell } from '@schema-data-table-kit/core';

describe('formatSchemaCell', () => {
  it('formats field value from row', () => {
    const text = formatSchemaCell({ sku: 'ABC' }, { field: 'sku', header: 'SKU', type: 'text' });
    expect(text).toBe('ABC');
  });

  it('returns em dash for missing value', () => {
    const text = formatSchemaCell({}, { field: 'sku', header: 'SKU', type: 'text' });
    expect(text).toBe('—');
  });

  it('marks orphan columns', () => {
    const text = formatSchemaCell({ sku: 'ABC' }, {
      field: 'removed',
      header: 'X',
      type: 'text',
      isOrphan: true,
    });
    expect(text).toBe('—');
  });
});
