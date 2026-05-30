import type { SchemaColumn } from '@schema-table-kit/core';

export interface SchemaDataTableConfig {
  emptyMessage?: string;
}

export interface SchemaDataTableColumn extends SchemaColumn {}

export type SchemaDataTableRow = Record<string, unknown>;
