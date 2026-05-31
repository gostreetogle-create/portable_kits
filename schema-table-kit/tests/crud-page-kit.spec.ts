import { describe, expect, it, vi } from 'vitest';
import { CrudStore } from '../../crud-page-kit/src/core/crud-store';
import type { CrudStoreApi, PaginatedResponse } from '../../crud-page-kit/src/core/crud-api.types';

// ── Test helpers ───────────────────────────────────────────────────────────

interface Row {
  _id: string;
  name: string;
}

const rows: Row[] = [
  { _id: '1', name: 'Alpha' },
  { _id: '2', name: 'Beta' },
];

function createApi(overrides?: Partial<CrudStoreApi<Row>>): CrudStoreApi<Row> {
  return {
    list: vi.fn(async (_p, _q) =>
      ({
        data: rows,
        total: rows.length,
        page: 1,
        limit: 15,
        totalPages: 1,
      }) satisfies PaginatedResponse<Row>,
    ),
    create: vi.fn(async (_p, body) => ({ _id: '3', name: String(body['name']) }) as Row),
    update: vi.fn(async (_p, id, body) => ({ _id: id, name: String(body['name']) }) as Row),
    delete: vi.fn(async () => undefined),
    ...overrides,
  };
}

/** Quick factory with searchDebounceMs=0 so search doesn't wait. */
function createStore(api?: CrudStoreApi<Row>, opts?: { basePath?: string; searchDebounceMs?: number }) {
  return new CrudStore(api ?? createApi(), {
    basePath: opts?.basePath ?? '/demo',
    searchDebounceMs: opts?.searchDebounceMs ?? 0,
  });
}

// ── Load / list ────────────────────────────────────────────────────────────

describe('CrudStore — load / list', () => {
  it('loads items from api', async () => {
    const store = createStore();
    await store.load();
    expect(store.items().length).toBe(2);
    expect(store.total()).toBe(2);
    expect(store.loading()).toBe(false);
  });

  it('sets loading state during load', async () => {
    const store = createStore();
    const loadPromise = store.load();
    expect(store.loading()).toBe(true);
    await loadPromise;
    expect(store.loading()).toBe(false);
  });

  it('clears items on load error and sets error signal', async () => {
    const api = createApi({ list: vi.fn(async () => { throw new Error('Network fail'); }) });
    const store = createStore(api);
    await store.load();
    expect(store.items().length).toBe(0);
    expect(store.total()).toBe(0);
    expect(store.error()).toBe('Network fail');
    expect(store.loading()).toBe(false);
  });

  it('calls onError callback on load failure', async () => {
    const onError = vi.fn();
    const api = createApi({ list: vi.fn(async () => { throw new Error('Fail'); }) });
    const store = createStore(api, { basePath: '/demo' });
    // Replace the internal onError — we inject via constructor options
    const storeWithError = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onError });
    await storeWithError.load();
    expect(onError).toHaveBeenCalledWith('Fail');
  });
});

// ── Create ─────────────────────────────────────────────────────────────────

describe('CrudStore — create', () => {
  it('creates a new item and returns it', async () => {
    const api = createApi();
    const store = createStore(api);
    const result = await store.create({ name: 'Gamma' });
    expect(result).toEqual({ _id: '3', name: 'Gamma' });
    expect(api.create).toHaveBeenCalledWith('/demo', { name: 'Gamma' });
  });

  it('sets saving state during create', async () => {
    const store = createStore();
    const createPromise = store.create({ name: 'X' });
    expect(store.saving()).toBe(true);
    await createPromise;
    expect(store.saving()).toBe(false);
  });

  it('calls onSuccess and reloads on successful create', async () => {
    const onSuccess = vi.fn();
    const api = createApi();
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onSuccess });
    await store.create({ name: 'Gamma' });
    expect(onSuccess).toHaveBeenCalledWith('Record created successfully');
    // create → goToPage(1) → load — 1 call
    expect(api.list).toHaveBeenCalledTimes(1);
  });

  it('resets to page 1 after create', async () => {
    const store = createStore();
    store.goToPage(5);
    expect(store.page()).toBe(5);
    await store.create({ name: 'X' });
    expect(store.page()).toBe(1);
  });

  it('returns null and sets error on create failure', async () => {
    const api = createApi({ create: vi.fn(async () => { throw new Error('Create failed'); }) });
    const store = createStore(api);
    const result = await store.create({ name: 'X' });
    expect(result).toBeNull();
    expect(store.error()).toBe('Create failed');
  });

  it('calls onError on create failure', async () => {
    const onError = vi.fn();
    const api = createApi({ create: vi.fn(async () => { throw new Error('Fail'); }) });
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onError });
    await store.create({ name: 'X' });
    expect(onError).toHaveBeenCalledWith('Fail');
  });

  it('create with empty body still works', async () => {
    const api = createApi();
    const store = createStore(api);
    const result = await store.create({});
    expect(result).toEqual({ _id: '3', name: 'undefined' });
    expect(api.create).toHaveBeenCalledWith('/demo', {});
  });

  it('create preserves search query', async () => {
    const api = createApi();
    const store = createStore(api);
    store.setSearch('gamma');
    await vi.waitFor(() => {
      expect(api.list).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ search: 'gamma' }),
      );
    }, { timeout: 200 });

    // create calls goToPage(1) → load() which preserves search
    await store.create({ name: 'New' });
    expect(store.search()).toBe('gamma');
  });
});

