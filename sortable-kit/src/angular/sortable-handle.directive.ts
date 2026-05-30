import { Directive } from '@angular/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[soSortableHandle]',
  standalone: true,
  hostDirectives: [{ directive: CdkDragHandle }],
  host: {
    class: 'so-sortable-handle',
  },
})
export class SortableHandleDirective {}
