import { describe, expect, it } from 'vitest';
import { moveSortableItems } from '../../sortable-kit/src/angular/sortable.utils';

describe('moveSortableItems', () => {
  it('reorders array by drag indices', () => {
    const items = ['a', 'b', 'c'];
    const result = moveSortableItems(items, {
      previousIndex: 0,
      currentIndex: 2,
    });
    expect(result).toEqual(['b', 'c', 'a']);
    expect(items).toEqual(['a', 'b', 'c']);
  });
});
