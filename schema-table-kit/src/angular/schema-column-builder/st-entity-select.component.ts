import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { EntitySchema } from '../../core';

@Component({
  selector: 'st-entity-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="st-field">
      <span class="st-field__label">{{ label() }}</span>
      <select
        class="st-select"
        [disabled]="disabled()"
        [value]="value()"
        (change)="onChange($event)"
      >
        <option value="">{{ placeholder() }}</option>
        @for (e of entities(); track e.key) {
          <option [value]="e.key">{{ e.label }}</option>
        }
      </select>
    </label>
  `,
  styles: `
    .st-field { display: flex; flex-direction: column; gap: 4px; }
    .st-field__label { font-size: 13px; font-weight: 600; color: var(--st-text-secondary); }
    .st-select { padding: 8px 10px; border: 1px solid var(--st-border); border-radius: 6px; font-size: 14px; }
  `,
})
export class StEntitySelectComponent {
  readonly label = input('Таблица БД');
  readonly placeholder = input('Выберите таблицу');
  readonly value = input('');
  readonly entities = input<EntitySchema[]>([]);
  readonly disabled = input(false);
  readonly valueChange = output<string>();

  onChange(event: Event): void {
    const el = event.target as HTMLSelectElement;
    this.valueChange.emit(el.value);
  }
}