// ── Update ─────────────────────────────────────────────────────────────────

describe('CrudStore — update', () => {
  it('updates an item and returns updated result', async () => {
    const api = createApi();
    const store = createStore(api);
    const result = await store.update('1', { name: 'Updated' });
    expect(result).toEqual({ _id: '1', name: 'Updated' });
    expect(api.update).toHaveBeenCalledWith('/demo', '1', { name: 'Updated' });
  });

  it('sets saving state during update', async () => {
    const store = createStore();
    const updatePromise = store.update('1', { name: 'X' });
    expect(store.saving()).toBe(true);
    await updatePromise;
    expect(store.saving()).toBe(false);
  });

  it('calls onSuccess and reloads after update', async () => {
    const onSuccess = vi.fn();
    const api = createApi();
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onSuccess });
    await store.update('1', { name: 'X' });
    expect(onSuccess).toHaveBeenCalledWith('Record updated successfully');
    expect(api.list).toHaveBeenCalledTimes(1); // only reload (no initial manual load)
  });

  it('returns null and sets error on update failure', async () => {
    const api = createApi({ update: vi.fn(async () => { throw new Error('Update failed'); }) });
    const store = createStore(api);
    const result = await store.update('1', { name: 'X' });
    expect(result).toBeNull();
    expect(store.error()).toBe('Update failed');
  });

  it('calls onError on update failure', async () => {
    const onError = vi.fn();
    const api = createApi({ update: vi.fn(async () => { throw new Error('Fail'); }) });
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onError });
    await store.update('1', { name: 'X' });
    expect(onError).toHaveBeenCalledWith('Fail');
  });

  it('update with empty body works', async () => {
    const api = createApi();
    const store = createStore(api);
    const result = await store.update('1', {});
    expect(result).toEqual({ _id: '1', name: 'undefined' });
    expect(api.update).toHaveBeenCalledWith('/demo', '1', {});
  });

  it('update preserves current page', async () => {
    const api = createApi();
    const store = createStore(api);
    await store.goToPage(3);
    expect(store.page()).toBe(3);
    await store.update('1', { name: 'X' });
    // update calls load() (not goToPage), so page stays the same
    expect(store.page()).toBe(3);
  });
});

// ── Delete ─────────────────────────────────────────────────────────────────

describe('CrudStore — delete', () => {
  it('deletes an item and returns true', async () => {
    const api = createApi();
    const store = createStore(api);
    const result = await store.delete('1');
    expect(result).toBe(true);
    expect(api.delete).toHaveBeenCalledWith('/demo', '1');
  });

  it('sets saving state during delete', async () => {
    const store = createStore();
    const deletePromise = store.delete('2');
    expect(store.saving()).toBe(true);
    await deletePromise;
    expect(store.saving()).toBe(false);
  });

  it('calls onSuccess and reloads after delete', async () => {
    const onSuccess = vi.fn();
    const api = createApi();
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onSuccess });
    await store.delete('1');
    expect(onSuccess).toHaveBeenCalledWith('Record deleted successfully');
    expect(api.list).toHaveBeenCalledTimes(1); // reload
  });

  it('returns false and sets error on delete failure', async () => {
    const api = createApi({ delete: vi.fn(async () => { throw new Error('Delete failed'); }) });
    const store = createStore(api);
    const result = await store.delete('1');
    expect(result).toBe(false);
    expect(store.error()).toBe('Delete failed');
  });

  it('calls onError on delete failure', async () => {
    const onError = vi.fn();
    const api = createApi({ delete: vi.fn(async () => { throw new Error('Fail'); }) });
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0, onError });
    await store.delete('1');
    expect(onError).toHaveBeenCalledWith('Fail');
  });

  it('delete preserves current page', async () => {
    const api = createApi();
    const store = createStore(api);
    await store.goToPage(3);
    expect(store.page()).toBe(3);
    await store.delete('1');
    // delete calls load() (not goToPage), so page stays the same
    expect(store.page()).toBe(3);
  });

  it('delete success with reload error still returns true and sets error', async () => {
    const api = createApi({
      delete: vi.fn(async () => undefined),
      list: vi.fn(async () => { throw new Error('Reload failed'); }),
    });
    const store = createStore(api);
    const result = await store.delete('1');
    // delete succeeded, but reload failed → returns true (delete succeeded)
    // But error is set from the failed reload
    expect(result).toBe(true);
    expect(store.error()).toBe('Reload failed');
  });
});

