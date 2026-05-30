import { describe, expect, it } from 'vitest';
import { toggleEntityPickerSelection, entityPickerRowId } from '../entity-picker-kit/src/core';

describe('entityPickerRowId', () => {
  it('reads id field', () => {
    expect(entityPickerRowId({ _id: 'abc' })).toBe('abc');
    expect(entityPickerRowId({ id: 'x' }, 'id')).toBe('x');
  });
});

describe('toggleEntityPickerSelection', () => {
  it('adds and removes ids', () => {
    let set = toggleEntityPickerSelection(new Set(), 'a');
    expect([...set]).toEqual(['a']);
    set = toggleEntityPickerSelection(set, 'a');
    expect([...set]).toEqual([]);
  });
});
