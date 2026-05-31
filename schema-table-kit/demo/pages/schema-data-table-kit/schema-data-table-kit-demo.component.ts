import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchemaDataTableComponent } from '@schema-data-table-kit/angular';
import type { SchemaDataTableColumn } from '@schema-data-table-kit/core';
import { SAVED_TABLES_MOCK } from '../../mock-data/saved-tables.mock';
import { buildTablePreview } from '../../mock-data/table-preview-samples';

const example = SAVED_TABLES_MOCK[0];
const preview = buildTablePreview(example.builder.columns);

/** Map formatted preview strings back to row objects for the data table demo. */
function previewRowsToObjects(
  columns: readonly SchemaDataTableColumn[],
  rows: string[][],
): Record<string, unknown>[] {
  return rows.map((cells) => {
    const row: Record<string, unknown> = {};
    columns.forEach((col, index) => {
      if (col.field) row[col.field] = cells[index];
    });
    return row;
  });
}

@Component({
  selector: 'demo-schema-data-table-kit',
  standalone: true,
  imports: [RouterLink, SchemaDataTableComponent],
  templateUrl: './schema-data-table-kit-demo.component.html',
  styleUrl: './schema-data-table-kit-demo.component.scss',
})
export class SchemaDataTableKitDemoComponent {
  readonly tableKey = example.key;
  readonly columns = preview.columns as unknown as SchemaDataTableColumn[];
  readonly rows = previewRowsToObjects(this.columns, preview.rows);
}