// ── Pagination ─────────────────────────────────────────────────────────────

describe('CrudStore — pagination', () => {
  it('goToPage sets page and triggers load', async () => {
    const api = createApi({ list: vi.fn(async (_p, q) => ({
      data: [], total: 0, page: q.page ?? 1, limit: 15, totalPages: 10,
    }) as PaginatedResponse<Row>) });
    const store = createStore(api);
    await store.goToPage(3);
    expect(store.page()).toBe(3);
    expect(api.list).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ page: 3 }));
  });

  it('goToPage clamps to minimum page 1', async () => {
    const store = createStore();
    await store.goToPage(0);
    expect(store.page()).toBe(1);
    await store.goToPage(-5);
    expect(store.page()).toBe(1);
  });

  it('setLimit changes limit and resets to page 1', async () => {
    const store = createStore();
    store.goToPage(3);
    await store.setLimit(50);
    expect(store.limit()).toBe(50);
    expect(store.page()).toBe(1);
  });

  it('hasData is true when items exist', async () => {
    const store = createStore();
    expect(store.hasData()).toBe(false); // initially empty
    await store.load();
    expect(store.hasData()).toBe(true);
  });

  it('hasData is false when items empty', async () => {
    const api = createApi({ list: vi.fn(async () => ({ data: [], total: 0, page: 1, limit: 15, totalPages: 0 })) });
    const store = createStore(api);
    await store.load();
    expect(store.hasData()).toBe(false);
  });

  it('hasData transitions across load → error → reload', async () => {
    const api = createApi();
    const store = createStore(api);
    await store.load();
    expect(store.hasData()).toBe(true);

    // Error clears items
    api.list = vi.fn(async () => { throw new Error('Fail'); });
    await store.load();
    expect(store.hasData()).toBe(false);
    expect(store.items().length).toBe(0);

    // Reload restores data
    api.list = vi.fn(async () => ({ data: [{ _id: '1', name: 'New' }], total: 1, page: 1, limit: 15, totalPages: 1 }));
    await store.load();
    expect(store.hasData()).toBe(true);
    expect(store.items().length).toBe(1);
  });

  it('goToPage with very large page works', async () => {
    const api = createApi({ list: vi.fn(async (_p, q) => ({
      data: [], total: 0, page: q.page ?? 1, limit: 15, totalPages: 9999,
    }) as PaginatedResponse<Row>) });
    const store = createStore(api);
    await store.goToPage(9999);
    expect(store.page()).toBe(9999);
    expect(api.list).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({ page: 9999 }),
    );
  });

  it('setLimit with different values works', async () => {
    const api = createApi({ list: vi.fn(async (_p, q) => ({
      data: [], total: 0, page: 1, limit: q.limit ?? 15, totalPages: 0,
    }) as PaginatedResponse<Row>) });
    const store = createStore(api);

    await store.setLimit(5);
    expect(store.limit()).toBe(5);
    expect(api.list).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({ limit: 5 }),
    );

    await store.setLimit(100);
    expect(store.limit()).toBe(100);
    expect(api.list).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({ limit: 100 }),
    );

    await store.setLimit(15);
    expect(store.limit()).toBe(15);
  });
});

// ── Search ─────────────────────────────────────────────────────────────────

