import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { formatSchemaCell, sortRows, paginateRows, calculatePagination, toggleSort } from '../core';
import type { SchemaDataTableRow, SortState, PaginationState } from '../core';
import type { SchemaDataTableColumn } from '../core';
import { SCHEMA_DATA_TABLE_KIT_CONFIG } from './tokens';

@Component({
  selector: 'sdt-schema-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="sdt-table-wrap">
      @if (visibleColumns().length === 0) {
        <p class="sdt-empty">{{ emptyMessage() }}</p>
      } @else {
        <table class="sdt-table">
          <thead>
            <tr>
              @for (col of visibleColumns(); track col.field) {
                <th
                  [style.width]="col.width"
                  [class.sdt-sortable]="col.sortable !== false"
                  (click)="col.sortable !== false && onSort(col)"
                >
                  {{ col.header }}
                  @if (sortState()?.field === col.field) {
                    <span class="sdt-sort-icon">
                      {{ sortState()?.direction === 'asc' ? '\u25B2' : '\u25BC' }}
                    </span>
                  }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (displayRows().length === 0) {
              <tr>
                <td [attr.colspan]="visibleColumns().length" class="sdt-empty">
                  {{ emptyMessage() }}
                </td>
              </tr>
            } @else {
              @for (row of displayRows(); track trackRow($index, row)) {
                <tr>
                  @for (col of visibleColumns(); track col.field) {
                    <td>{{ formatCell(row, col) }}</td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>

        @if (pagination().total > defaultPageSize()) {
          <div class="sdt-paginator">
            <button
              class="sdt-pg-btn"
              [disabled]="pagination().page <= 1"
              (click)="goToPage(pagination().page - 1)"
            >
              &laquo; Prev
            </button>

            <span class="sdt-pg-info">
              Page {{ pagination().page }} of {{ totalPages() }}
              ({{ pagination().total }} items)
            </span>

            <button
              class="sdt-pg-btn"
              [disabled]="pagination().page >= totalPages()"
              (click)="goToPage(pagination().page + 1)"
            >
              Next &raquo;
            </button>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .sdt-table-wrap {
      overflow: auto;
      border: 1px solid var(--sdt-border, #e5e7eb);
      border-radius: 8px;
      background: #fff;
    }

    .sdt-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .sdt-table th,
    .sdt-table td {
      padding: 0.625rem 0.75rem;
      border-bottom: 1px solid var(--sdt-border, #e5e7eb);
      text-align: left;
    }

    .sdt-table th {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
      user-select: none;
    }

    .sdt-sortable {
      cursor: pointer;
    }

    .sdt-sortable:hover {
      background: #e5e7eb;
    }

    .sdt-sort-icon {
      margin-left: 4px;
      font-size: 0.625rem;
      vertical-align: middle;
    }

    .sdt-empty {
      padding: 1.5rem;
      text-align: center;
      color: #6b7280;
      margin: 0;
    }

    .sdt-paginator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.75rem;
      border-top: 1px solid var(--sdt-border, #e5e7eb);
      font-size: 0.8125rem;
      color: #374151;
    }

    .sdt-pg-btn {
      padding: 0.375rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font-size: 0.8125rem;
      color: #374151;
      transition: background 0.15s, border-color 0.15s;
    }

    .sdt-pg-btn:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .sdt-pg-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .sdt-pg-info {
      color: #6b7280;
    }
  `,
})
export class SchemaDataTableComponent {
  private readonly config = inject(SCHEMA_DATA_TABLE_KIT_CONFIG, { optional: true });

  readonly tableKey = input<string>('');
  readonly columns = input<SchemaDataTableColumn[]>([]);
  readonly rows = input<SchemaDataTableRow[]>([]);
  readonly pageSize = input<number>(this.config?.pageSize ?? 0);

  readonly sortState = signal<SortState | null>(null);
  readonly currentPage = signal(1);

  readonly visibleColumns = computed(() =>
    this.columns().filter((col: SchemaDataTableColumn) => col.field || col.header),
  );

  readonly emptyMessage = computed(
    () => this.config?.emptyMessage ?? 'No data to display',
  );

  readonly defaultPageSize = computed(() => this.pageSize() || this.config?.pageSize || 10);

  readonly sortedRows = computed(() =>
    sortRows(this.rows(), this.sortState()),
  );

  readonly pagination = computed<PaginationState>(() =>
    calculatePagination(this.sortedRows().length, this.currentPage(), this.defaultPageSize()),
  );

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.pagination().total / this.pagination().pageSize)),
  );

  readonly displayRows = computed(() => {
    if (!this.defaultPageSize()) return this.sortedRows();
    return paginateRows(this.sortedRows(), this.pagination());
  });

  formatCell(row: SchemaDataTableRow, column: SchemaDataTableColumn): string {
    return formatSchemaCell(row, column);
  }

  trackRow(index: number, row: SchemaDataTableRow): string {
    const id = row['_id'];
    return id != null ? String(id) : String(index);
  }

  onSort(column: SchemaDataTableColumn): void {
    if (!column.field) return;
    this.sortState.update((current) => toggleSort(current, column.field!));
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    this.currentPage.set(Math.max(1, page));
  }
}
