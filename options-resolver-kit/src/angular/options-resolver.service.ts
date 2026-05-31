import { Injectable, Inject } from '@angular/core';

import type { EntityOptionsDefinition, OptionsResolverConfig, SelectOption } from '../core';
import { OPTIONS_RESOLVER_CONFIG } from './tokens';

@Injectable({ providedIn: 'root' })
export class OptionsResolver {
  readonly cache = new Map<string, Promise<SelectOption[]>>();

  constructor(@Inject(OPTIONS_RESOLVER_CONFIG) readonly config: OptionsResolverConfig) {}

  getOptions(entityKey: string): Promise<SelectOption[]> {
    const cached = this.cache.get(entityKey);
    if (cached) return cached;

    const definition = this.config.entities.find(
      (e: EntityOptionsDefinition) => e.entityKey === entityKey,
    );
    if (!definition) {
      // Не кешируем reject — следующий вызов сможет повторить попытку
      return Promise.reject(new Error(`options-resolver-kit: unknown entityKey "${entityKey}"`));
    }

    // Кешируем pending promise сразу — дедупликация конкурентных вызовов
    const promise = this.#loadWithCache(entityKey, definition);
    this.cache.set(entityKey, promise);
    return promise;
  }

  clearCache(entityKey?: string): void {
    if (entityKey) {
      this.cache.delete(entityKey);
      return;
    }
    this.cache.clear();
  }

  async #loadWithCache(
    entityKey: string,
    definition: EntityOptionsDefinition,
  ): Promise<SelectOption[]> {
    try {
      return await definition.load();
    } catch (err: unknown) {
      // Error → remove from cache so next call can retry
      this.cache.delete(entityKey);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`options-resolver-kit: failed to load "${entityKey}": ${message}`);
    }
  }
}
