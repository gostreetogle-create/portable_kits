import { Injectable, inject } from '@angular/core';

import type { EntityOptionsDefinition, SelectOption } from '../core';
import { OPTIONS_RESOLVER_CONFIG } from './tokens';

@Injectable({ providedIn: 'root' })
export class OptionsResolver {
  private readonly config = inject(OPTIONS_RESOLVER_CONFIG);
  private readonly cache = new Map<string, Promise<SelectOption[]>>();

  getOptions(entityKey: string): Promise<SelectOption[]> {
    const cached = this.cache.get(entityKey);
    if (cached) return cached;

    const definition = this.config.entities.find(
      (e: EntityOptionsDefinition) => e.entityKey === entityKey,
    );
    if (!definition) {
      return Promise.reject(new Error(`options-resolver-kit: unknown entityKey "${entityKey}"`));
    }

    const promise = Promise.resolve(definition.load());
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
}
