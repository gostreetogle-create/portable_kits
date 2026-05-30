import { describe, expect, it } from 'vitest';
import { moveSortableItems } from '../src/angular/sortable.utils';

describe('sortable-kit moveSortableItems', () => {
  it('does not mutate source array', () => {
    const source = [1, 2, 3];
    moveSortableItems(source, { previousIndex: 1, currentIndex: 0 } as never);
    expect(source).toEqual([1, 2, 3]);
  });
});