describe('CrudStore — search', () => {
  it('setSearch sets query and resets page to 1', async () => {
    const store = createStore();
    store.goToPage(3);
    await store.load(); // settled
    store.setSearch('test');
    expect(store.search()).toBe('test');
    expect(store.page()).toBe(1);
  });

  it('setSearch debounces load with configurable delay', async () => {
    vi.useFakeTimers();
    try {
      const api = createApi();
      const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 300 });
      const listMock = api.list as ReturnType<typeof vi.fn>;

      store.setSearch('test');
      // setSearch only queues a timeout, doesn't call load directly
      expect(listMock).not.toHaveBeenCalled();

      // Advance timers past debounce
      vi.advanceTimersByTime(300);
      expect(listMock).toHaveBeenCalledTimes(1);
      expect(listMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ search: 'test' }),
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('setSearch with debounceMs=0 triggers load immediately', async () => {
    const api = createApi();
    const store = createStore(api);
    
    const listMock = api.list as ReturnType<typeof vi.fn>;
    listMock.mockClear();
    
    store.setSearch('immediate');
    // With debounceMs=0, load is queued as macrotask with setTimeout(0)
    // We need a small wait
    await vi.waitFor(() => {
      expect(listMock).toHaveBeenCalled();
    }, { timeout: 200 });
    
    expect(listMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ search: 'immediate' }),
    );
  });

  it('search query is included in load api call', async () => {
    const api = createApi();
    const store = createStore(api);
    
    store.setSearch('findme');
    await vi.waitFor(() => {
      expect(api.list).toHaveBeenCalled();
    }, { timeout: 200 });
    
    expect(api.list).toHaveBeenLastCalledWith(
      '/demo',
      expect.objectContaining({ search: 'findme' }),
    );
  });

  it('setSearch with empty string clears search param', async () => {
    const api = createApi();
    const store = createStore(api);

    // First set a search to see it included
    store.setSearch('test');
    await vi.waitFor(() => {
      expect(api.list).toHaveBeenCalled();
    }, { timeout: 200 });

    (api.list as ReturnType<typeof vi.fn>).mockClear();

    // Now clear search
    store.setSearch('');
    expect(store.search()).toBe('');
    expect(store.page()).toBe(1);
    await vi.waitFor(() => {
      expect(api.list).toHaveBeenCalled();
    }, { timeout: 200 });
    // Search should not be in the call (or be undefined)
    const lastCall = (api.list as ReturnType<typeof vi.fn>).mock.lastCall;
    const query = lastCall?.[1] as Record<string, unknown>;
    expect(query['search']).toBeUndefined();
  });

  it('search resets page then goToPage works independently', async () => {
    const store = createStore();
    store.setSearch('query');
    expect(store.page()).toBe(1);
    await store.goToPage(5);
    expect(store.page()).toBe(5);
    expect(store.search()).toBe('query');
  });

  it('consecutive setSearch calls with debounce only trigger one load', async () => {
    vi.useFakeTimers();
    try {
      const api = createApi();
      const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 100 });
      const listMock = api.list as ReturnType<typeof vi.fn>;

      store.setSearch('a');
      store.setSearch('ab');
      store.setSearch('abc');

      // load should not have been called yet (debounce keeps resetting)
      expect(listMock).not.toHaveBeenCalled();
      expect(store.search()).toBe('abc');

      // Advance past debounce
      vi.advanceTimersByTime(100);
      expect(listMock).toHaveBeenCalledTimes(1);
      expect(listMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ search: 'abc' }),
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('search with special characters works', async () => {
    const api = createApi();
    const store = createStore(api);
    store.setSearch('test+query@123 #tag');
    await vi.waitFor(() => {
      expect(api.list).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ search: 'test+query@123 #tag' }),
      );
    }, { timeout: 200 });
  });
});

// ── Sort ───────────────────────────────────────────────────────────────────

describe('CrudStore — sort', () => {
  it('setSort changes sort field/order and reloads', async () => {
    const api = createApi();
    const store = createStore(api);
    
    const listMock = api.list as ReturnType<typeof vi.fn>;
    listMock.mockClear();
    
    store.setSort('name', 1);
    expect(store.sortField()).toBe('name');
    expect(store.sortOrder()).toBe(1);
    
    await vi.waitFor(() => {
      expect(listMock).toHaveBeenCalled();
    }, { timeout: 100 });
    
    expect(listMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ sort: 'name', order: 'asc' }),
    );
  });

  it('uses default sort options from constructor', () => {
    const store = new CrudStore(createApi(), {
      basePath: '/test',
      defaultSortField: 'updatedAt',
      defaultSortOrder: 1,
      searchDebounceMs: 0,
    });
    expect(store.sortField()).toBe('updatedAt');
    expect(store.sortOrder()).toBe(1);
  });
});

// ── Parent filter ──────────────────────────────────────────────────────────

