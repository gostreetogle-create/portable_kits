import { InjectionToken } from '@angular/core';
import type { SchemaProvider, SchemaTableKitConfig } from '../core';

export const SCHEMA_TABLE_KIT_CONFIG = new InjectionToken<SchemaTableKitConfig>(
  'SCHEMA_TABLE_KIT_CONFIG',
);

export const SCHEMA_PROVIDER = new InjectionToken<SchemaProvider>('SCHEMA_PROVIDER');

export const COLUMN_TYPE_REGISTRY = new InjectionToken<
  { type: string; label: string; defaultWidth?: string; hasOptions?: boolean }[]
>('COLUMN_TYPE_REGISTRY');
