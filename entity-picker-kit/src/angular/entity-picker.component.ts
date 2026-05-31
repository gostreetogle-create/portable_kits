import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  entityPickerRowId,
  toggleEntityPickerSelection,
  type EntityPickerDefinition,
  type EntityPickerRow,
  type EntityPickerSelectionMode,
} from '../core';
import { ENTITY_PICKER_KIT_CONFIG } from './tokens';

@Component({
  selector: 'ep-entity-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    @if (visible()) {
      <div class="ep-backdrop" (click)="close()" role="presentation"></div>
      <div class="ep-dialog" role="dialog" aria-modal="true" [attr.aria-label]="definition()?.title">
        <header class="ep-dialog__header">
          <h2>{{ definition()?.title ?? 'Выбор' }}</h2>
          <button type="button" class="ep-dialog__close" (click)="close()" aria-label="Закрыть">×</button>
        </header>

        <div class="ep-dialog__search">
          <input
            type="search"
            [placeholder]="definition()?.searchPlaceholder ?? 'Поиск…'"
            [ngModel]="searchQuery()"
            (ngModelChange)="onSearchChange($event)"
          />
        </div>

        <div class="ep-dialog__body">
          @if (loading()) {
            <p class="ep-dialog__status">Загрузка…</p>
          } @else if (error()) {
            <p class="ep-dialog__status ep-dialog__status--error">{{ error() }}</p>
          } @else if (rows().length === 0) {
            <p class="ep-dialog__status">Ничего не найдено</p>
          } @else {
            <table class="ep-table">
              <thead>
                <tr>
                  @if (isMultiple()) {
                    <th class="ep-table__check" aria-label="Выбор"></th>
                  }
                  @for (col of definition()?.columns ?? []; track col.field) {
                    <th [style.width]="col.width">{{ col.header }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of rows(); track rowId(row)) {
                  <tr
                    tabindex="0"
                    role="button"
                    [class.ep-table__row--selected]="isRowSelected(row)"
                    (click)="onRowClick(row)"
                    (keydown.enter)="onRowClick(row)"
                    (dblclick)="onRowDblClick(row)"
                  >
                    @if (isMultiple()) {
                      <td class="ep-table__check">
                        <input
                          type="checkbox"
                          [checked]="isRowSelected(row)"
                          (click)="$event.stopPropagation(); toggleRow(row)"
                          aria-label="Выбрать строку"
                        />
                      </td>
                    }
                    @for (col of definition()?.columns ?? []; track col.field) {
                      <td>{{ formatCell(row, col.field) }}</td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>

        <footer class="ep-dialog__footer">
          @if (isMultiple() && selectedIds().size > 0) {
            <span class="ep-dialog__count">Выбрано: {{ selectedIds().size }}</span>
          }
          <button type="button" class="ep-btn ep-btn--secondary" (click)="close()">Отмена</button>
          <button
            type="button"
            class="ep-btn ep-btn--primary"
            [disabled]="!canConfirm()"
            (click)="confirmSelection()"
          >
            {{ isMultiple() ? 'Добавить выбранные' : 'Выбрать' }}
          </button>
        </footer>
      </div>
    }
  `,
  styles: `
    :host {
      --ep-primary: #2563eb;
      --ep-border: #e5e7eb;
      --ep-surface: #fff;
    }

    .ep-backdrop {
      position: fixed;
      inset: 0;
      background: rgb(0 0 0 / 40%);
      z-index: 1000;
    }

    .ep-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: min(960px, 96vw);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      background: var(--ep-surface);
      border-radius: 10px;
      box-shadow: 0 16px 48px rgb(0 0 0 / 18%);
    }

    .ep-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--ep-border);
    }

    .ep-dialog__header h2 {
      margin: 0;
      font-size: 1.125rem;
    }

    .ep-dialog__close {
      border: none;
      background: transparent;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      color: #6b7280;
    }

    .ep-dialog__search {
      padding: 0.75rem 1.25rem;
      border-bottom: 1px solid var(--ep-border);
    }

    .ep-dialog__search input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--ep-border);
      border-radius: 6px;
      font: inherit;
    }

    .ep-dialog__body {
      overflow: auto;
      padding: 0 1.25rem;
      flex: 1;
    }

    .ep-dialog__status {
      padding: 2rem 0;
      text-align: center;
      color: #6b7280;
    }

    .ep-dialog__status--error {
      color: #dc2626;
    }

    .ep-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .ep-table th,
    .ep-table td {
      padding: 0.625rem 0.5rem;
      border-bottom: 1px solid var(--ep-border);
      text-align: left;
    }

    .ep-table__check {
      width: 2.5rem;
      text-align: center;
    }

    .ep-table tbody tr {
      cursor: pointer;
    }

    .ep-table tbody tr:hover,
    .ep-table__row--selected {
      background: #eff6ff;
    }

    .ep-dialog__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--ep-border);
    }

    .ep-dialog__count {
      margin-right: auto;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .ep-btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px solid var(--ep-border);
      font: inherit;
      cursor: pointer;
    }

    .ep-btn--primary {
      background: var(--ep-primary);
      border-color: var(--ep-primary);
      color: #fff;
    }

    .ep-btn--primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ep-btn--secondary {
      background: #fff;
    }
  `,
})
export class EntityPickerComponent {
  private readonly config = inject(ENTITY_PICKER_KIT_CONFIG);

  readonly entityKey = model<string>('');
  readonly visible = model(false);
  /** Override entity definition selection mode. */
  readonly selectionMode = model<EntityPickerSelectionMode | undefined>(undefined);

  readonly selected = output<EntityPickerRow>();
  readonly selectedMany = output<EntityPickerRow[]>();

  readonly searchQuery = signal('');
  readonly rows = signal<EntityPickerRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedRow = signal<EntityPickerRow | null>(null);
  readonly selectedIds = signal<Set<string>>(new Set());

  readonly definition = computed(() =>
    this.config.entities.find(
      (e: EntityPickerDefinition) => e.entityKey === this.entityKey(),
    ),
  );

  readonly isMultiple = computed(() => {
    const override = this.selectionMode();
    if (override) return override === 'multiple';
    return this.definition()?.selectionMode === 'multiple';
  });

  readonly idField = computed(() => this.definition()?.idField ?? '_id');

  readonly selectedId = computed(() => {
    const row = this.selectedRow();
    if (!row) return null;
    return entityPickerRowId(row, this.idField());
  });

  private readonly loadEffect = effect(() => {
    if (!this.visible()) {
      this.resetState();
      return;
    }
    void this.loadRows();
  });

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
    void this.loadRows();
  }

  formatCell(row: EntityPickerRow, field: string): string {
    const value = row[field];
    if (value == null || value === '') return '—';
    return String(value);
  }

  rowId(row: EntityPickerRow): string {
    return entityPickerRowId(row, this.idField());
  }

  isRowSelected(row: EntityPickerRow): boolean {
    const id = this.rowId(row);
    if (this.isMultiple()) {
      return this.selectedIds().has(id);
    }
    return this.selectedId() === id;
  }

  onRowClick(row: EntityPickerRow): void {
    if (this.isMultiple()) {
      this.toggleRow(row);
    } else {
      this.selectedRow.set(row);
    }
  }

  onRowDblClick(row: EntityPickerRow): void {
    if (this.isMultiple()) {
      this.toggleRow(row);
    } else {
      this.selectedRow.set(row);
      this.confirmSelection();
    }
  }

  toggleRow(row: EntityPickerRow): void {
    const id = this.rowId(row);
    this.selectedIds.set(toggleEntityPickerSelection(this.selectedIds(), id));
  }

  canConfirm(): boolean {
    if (this.isMultiple()) return this.selectedIds().size > 0;
    return !!this.selectedRow();
  }

  confirmSelection(): void {
    if (this.isMultiple()) {
      const ids = this.selectedIds();
      const picked = this.rows().filter((row) => ids.has(this.rowId(row)));
      if (picked.length === 0) return;
      this.selectedMany.emit(picked);
      this.visible.set(false);
      return;
    }

    const row = this.selectedRow();
    if (!row) return;
    this.selected.emit(row);
    this.visible.set(false);
  }

  close(): void {
    this.visible.set(false);
  }

  private resetState(): void {
    this.searchQuery.set('');
    this.rows.set([]);
    this.loading.set(false);
    this.error.set(null);
    this.selectedRow.set(null);
    this.selectedIds.set(new Set());
  }

  private async loadRows(): Promise<void> {
    const def = this.definition();
    if (!def) {
      this.error.set(`Неизвестный entityKey: ${this.entityKey()}`);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const result = await def.search({
        search: this.searchQuery().trim() || undefined,
        page: 1,
        limit: 50,
      });
      this.rows.set(result.items);
    } catch (err: unknown) {
      this.rows.set([]);
      this.error.set(err instanceof Error ? err.message : 'Load error');
    } finally {
      this.loading.set(false);
    }
  }
}

export type { EntityPickerDefinition };
