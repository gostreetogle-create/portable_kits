import { Directive } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[soSortableItem]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkDrag,
      inputs: [
        'cdkDragData: soSortableItemData',
        'cdkDragDisabled: soSortableItemDisabled',
        'cdkDragLockAxis: soSortableLockAxis',
      ],
      outputs: [
        'cdkDragStarted: soSortableItemStarted',
        'cdkDragEnded: soSortableItemEnded',
      ],
    },
  ],
  host: {
    class: 'so-sortable-item',
  },
})
export class SortableItemDirective {}
