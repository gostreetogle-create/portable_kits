import { Directive } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[soSortableList]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkDropList,
      inputs: [
        'cdkDropListData: soSortableListData',
        'cdkDropListDisabled: soSortableListDisabled',
      ],
      outputs: ['cdkDropListDropped: soSortableListDropped'],
    },
  ],
  host: {
    class: 'so-sortable-list',
  },
})
export class SortableListDirective {}