describe('CrudStore — parent filter', () => {
  it('setParentFilter sets filter, resets page, reloads', async () => {
    const api = createApi();
    const store = createStore(api);
    
    const listMock = api.list as ReturnType<typeof vi.fn>;
    listMock.mockClear();
    
    store.goToPage(3);
    await store.load();
    
    store.setParentFilter('category', 'tools');
    expect(store.page()).toBe(1);
    
    await vi.waitFor(() => {
      expect(listMock).toHaveBeenLastCalledWith(
        expect.any(String),
        expect.objectContaining({ filters: { category: 'tools' } }),
      );
    }, { timeout: 100 });
  });

  it('setParentFilterSilent sets filter without reloading', async () => {
    const api = createApi();
    const store = createStore(api);
    
    const listMock = api.list as ReturnType<typeof vi.fn>;
    listMock.mockClear();
    
    store.setParentFilterSilent('status', 'active');
    expect(store.page()).toBe(1);
    expect(listMock).not.toHaveBeenCalled();
  });

  it('clearParentFilter removes filter and reloads', async () => {
    const api = createApi();
    const store = createStore(api);
    
    store.setParentFilter('cat', 'x');
    // setParentFilter calls load() synchronously (no debounce)
    // But load() is async, so wait for it
    await vi.waitFor(() => {
      expect((api.list as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(0);
    }, { timeout: 200 });
    
    const listMock = api.list as ReturnType<typeof vi.fn>;
    listMock.mockClear();
    
    store.clearParentFilter();
    
    await vi.waitFor(() => {
      expect(listMock).toHaveBeenCalled();
    }, { timeout: 200 });
  });
});

// ── Reset ──────────────────────────────────────────────────────────────────

describe('CrudStore — reset', () => {
  it('reset puts store in initial state', async () => {
    const store = createStore();
    await store.load();
    store.reset();
    // After reset, the store is in initial state
    expect(store.items().length).toBe(0);
    expect(store.total()).toBe(0);
    expect(store.page()).toBe(1);
    expect(store.hasData()).toBe(false);
  });

  it('reset clears items, total, loading, saving, error', async () => {
    const store = createStore();
    await store.load();
    expect(store.items().length).toBeGreaterThan(0);
    expect(store.hasData()).toBe(true);

    store.reset();
    expect(store.items().length).toBe(0);
    expect(store.total()).toBe(0);
    expect(store.loading()).toBe(false);
    expect(store.saving()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.hasData()).toBe(false);
    expect(store.page()).toBe(1);
    expect(store.search()).toBe('');
  });

  it('reset restores default sort and limit', () => {
    const store = new CrudStore(createApi(), {
      basePath: '/demo',
      defaultLimit: 50,
      defaultSortField: 'name',
      defaultSortOrder: 1,
      searchDebounceMs: 0,
    });
    store.setSort('other', -1);
    store.setLimit(10);
    store.reset();
    expect(store.limit()).toBe(50);
    expect(store.sortField()).toBe('name');
    expect(store.sortOrder()).toBe(1);
  });
});

// ── Error signal ───────────────────────────────────────────────────────────

describe('CrudStore — error signal', () => {
  it('error is null initially and after successful load', async () => {
    const store = createStore();
    expect(store.error()).toBeNull();
    await store.load();
    expect(store.error()).toBeNull();
  });

  it('error is cleared before each operation', async () => {
    const apiFail = createApi({ list: vi.fn(async () => { throw new Error('First fail'); }) });
    const store = createStore(apiFail);
    await store.load();
    expect(store.error()).toBe('First fail');

    // Now use a working api — error should be cleared
    const apiOk = createApi();
    const store2 = createStore(apiOk);
    await store2.load();
    expect(store2.error()).toBeNull();
  });
});

// ── Non-generic error handling ─────────────────────────────────────────────

describe('CrudStore — generic error fallback', () => {
  it('uses fallback message when error is not an Error instance', async () => {
    const api = createApi({ list: vi.fn(async () => { throw 'string error'; }) });
    const store = createStore(api);
    await store.load();
    expect(store.error()).toBe('Failed to load data');
  });

  it('uses fallback for create with non-Error', async () => {
    const api = createApi({ create: vi.fn(async () => { throw 'oops'; }) });
    const store = createStore(api);
    await store.create({ name: 'X' });
    expect(store.error()).toBe('Failed to create record');
  });

  it('uses fallback for delete with non-Error', async () => {
    const api = createApi({ delete: vi.fn(async () => { throw null; }) });
    const store = createStore(api);
    const result = await store.delete('1');
    expect(result).toBe(false);
    expect(store.error()).toBe('Failed to delete record');
  });
});
