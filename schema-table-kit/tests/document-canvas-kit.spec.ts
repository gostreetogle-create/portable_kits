import { describe, expect, it } from 'vitest';
import { normalizeBlockOrder } from '../document-canvas-kit/src/core/types';

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
