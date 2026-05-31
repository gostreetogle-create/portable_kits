import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  contentChild,
  inject,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

import type { CrudAction, CrudPageColumn, CrudPageConfig, CrudPermissions } from '../core';
import { CrudStore } from '../core';
import { CRUD_PAGE_KIT_CONFIG } from './tokens';

@Component({
  selector: 'cp-crud-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <section class="cp-page">
      <header class="cp-page__header">
        <div>
          <h1>{{ config().title }}</h1>
          @if (config().description) {
            <p class="cp-page__desc">{{ config().description }}</p>
          }
        </div>
        @if (canCreate()) {
          <button type="button" class="cp-btn cp-btn--primary" (click)="openCreate()">
            {{ config().createLabel ?? 'Создать' }}
          </button>
        }
      </header>

      @if (store().error() && !store().loading()) {
        <div class="cp-page__error" role="alert">
          {{ store().error() }}
          <button type="button" class="cp-btn cp-btn--sm" (click)="retryLoad()">Повторить</button>
        </div>
      }

      <div class="cp-toolbar">
        <input
          type="search"
          class="cp-search"
          placeholder="Поиск…"
          [ngModel]="store().search()"
          (ngModelChange)="store().setSearch($event)"
        />
        @if (store().loading()) {
          <span class="cp-toolbar__status">Загрузка…</span>
        }
      </div>

      <div class="cp-table-wrap">
        <table class="cp-table">
          <thead>
            <tr>
              @for (col of columns(); track col.field) {
                <th [style.width]="col.width">{{ col.header }}</th>
              }
              @if (showActions()) {
                <th class="cp-table__actions-col">Действия</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (store().items().length === 0 && !store().loading()) {
              <tr>
                <td [attr.colspan]="columns().length + (showActions() ? 1 : 0)" class="cp-empty">
                  {{ config().emptyMessage ?? 'Нет данных' }}
                </td>
              </tr>
            } @else {
              @for (row of store().items(); track rowId(row)) {
                <tr>
                  @for (col of columns(); track col.field) {
                    <td>{{ formatCell(row, col.field) }}</td>
                  }
                  @if (showActions()) {
                    <td class="cp-table__actions">
                      @if (canEdit()) {
                        <button type="button" class="cp-btn cp-btn--sm" (click)="openEdit(row)">Изм.</button>
                      }
                      @if (canDelete()) {
                        <button type="button" class="cp-btn cp-btn--sm cp-btn--danger" (click)="confirmDelete(row)">
                          Удал.
                        </button>
                      }
                      @for (action of visibleActions(row); track action.id) {
                        <button type="button" class="cp-btn cp-btn--sm" (click)="action.handler(row)">
                          {{ action.label }}
                        </button>
                      }
                    </td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <footer class="cp-pager">
        <span>Всего: {{ store().total() }}</span>
        <div class="cp-pager__controls">
          <button
            type="button"
            class="cp-btn cp-btn--sm"
            [disabled]="store().page() <= 1"
            (click)="store().goToPage(store().page() - 1)"
          >
            ←
          </button>
          <span>Стр. {{ store().page() }}</span>
          <button
            type="button"
            class="cp-btn cp-btn--sm"
            [disabled]="store().page() * store().limit() >= store().total()"
            (click)="store().goToPage(store().page() + 1)"
          >
            →
          </button>
        </div>
      </footer>
    </section>

    @if (dialogVisible()) {
      <div class="cp-dialog-backdrop" (click)="closeDialog()"></div>
      <div class="cp-dialog" role="dialog" aria-modal="true">
        <header class="cp-dialog__header">
          <h2>{{ dialogTitle() }}</h2>
          <button type="button" class="cp-dialog__close" (click)="closeDialog()">×</button>
        </header>
        <div class="cp-dialog__body">
          @if (formTemplate()) {
            <ng-container
              *ngTemplateOutlet="formTemplate()!; context: { $implicit: editRow(), row: editRow(), id: editingId() }"
            />
          } @else {
            <p>Форма не задана. Используйте &lt;ng-template #form&gt;.</p>
          }
        </div>
        <footer class="cp-dialog__footer">
          <button type="button" class="cp-btn" (click)="closeDialog()" [disabled]="store().saving()">
            Отмена
          </button>
          <button type="button" class="cp-btn cp-btn--primary" (click)="save()" [disabled]="store().saving()">
            {{ store().saving() ? 'Сохранение…' : 'Сохранить' }}
          </button>
        </footer>
      </div>
    }
  `,
  styles: `
    .cp-page {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cp-page__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    .cp-page__header h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .cp-page__desc {
      margin: 0.25rem 0 0;
      color: #6b7280;
    }

    .cp-page__error {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #b91c1c;
    }

    .cp-toolbar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .cp-search {
      flex: 1;
      max-width: 320px;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font: inherit;
    }

    .cp-toolbar__status {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .cp-table-wrap {
      overflow: auto;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .cp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .cp-table th,
    .cp-table td {
      padding: 0.625rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
    }

    .cp-table th {
      background: #f9fafb;
      font-weight: 600;
    }

    .cp-table__actions-col {
      width: 160px;
    }

    .cp-table__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .cp-empty {
      text-align: center;
      color: #6b7280;
      padding: 2rem !important;
    }

    .cp-pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .cp-pager__controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cp-btn {
      padding: 0.5rem 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: #fff;
      font: inherit;
      cursor: pointer;
    }

    .cp-btn--sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.8125rem;
    }

    .cp-btn--primary {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }

    .cp-btn--danger {
      color: #dc2626;
      border-color: #fecaca;
    }

    .cp-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .cp-dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgb(0 0 0 / 40%);
      z-index: 1000;
    }

    .cp-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: min(480px, 96vw);
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 16px 48px rgb(0 0 0 / 18%);
    }

    .cp-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .cp-dialog__header h2 {
      margin: 0;
      font-size: 1.125rem;
    }

    .cp-dialog__close {
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .cp-dialog__body {
      padding: 1rem 1.25rem;
    }

    .cp-dialog__footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      border-top: 1px solid #e5e7eb;
    }
  `,
})
export class CrudPageComponent implements OnInit {
  private readonly kitConfig = inject(CRUD_PAGE_KIT_CONFIG, { optional: true });

  readonly store = input.required<CrudStore<object>>();
  readonly config = input.required<CrudPageConfig>();
  readonly columns = input.required<CrudPageColumn[]>();
  readonly permissions = input<CrudPermissions | null>(null);
  readonly extraActions = input<CrudAction<object>[]>([]);
  readonly idField = input('_id');

  readonly formTemplate = contentChild<TemplateRef<unknown>>('form');

  readonly dialogVisible = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly editRow = signal<Record<string, unknown> | null>(null);
  readonly dialogTitle = signal('');

  ngOnInit(): void {
    void this.store().load();
  }

  rowId(row: object): string {
    const key = this.idField();
    return String((row as Record<string, unknown>)[key] ?? '');
  }

  formatCell(row: object, field: string): string {
    const value = (row as Record<string, unknown>)[field];
    if (value == null || value === '') return '—';
    return String(value);
  }

  canCreate(): boolean {
    const perm = this.permissions()?.create;
    if (!perm) return true;
    return this.kitConfig?.checkPermission?.(perm) ?? true;
  }

  canEdit(): boolean {
    const perm = this.permissions()?.edit;
    if (!perm) return true;
    return this.kitConfig?.checkPermission?.(perm) ?? true;
  }

  canDelete(): boolean {
    const perm = this.permissions()?.delete;
    if (!perm) return true;
    return this.kitConfig?.checkPermission?.(perm) ?? true;
  }

  showActions(): boolean {
    return this.canEdit() || this.canDelete() || this.extraActions().length > 0;
  }

  visibleActions(row: object): CrudAction<object>[] {
    return this.extraActions().filter((a) => !a.visible || a.visible(row));
  }

  openCreate(): void {
    this.editingId.set(null);
    this.editRow.set({});
    this.dialogTitle.set('Create');
    this.dialogVisible.set(true);
  }

  openEdit(row: object): void {
    this.editingId.set(this.rowId(row));
    this.editRow.set({ ...(row as Record<string, unknown>) });
    this.dialogTitle.set('Редактирование');
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.editingId.set(null);
    this.editRow.set(null);
  }

  async save(): Promise<void> {
    const row = this.editRow();
    if (!row) return;
    const id = this.editingId();
    if (id) {
      await this.store().update(id, row);
    } else {
      await this.store().create(row);
    }
    this.closeDialog();
  }

  confirmDelete(row: object): void {
    const id = this.rowId(row);
    if (!id) return;
    if (globalThis.confirm?.('Удалить запись?') ?? true) {
      void this.store().delete(id);
    }
  }

  retryLoad(): void {
    void this.store().load();
  }
}
