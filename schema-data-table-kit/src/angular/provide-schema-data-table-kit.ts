import { Provider } from '@angular/core';

import type { SchemaDataTableConfig } from '../core';
import { SCHEMA_DATA_TABLE_KIT_CONFIG } from './tokens';

export function provideSchemaDataTableKit(config: SchemaDataTableConfig = {}): Provider[] {
  return [{ provide: SCHEMA_DATA_TABLE_KIT_CONFIG, useValue: config }];
}

export { SCHEMA_DATA_TABLE_KIT_CONFIG };
