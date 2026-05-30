import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { formatSchemaCell } from '../core';
import type { SchemaDataTableRow } from '../core';
import type { SchemaColumn } from '@schema-table-kit/core';
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
                <th [style.width]="col.width">{{ col.header }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (rows().length === 0) {
              <tr>
                <td [attr.colspan]="visibleColumns().length" class="sdt-empty">
                  {{ emptyMessage() }}
                </td>
              </tr>
            } @else {
              @for (row of rows(); track trackRow($index, row)) {
                <tr>
                  @for (col of visibleColumns(); track col.field) {
                    <td>{{ formatCell(row, col) }}</td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
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
    }

    .sdt-empty {
      padding: 1.5rem;
      text-align: center;
      color: #6b7280;
      margin: 0;
    }
  `,
})
export class SchemaDataTableComponent {
  private readonly config = inject(SCHEMA_DATA_TABLE_KIT_CONFIG, { optional: true });

  readonly tableKey = input<string>('');
  readonly columns = input<SchemaColumn[]>([]);
  readonly rows = input<SchemaDataTableRow[]>([]);

  readonly visibleColumns = computed(() =>
    this.columns().filter((col: SchemaColumn) => col.field || col.header),
  );

  readonly emptyMessage = computed(
    () => this.config?.emptyMessage ?? 'Нет данных для отображения',
  );

  formatCell(row: SchemaDataTableRow, column: SchemaColumn): string {
    return formatSchemaCell(row, column);
  }

  trackRow(index: number, row: SchemaDataTableRow): string {
    const id = row['_id'];
    return id != null ? String(id) : String(index);
  }
}
