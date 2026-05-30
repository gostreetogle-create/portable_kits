import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SortableHandleDirective,
  SortableItemDirective,
  SortableListDirective,
  moveSortableItems,
} from '@sortable-kit/angular';

interface DemoTask {
  id: string;
  title: string;
}

@Component({
  selector: 'demo-sortable-kit',
  standalone: true,
  imports: [RouterLink, SortableListDirective, SortableItemDirective, SortableHandleDirective],
  templateUrl: './sortable-kit-demo.component.html',
  styleUrl: './sortable-kit-demo.component.scss',
})
export class SortableKitDemoComponent {
  readonly tasks = signal<DemoTask[]>([
    { id: '1', title: 'Подготовить схему таблицы' },
    { id: '2', title: 'Настроить колонки' },
    { id: '3', title: 'Сохранить определение' },
    { id: '4', title: 'Подключить к документу' },
  ]);

  readonly lastDrop = signal('');

  onDropped(event: { previousIndex: number; currentIndex: number }): void {
    this.tasks.update((items) => moveSortableItems(items, event));
    this.lastDrop.set(
      `Перемещено: ${event.previousIndex} → ${event.currentIndex}`,
    );
  }
}
