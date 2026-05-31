import { computed, signal } from '@angular/core';

import type { CrudQuery, CrudStoreApi, CrudStoreOptions, PaginatedResponse } from './crud-api.types';

/** Generic list/store for CRUD pages — instantiate manually, pass to `<cp-crud-page>`. */
export class CrudStore<T extends object> {
  readonly #api: CrudStoreApi<T>;
  readonly #options: Required<Pick<CrudStoreOptions, 'basePath' | 'defaultLimit' | 'defaultSortField' | 'defaultSortOrder' | 'searchDebounceMs'>> & {
    onError: (message: string) => void;
    onSuccess: (message: string) => void;
  };

  readonly #items = signal<T[]>([]);
  readonly #total = signal(0);
  readonly #loading = signal(false);
  readonly #saving = signal(false);
  readonly #page = signal(1);
  readonly #limit = signal(15);
  readonly #search = signal('');
  readonly #sortField = signal('createdAt');
  readonly #sortOrder = signal<-1 | 1>(-1);
  readonly #error = signal<string | null>(null);
  readonly #parentFilter = signal<Record<string, string>>({});

  readonly items = this.#items.asReadonly();
  readonly total = this.#total.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly saving = this.#saving.asReadonly();
  readonly page = this.#page.asReadonly();
  readonly limit = this.#limit.asReadonly();
  readonly search = this.#search.asReadonly();
  readonly sortField = this.#sortField.asReadonly();
  readonly sortOrder = this.#sortOrder.asReadonly();
  readonly error = this.#error.asReadonly();

  readonly hasData = computed(() => this.#items().length > 0);

  #searchTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(api: CrudStoreApi<T>, options: CrudStoreOptions) {
    this.#api = api;
    this.#options = {
      basePath: options.basePath,
      defaultLimit: options.defaultLimit ?? 15,
      defaultSortField: options.defaultSortField ?? 'createdAt',
      defaultSortOrder: options.defaultSortOrder ?? -1,
      searchDebounceMs: options.searchDebounceMs ?? 300,
      onError: options.onError ?? (() => undefined),
      onSuccess: options.onSuccess ?? (() => undefined),
    };
    this.#limit.set(this.#options.defaultLimit);
    this.#sortField.set(this.#options.defaultSortField);
    this.#sortOrder.set(this.#options.defaultSortOrder);
  }

  setParentFilter(key: string, value: string): void {
    this.#parentFilter.set({ [key]: value });
    this.#page.set(1);
    void this.load();
  }

  setParentFilterSilent(key: string, value: string): void {
    this.#parentFilter.set({ [key]: value });
    this.#page.set(1);
  }

  clearParentFilter(): void {
    this.#parentFilter.set({});
    this.#page.set(1);
    void this.load();
  }

  async load(): Promise<void> {
    this.#loading.set(true);
    this.#error.set(null);

    const parent = this.#parentFilter();
    const filters: Record<string, string> = { ...parent };
    if (this.#search()) filters['search'] = this.#search();

    try {
      const res = await this.#api.list(this.#options.basePath, {
        page: this.#page(),
        limit: this.#limit(),
        search: this.#search() || undefined,
        sort: this.#sortField(),
        order: this.#sortOrder() === 1 ? 'asc' : 'desc',
        filters,
      });
      this.#applyListResponse(res);
    } catch (err: unknown) {
      this.#items.set([]);
      this.#total.set(0);
      const msg = err instanceof Error ? err.message : 'Failed to load data';
      this.#error.set(msg);
      this.#options.onError(msg);
    } finally {
      this.#loading.set(false);
    }
  }

  goToPage(page: number): void {
    this.#page.set(Math.max(1, page));
    void this.load();
  }

  setLimit(limit: number): void {
    this.#limit.set(limit);
    this.#page.set(1);
    void this.load();
  }

  setSearch(query: string): void {
    this.#search.set(query);
    this.#page.set(1);
    if (this.#searchTimer) clearTimeout(this.#searchTimer);
    this.#searchTimer = setTimeout(() => void this.load(), this.#options.searchDebounceMs);
  }

  setSort(field: string, order: -1 | 1): void {
    this.#sortField.set(field);
    this.#sortOrder.set(order);
    void this.load();
  }

  async create(body: Record<string, unknown>): Promise<T | null> {
    this.#saving.set(true);
    this.#error.set(null);
    try {
      const result = await this.#api.create(this.#options.basePath, body);
      this.#options.onSuccess('Record created successfully');
      this.goToPage(1);
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create record';
      this.#error.set(msg);
      this.#options.onError(msg);
      return null;
    } finally {
      this.#saving.set(false);
    }
  }

  async update(id: string, body: Record<string, unknown>): Promise<T | null> {
    this.#saving.set(true);
    this.#error.set(null);
    try {
      const result = await this.#api.update(this.#options.basePath, id, body);
      this.#options.onSuccess('Record updated successfully');
      await this.load();
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update record';
      this.#error.set(msg);
      this.#options.onError(msg);
      return null;
    } finally {
      this.#saving.set(false);
    }
  }

  async delete(id: string): Promise<boolean> {
    this.#saving.set(true);
    this.#error.set(null);
    try {
      await this.#api.delete(this.#options.basePath, id);
      this.#options.onSuccess('Record deleted successfully');
      await this.load();
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete record';
      this.#error.set(msg);
      this.#options.onError(msg);
      return false;
    } finally {
      this.#saving.set(false);
    }
  }

  reset(): void {
    this.#page.set(1);
    this.#limit.set(this.#options.defaultLimit);
    this.#search.set('');
    this.#sortField.set(this.#options.defaultSortField);
    this.#sortOrder.set(this.#options.defaultSortOrder);
    this.#items.set([]);
    this.#total.set(0);
    this.#loading.set(false);
    this.#saving.set(false);
    this.#error.set(null);
  }

  #applyListResponse(res: PaginatedResponse<T>): void {
    this.#items.set(res.data ?? []);
    this.#total.set(res.total ?? 0);
  }
}
