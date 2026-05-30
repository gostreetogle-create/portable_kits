import type { SortableDropEvent } from './sortable.types';

export function moveSortableItems<T>(array: T[], event: SortableDropEvent<T>): T[] {
  const updated = [...array];
  const from = event.previousIndex;
  const to = event.currentIndex;
  if (from < 0 || to < 0 || from >= updated.length || to >= updated.length) {
    return updated;
  }
  const [item] = updated.splice(from, 1);
  updated.splice(to, 0, item);
  return updated;
}
