import type { EntitySchema } from './types';

export interface SchemaProvider {
  loadEntities(): Promise<EntitySchema[]>;
  loadEntity(key: string): Promise<EntitySchema | undefined>;
}
