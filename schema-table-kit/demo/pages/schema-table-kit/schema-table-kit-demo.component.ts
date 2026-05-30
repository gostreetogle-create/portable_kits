import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { ColumnBuilderValue, ColumnValidationIssue, ProviderStatus, TableDefinitionDraft } from '../../../src/core';
import { findEntity } from '../../../src/core';
import { SchemaColumnBuilderComponent } from '../../../src/angular';
import {
  SAVED_TABLES_MOCK,
  STORAGE_KEY,
} from '../../mock-data/saved-tables.mock';
import { demoEnvironment } from '../../environment';
import { PRODUCTS_ENTITY } from '../../mock-data/schema-tables.config';
import { buildTablePreview, type TablePreviewModel } from '../../mock-data/table-preview-samples';

@Component({
  selector: 'demo-schema-table-kit',
  standalone: true,
  imports: [ReactiveFormsModule, SchemaColumnBuilderComponent, RouterLink],
  templateUrl: './schema-table-kit-demo.component.html',
  styleUrl: './schema-table-kit-demo.component.scss',
})
export class SchemaTableKitDemoComponent {
  readonly modeLabel =
    demoEnvironment.provider === 'http' ? 'HTTP :3333' : 'Static mock';

  readonly saved = signal<TableDefinitionDraft[]>(this.loadSaved());
  readonly jsonPreview = signal('');
  readonly tablePreview = signal<TablePreviewModel>({ columns: [], rows: [] });
  readonly validationIssues = signal<ColumnValidationIssue[]>([]);
  readonly providerStatus = signal<ProviderStatus>('idle');

  readonly form = new FormGroup({
    key: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    label: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    builder: new FormControl<ColumnBuilderValue>(
      { entityKey: '', columns: [] },
      { nonNullable: true },
    ),
  });

  constructor() {
    this.form.valueChanges.subscribe(() => this.updatePreview());
    this.updatePreview();
  }

  onValidation(issues: ColumnValidationIssue[]): void {
    this.validationIssues.set(issues);
  }

  onProviderStatus(status: ProviderStatus): void {
    this.providerStatus.set(status);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const builder = { ...this.form.controls.builder.value };
    const entity = findEntity([PRODUCTS_ENTITY], builder.entityKey);
    if (entity?.schemaVersion) {
      builder.savedSchemaVersion = entity.schemaVersion;
    }
    const draft: TableDefinitionDraft = {
      key: this.form.controls.key.value,
      label: this.form.controls.label.value,
      builder,
    };
    const list = [...this.saved().filter((s) => s.key !== draft.key), draft];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this.saved.set(list);
    this.form.controls.builder.setValue(builder);
    this.updatePreview();
  }

  loadExample(): void {
    const ex = SAVED_TABLES_MOCK[0];
    this.form.patchValue({
      key: ex.key,
      label: ex.label,
      builder: { ...ex.builder },
    });
  }

  loadOrphanExample(): void {
    const ex = SAVED_TABLES_MOCK[1];
    this.form.patchValue({
      key: ex.key,
      label: ex.label,
      builder: { ...ex.builder },
    });
  }

  openSaved(item: TableDefinitionDraft): void {
    this.form.patchValue({
      key: item.key,
      label: item.label,
      builder: { ...item.builder },
    });
  }

  clearForm(): void {
    this.form.reset({
      key: '',
      label: '',
      builder: { entityKey: '', columns: [] },
    });
  }

  private loadSaved(): TableDefinitionDraft[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as TableDefinitionDraft[];
    } catch {
      /* ignore */
    }
    return [];
  }

  private updatePreview(): void {
    const raw = this.form.getRawValue();
    this.jsonPreview.set(JSON.stringify(raw, null, 2));
    this.tablePreview.set(buildTablePreview(raw.builder.columns));
  }
}
