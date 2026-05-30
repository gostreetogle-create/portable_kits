import { describe, expect, it } from 'vitest';
import {
  computeTableItemSum,
  normalizeBlockOrder,
  tableSumColumnIndex,
  DEFAULT_TABLE_COLUMNS,
} from '../document-canvas-kit/src/core/types';

describe('normalizeBlockOrder', () => {
  it('reindexes block order field', () => {
    const blocks = [
      { type: 'text' as const, order: 5, content: 'a', settings: {} },
      { type: 'text' as const, order: 2, content: 'b', settings: {} },
    ];
    const result = normalizeBlockOrder(blocks);
    expect(result.map((b) => b.order)).toEqual([0, 1]);
    expect(result[0].content).toBe('a');
  });
});

describe('computeTableItemSum', () => {
  it('multiplies qty and price', () => {
    expect(computeTableItemSum({ qty: 3, price: 10.5 })).toBe(31.5);
  });
});

describe('tableSumColumnIndex', () => {
  it('finds sum column or falls back to last', () => {
    expect(tableSumColumnIndex(DEFAULT_TABLE_COLUMNS)).toBe(6);
    expect(tableSumColumnIndex([{ field: 'name', header: 'Name' }])).toBe(0);
  });
});
