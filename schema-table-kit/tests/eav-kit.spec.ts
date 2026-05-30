import { describe, expect, it } from 'vitest';
import { isValidEavAttributeKey, normalizeEavAttributeOrder } from '../eav-kit/src/core';

describe('isValidEavAttributeKey', () => {
  it('accepts slug keys', () => {
    expect(isValidEavAttributeKey('weight')).toBe(true);
    expect(isValidEavAttributeKey('Bad Key')).toBe(false);
  });
});

describe('normalizeEavAttributeOrder', () => {
  it('reindexes order field', () => {
    const result = normalizeEavAttributeOrder([
      { entityKey: 'p', key: 'a', label: 'A', type: 'string', order: 9 },
      { entityKey: 'p', key: 'b', label: 'B', type: 'string', order: 1 },
    ]);
    expect(result.map((a) => a.order)).toEqual([0, 1]);
  });
});
