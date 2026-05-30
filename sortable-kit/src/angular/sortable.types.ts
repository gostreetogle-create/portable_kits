export interface SortableDropEvent<T = unknown> {
  previousIndex: number;
  currentIndex: number;
  item?: T;
}

/** Compatible with Angular CDK CdkDragDrop when using CDK-backed directives. */
export type SortableDropEventFromCdk<T> = SortableDropEvent<T> & {
  container?: unknown;
  previousContainer?: unknown;
};
