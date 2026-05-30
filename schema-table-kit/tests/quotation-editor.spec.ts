import { describe, expect, it } from 'vitest';
import { productsToTableItems } from '../quotation-editor/src/core';

describe('productsToTableItems', () => {
  it('maps product rows to table items', () => {
    const items = productsToTableItems([
      { _id: 'p1', sku: 'A-1', name: 'Bolt', listPrice: '12,50 ₽' },
    ]);
    expect(items).toHaveLength(1);
    expect(items[0].sku).toBe('A-1');
    expect(items[0].price).toBe(12.5);
    expect(items[0].qty).toBe(1);
  });
});
