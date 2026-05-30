import {
  Component,
  inject,
  input,
  output,
  signal,
  effect,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import type {
  ColumnBuilderValue,
  ColumnValidationIssue,
  EntityFieldMeta,
  EntitySchema,
  ProviderStatus,
  SchemaColumn,
} from '../../core';
import {
  buildColumnFromField,
  findEntity,
  findFieldMeta,
  getSelectableFields,
  markOrphanColumns,
  validateColumns,
} from '../../core';
import { DEFAULT_LABELS, type SchemaBuilderLabels } from './labels.ru';
import { StEntitySelectComponent } from './st-entity-select.component';
import { StColumnRowComponent } from './st-column-row.component';
import { COLUMN_TYPE_REGISTRY, SCHEMA_PROVIDER } from '../tokens';

const EMPTY_VALUE: ColumnBuilderValue = { entityKey: '', columns: [] };

@Component({
  selector: 'st-schema-column-builder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StEntitySelectComponent, StColumnRowComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchemaColumnBuilderComponent),
      multi: true,
    },
  ],
  templateUrl: './schema-column-builder.component.html',
  styleUrl: './schema-column-builder.component.scss',
})
export class SchemaColumnBuilderComponent implements ControlValueAccessor {
  private readonly schemaProvider = inject(SCHEMA_PROVIDER);
  protected readonly columnTypeRegistry = inject(COLUMN_TYPE_REGISTRY);

  readonly labels = input<SchemaBuilderLabels>(DEFAULT_LABELS);
  readonly disabled = input(false);

  readonly validationChange = output<ColumnValidationIssue[]>();
  readonly providerStatusChange = output<ProviderStatus>();

  readonly entities = signal<EntitySchema[]>([]);
  readonly providerStatus = signal<ProviderStatus>('idle');
  readonly value = signal<ColumnBuilderValue>({ ...EMPTY_VALUE });
  readonly driftWarning = signal(false);

  private onChange: (v: ColumnBuilderValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private formDisabled = false;

  constructor() {
    effect(() => {
      this.validationChange.emit(this.runValidation());
    });

    effect(() => {
      this.providerStatusChange.emit(this.providerStatus());
    });

    this.loadEntities();
  }

  writeValue(obj: ColumnBuilderValue | null): void {
    const next = obj ?? { ...EMPTY_VALUE };
    this.value.set({
      entityKey: next.entityKey ?? '',
      columns: [...(next.columns ?? [])],
      savedSchemaVersion: next.savedSchemaVersion,
    });
    this.refreshOrphans();
    this.checkDrift();
  }

  registerOnChange(fn: (v: ColumnBuilderValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
  }

  isDisabled(): boolean {
    return this.disabled() || this.formDisabled || this.providerStatus() === 'loading';
  }

  async loadEntities(): Promise<void> {
    this.providerStatus.set('loading');
    try {
      const list = await this.schemaProvider.loadEntities();
      this.entities.set(list);
      this.refreshOrphans();
      this.checkDrift();
      this.providerStatus.set('ready');
    } catch {
      this.providerStatus.set('error');
    }
  }

  onEntityChange(entityKey: string): void {
    const prev = this.value();
    if (prev.entityKey && prev.entityKey !== entityKey && prev.columns.length > 0) {
      const ok = confirm('Сменить таблицу? Текущие колонки будут сброшены.');
      if (!ok) return;
    }
    this.patchValue({
      entityKey,
      columns: entityKey === prev.entityKey ? prev.columns : [],
      savedSchemaVersion: undefined,
    });
  }

  addColumn(): void {
    const v = this.value();
    if (!v.entityKey) return;
    this.patchValue({
      ...v,
      columns: [...v.columns, { field: '', header: '', type: 'text' }],
    });
  }

  clearColumns(): void {
    this.patchValue({ ...this.value(), columns: [] });
  }

  removeColumn(index: number): void {
    const cols = [...this.value().columns];
    cols.splice(index, 1);
    this.patchValue({ ...this.value(), columns: cols });
  }

  moveColumn(index: number, dir: -1 | 1): void {
    const target = index + dir;
    const cols = [...this.value().columns];
    if (target < 0 || target >= cols.length) return;
    [cols[index], cols[target]] = [cols[target], cols[index]];
    this.patchValue({ ...this.value(), columns: cols });
  }

  onFieldChange(index: number, field: string): void {
    const entity = findEntity(this.entities(), this.value().entityKey);
    const meta = findFieldMeta(entity, field);
    const cols = [...this.value().columns];
    cols[index] = meta
      ? { ...buildColumnFromField(meta), isOrphan: false }
      : { ...cols[index], field, isOrphan: false };
    this.patchValue({ ...this.value(), columns: cols });
  }

  patchColumn(index: number, patch: Partial<SchemaColumn>): void {
    const cols = [...this.value().columns];
    cols[index] = { ...cols[index], ...patch };
    this.patchValue({ ...this.value(), columns: cols });
  }

  availableFieldsForRow(rowIndex: number): EntityFieldMeta[] {
    const entity = findEntity(this.entities(), this.value().entityKey);
    const all = getSelectableFields(entity);
    const used = new Set(
      this.value()
        .columns.map((c, i) => (i === rowIndex ? '' : c.field))
        .filter(Boolean),
    );
    return all.filter((f) => !used.has(f.field));
  }

  private patchValue(next: ColumnBuilderValue): void {
    const marked = markOrphanColumns(
      next.entityKey,
      next.columns,
      this.entities(),
    );
    this.value.set({
      entityKey: next.entityKey,
      columns: marked,
      savedSchemaVersion: next.savedSchemaVersion,
    });
    this.checkDrift();
    this.onChange(this.value());
    this.onTouched();
  }

  private refreshOrphans(): void {
    const v = this.value();
    const marked = markOrphanColumns(v.entityKey, v.columns, this.entities());
    if (JSON.stringify(marked) !== JSON.stringify(v.columns)) {
      this.value.set({ ...v, columns: marked });
    }
  }

  private checkDrift(): void {
    const v = this.value();
    const entity = findEntity(this.entities(), v.entityKey);
    this.driftWarning.set(
      !!entity &&
        !!v.savedSchemaVersion &&
        entity.schemaVersion !== v.savedSchemaVersion,
    );
  }

  private runValidation(): ColumnValidationIssue[] {
    const v = this.value();
    return validateColumns(
      v.entityKey,
      v.columns,
      this.entities(),
      v.savedSchemaVersion,
    );
  }
}
