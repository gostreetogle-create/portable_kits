import { Component, input, output, model, computed, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { KpButtonComponent } from '../button';
import { KpSearchComponent } from '../search';
import { KpTagComponent } from '../tag';
import { KpPaginatorComponent } from '../paginator';

export interface KpColumn {
  field: string;
  header: string;
  type: 'text' | 'number' | 'tag' | 'boolean' | 'date' | 'select' | 'textarea' | 'image';
  width?: string;
  options?: { label: string; value: unknown }[];
  sortable?: boolean;
  required?: boolean;
  readonly?: boolean;
  /** Однострочное обрезание с «…» (по умолчанию для text/select) */
  ellipsis?: boolean;
  /** Многострочное обрезание (2 строки) для длинных тем */
  maxLines?: 1 | 2;
}

export interface KpSortEvent {
  field: string;
  order: 1 | -1;
}

export interface KpPageEvent {
  first: number;
  rows: number;
}

export interface KpTableAction {
  id: string;
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'danger';
  permission?: string;
  handler: (row: Record<string, unknown>) => void;
  visible?: (row: Record<string, unknown>) => boolean;
}

@Component({
  selector: 'up-kp-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe, FormsModule,
    TableModule,
    KpButtonComponent, KpSearchComponent, KpTagComponent,
    KpPaginatorComponent,
  ],
  templateUrl: './kp-table.component.html',
  styleUrl: './kp-table.component.scss',
})
export class KpTableComponent {
  readonly columns = input.required<KpColumn[]>();
  readonly data = input.required<object[]>();
  readonly total = input(0);
  readonly loading = input(false);

  readonly paginator = input(true);
  readonly page = model(1);
  readonly limit = model(15);
  readonly rowsPerPageOptions = input<number[]>([10, 25, 50]);
  readonly sortField = model<string>('createdAt');
  readonly sortOrder = model<-1 | 1>(-1);

  readonly showSearch = input(true);
  readonly searchQuery = model<string>('');

  readonly title = input<string>('');
  readonly showToolbarTitle = input(true);
  readonly showActions = input(true);

  readonly showRowActions = input(true);
  readonly canUpdate = input(true);
  readonly canDelete = input(true);
  readonly extraRowActions = input<KpTableAction[]>([]);

  readonly emptyMessage = input('Нет данных');
  readonly severityFn = input<(value: unknown) => string>(() => 'info');
  /** Функция проверки прав. Если не передана — все действия разрешены. */
  readonly checkPermission = input<(permission: string) => boolean>();

  readonly sortChange = output<KpSortEvent>();
  readonly pageEvent = output<KpPageEvent>();
  readonly searchChange = output<string>();
  readonly edit = output<Record<string, unknown>>();
  readonly deleteRow = output<Record<string, unknown>>();

  /** first-индекс текущей страницы (0-based), вычисляется из page и limit */
  readonly paginatorFirst = computed(() => (this.page() - 1) * this.limit());

  /** Тулбар всегда виден: поиск, действия и/или счётчик записей */
  readonly showToolbar = computed(
    () => this.showSearch() || this.showActions() || this.showToolbarTitle(),
  );

  /** UniButton: только primary | secondary | danger */
  resolveButtonSeverity(
    severity?: KpTableAction['severity'],
  ): 'primary' | 'secondary' | 'danger' {
    if (severity === 'danger') return 'danger';
    if (severity === 'secondary') return 'secondary';
    return 'primary';
  }

  getFirstPhoto(value: unknown): string | null {
    if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (typeof first === 'object' && first !== null && 'url' in first) {
        return (first as { url: string }).url || null;
      }
      if (typeof first === 'string') return (first as string).trim() || null;
    }
    if (typeof value === 'string' && value.trim()) {
      const parts = value.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean);
      return parts[0] || null;
    }
    return null;
  }

  onSortHandler(event: { field?: string; order?: number }): void {
    this.sortChange.emit({
      field: event.field || 'createdAt',
      order: (event.order === 1 ? 1 : -1) as 1 | -1,
    });
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
    this.searchChange.emit(value);
  }

  onPaginatorPageChange(event: { first: number; rows: number }): void {
    const page = Math.floor(event.first / event.rows) + 1;
    this.page.set(page);
    this.limit.set(event.rows);
    this.pageEvent.emit(event);
  }

  getSelectLabel(col: KpColumn, value: unknown): string {
    if (!col.options) return String(value ?? '—');
    const opt = col.options.find((o) => o.value === value);
    return opt?.label ?? String(value ?? '—');
  }

  formatCell(value: unknown): string {
    if (value == null || value === '') return '—';
    return String(value);
  }

  useEllipsis(col: KpColumn): boolean {
    if (col.maxLines === 2) return false;
    if (col.ellipsis === false) return false;
    return col.type === 'text' || col.type === 'select' || col.type === 'textarea';
  }

  canExecAction(action: KpTableAction): boolean {
    if (!action.permission) return true;
    const check = this.checkPermission();
    if (!check) return true;
    return check(action.permission);
  }

  cellTitle(col: KpColumn, value: unknown): string | null {
    if (!this.useEllipsis(col) && col.maxLines !== 2) return null;
    const text =
      col.type === 'select'
        ? this.getSelectLabel(col, value)
        : this.formatCell(value);
    return text === '—' ? null : text;
  }
}
