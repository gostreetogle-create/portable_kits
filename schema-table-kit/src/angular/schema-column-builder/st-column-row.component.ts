import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { EntityFieldMeta, SchemaColumn } from '../../core';
import { fieldOptionLabel } from '../../core';

@Component({
  selector: 'st-column-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="st-row" [class.st-row--orphan]="column().isOrphan">
      <div class="st-row__main">
        <label class="st-field st-field--grow">
          <span class="st-field__label">{{ fieldLabel() }}</span>
          <select
            class="st-select"
            [value]="column().field"
            (change)="onFieldChange($event)"
          >
            <option value="">{{ fieldPlaceholder() }}</option>
            @for (f of availableFields(); track f.field) {
              <option [value]="f.field">{{ fieldOptionLabel(f) }}</option>
            }
          </select>
        </label>

        <label class="st-field st-field--grow">
          <span class="st-field__label">{{ headerLabel() }}</span>
          <input
            class="st-input"
            [value]="column().header"
            (input)="onHeaderInput($event)"
          />
        </label>

        <label class="st-field">
          <span class="st-field__label">{{ typeLabel() }}</span>
          <select
            class="st-select"
            [value]="column().type"
            (change)="onTypeChange($event)"
          >
            @for (t of columnTypes(); track t.type) {
              <option [value]="t.type">{{ t.label }}</option>
            }
          </select>
        </label>

        <label class="st-field st-field--narrow">
          <span class="st-field__label">{{ widthLabel() }}</span>
          <input
            class="st-input"
            [value]="column().width ?? ''"
            placeholder="120px"
            (input)="onWidthInput($event)"
          />
        </label>
      </div>

      <div class="st-row__actions">
        @if (column().isOrphan) {
          <span class="st-badge">{{ orphanBadge() }}</span>
        }
        <button type="button" class="st-btn st-btn--ghost" [title]="moveUpLabel()" (click)="moveUp.emit()">↑</button>
        <button type="button" class="st-btn st-btn--ghost" [title]="moveDownLabel()" (click)="moveDown.emit()">↓</button>
        <button type="button" class="st-btn st-btn--danger" [title]="removeLabel()" (click)="remove.emit()">×</button>
      </div>
    </div>
  `,
  styles: `
    .st-row {
      display: flex; gap: 8px; align-items: flex-start; padding: 10px 12px;
      border-bottom: 1px solid var(--st-border); background: var(--st-surface);
    }
    .st-row--orphan { background: var(--st-warning-bg); }
    .st-row__main { flex: 1; display: flex; flex-wrap: wrap; gap: 8px; min-width: 0; }
    .st-row__actions { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
    .st-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .st-field--grow { flex: 1 1 140px; }
    .st-field--narrow { width: 90px; flex-shrink: 0; }
    .st-field__label { font-size: 11px; font-weight: 600; color: var(--st-text-tertiary); }
    .st-select, .st-input {
      padding: 7px 9px; border: 1px solid var(--st-border); border-radius: 6px; font-size: 13px; width: 100%;
    }
    .st-btn {
      border: 1px solid var(--st-border); background: var(--st-surface); border-radius: 6px;
      width: 32px; height: 32px; cursor: pointer; font-size: 16px; line-height: 1;
    }
    .st-btn--ghost:hover { background: var(--st-surface-hover); }
    .st-btn--danger { color: var(--st-danger); }
    .st-badge {
      font-size: 11px; padding: 2px 6px; border-radius: 4px;
      background: var(--st-warning); color: #fff; white-space: nowrap;
    }
  `,
})
export class StColumnRowComponent {
  readonly column = input.required<SchemaColumn>();
  readonly availableFields = input<EntityFieldMeta[]>([]);
  readonly columnTypes = input<{ type: string; label: string }[]>([]);
  readonly fieldLabel = input('Поле');
  readonly fieldPlaceholder = input('Выберите поле');
  readonly headerLabel = input('Заголовок');
  readonly typeLabel = input('Тип');
  readonly widthLabel = input('Ширина');
  readonly orphanBadge = input('Устарело');
  readonly moveUpLabel = input('Вверх');
  readonly moveDownLabel = input('Вниз');
  readonly removeLabel = input('Удалить');

  readonly fieldChange = output<string>();
  readonly headerChange = output<string>();
  readonly typeChange = output<string>();
  readonly widthChange = output<string>();
  readonly moveUp = output<void>();
  readonly moveDown = output<void>();
  readonly remove = output<void>();

  protected fieldOptionLabel = fieldOptionLabel;

  onFieldChange(event: Event): void {
    this.fieldChange.emit((event.target as HTMLSelectElement).value);
  }

  onHeaderInput(event: Event): void {
    this.headerChange.emit((event.target as HTMLInputElement).value);
  }

  onTypeChange(event: Event): void {
    this.typeChange.emit((event.target as HTMLSelectElement).value);
  }

  onWidthInput(event: Event): void {
    this.widthChange.emit((event.target as HTMLInputElement).value);
  }
}
