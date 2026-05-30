import type { SchemaProvider } from '../../core';
import type { EntitySchema } from '../../core';

export class StaticSchemaProvider implements SchemaProvider {
  constructor(private readonly entities: EntitySchema[]) {}

  async loadEntities(): Promise<EntitySchema[]> {
    return this.entities;
  }

  async loadEntity(key: string): Promise<EntitySchema | undefined> {
    return this.entities.find((e) => e.key === key);
  }
}

export class HttpSchemaProvider implements SchemaProvider {
  constructor(private readonly baseUrl: string) {}

  async loadEntities(): Promise<EntitySchema[]> {
    const res = await fetch(`${this.baseUrl}/entities`);
    if (!res.ok) throw new Error(`Schema API: ${res.status}`);
    return (await res.json()) as EntitySchema[];
  }

  async loadEntity(key: string): Promise<EntitySchema | undefined> {
    const res = await fetch(`${this.baseUrl}/entities/${encodeURIComponent(key)}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`Schema API: ${res.status}`);
    return (await res.json()) as EntitySchema;
  }
}

export class CachedSchemaProvider implements SchemaProvider {
  private cache: EntitySchema[] | null = null;
  private cacheAt = 0;

  constructor(
    private readonly inner: SchemaProvider,
    private readonly ttlMs = 60_000,
  ) {}

  async loadEntities(): Promise<EntitySchema[]> {
    if (this.cache && Date.now() - this.cacheAt < this.ttlMs) {
      return this.cache;
    }
    this.cache = await this.inner.loadEntities();
    this.cacheAt = Date.now();
    return this.cache;
  }

  async loadEntity(key: string): Promise<EntitySchema | undefined> {
    const list = await this.loadEntities();
    return list.find((e) => e.key === key);
  }
}

export class CompositeSchemaProvider implements SchemaProvider {
  constructor(private readonly providers: SchemaProvider[]) {}

  async loadEntities(): Promise<EntitySchema[]> {
    const lists = await Promise.all(this.providers.map((p) => p.loadEntities()));
    const map = new Map<string, EntitySchema>();
    for (const list of lists) {
      for (const e of list) {
        map.set(e.key, e);
      }
    }
    return [...map.values()];
  }

  async loadEntity(key: string): Promise<EntitySchema | undefined> {
    const list = await this.loadEntities();
    return list.find((e) => e.key === key);
  }
}
