import { Provider } from '@angular/core';
import { DEFAULT_COLUMN_TYPES, type SchemaTableKitConfig } from '../core';
import { HttpSchemaProvider, StaticSchemaProvider } from './providers/schema-providers';
import { COLUMN_TYPE_REGISTRY, SCHEMA_PROVIDER, SCHEMA_TABLE_KIT_CONFIG } from './tokens';

function resolveProvider(config: SchemaTableKitConfig) {
  const mode =
    config.provider ??
    (config.entities?.length ? 'static' : config.schemaApiUrl ? 'http' : 'static');

  if (mode === 'http') {
    if (!config.schemaApiUrl) {
      throw new Error('schema-table-kit: schemaApiUrl required for http provider');
    }
    return new HttpSchemaProvider(config.schemaApiUrl);
  }

  return new StaticSchemaProvider(config.entities ?? []);
}

export function provideSchemaTableKit(config: SchemaTableKitConfig): Provider[] {
  return [
    { provide: SCHEMA_TABLE_KIT_CONFIG, useValue: config },
    { provide: SCHEMA_PROVIDER, useFactory: () => resolveProvider(config) },
    { provide: COLUMN_TYPE_REGISTRY, useValue: [...DEFAULT_COLUMN_TYPES] },
  ];
}

export { SCHEMA_TABLE_KIT_CONFIG, SCHEMA_PROVIDER, COLUMN_TYPE_REGISTRY };
