import { describe, expect, it, vi } from 'vitest';
import { CrudStore } from '../crud-page-kit/src/core/crud-store';
import type { CrudStoreApi, PaginatedResponse } from '../crud-page-kit/src/core/crud-api.types';

interface Row {
  _id: string;
  name: string;
}

const rows: Row[] = [
  { _id: '1', name: 'Alpha' },
  { _id: '2', name: 'Beta' },
];

const api: CrudStoreApi<Row> = {
  list: vi.fn(async () =>
    ({
      data: rows,
      total: rows.length,
      page: 1,
      limit: 15,
      totalPages: 1,
    }) satisfies PaginatedResponse<Row>,
  ),
  create: vi.fn(async (_p, body) => ({ _id: '3', name: String(body['name']) })),
  update: vi.fn(async (_p, id, body) => ({ _id: id, name: String(body['name']) })),
  delete: vi.fn(async () => undefined),
};

describe('CrudStore', () => {
  it('loads items from api', async () => {
    const store = new CrudStore(api, { basePath: '/demo', searchDebounceMs: 0 });
    await store.load();
    expect(store.items().length).toBe(2);
    expect(store.total()).toBe(2);
  });
});
