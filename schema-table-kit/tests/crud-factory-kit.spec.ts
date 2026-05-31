import http from 'node:http';
import express from 'express';
import { describe, expect, it, vi } from 'vitest';

import { paginated, success, error } from '@crud-factory-kit/core';
import { createCrudRouter } from '@crud-factory-kit/express';

// ── Existing api-response tests ────────────────────────────────────────────

describe('crud-factory-kit api-response', () => {
  it('builds paginated payload', () => {
    const res = paginated([{ id: 1 }], 1, 1, 50);
    expect(res.success).toBe(true);
    expect(res.totalPages).toBe(1);
    expect(res.data).toHaveLength(1);
  });

  it('builds success payload', () => {
    expect(success({ ok: true }).data).toEqual({ ok: true });
  });

  it('builds error payload', () => {
    expect(error('fail').success).toBe(false);
  });
});

// ── Helpers ────────────────────────────────────────────────────────────────

interface Item {
  _id: string;
  name: string;
  isActive?: boolean;
  createdAt: string;
  extraField?: string;
}

const items: Item[] = [
  { _id: '1', name: 'Alpha', isActive: true, createdAt: '2024-01-01' },
  { _id: '2', name: 'Beta', isActive: true, createdAt: '2024-02-01' },
  { _id: '3', name: 'Gamma', isActive: false, createdAt: '2024-03-01' },
  { _id: '4', name: 'Delta', isActive: true, createdAt: '2024-04-01', extraField: 'custom' },
];

/** Creates a mock Mongoose model backed by the `items` array. */
function createMockModel(overrides?: Partial<{
  findImpl: typeof findItems;
  findByIdImpl: (id: string) => Promise<Item | null>;
  createImpl: (body: Record<string, unknown>) => Promise<Item>;
  findByIdAndUpdateImpl: (id: string, body: Record<string, unknown>) => Promise<Item | null>;
  findByIdAndDeleteImpl: (id: string) => Promise<Item | null>;
}>) {
  const findItemsFn = overrides?.findImpl ?? findItems;
  const findByIdFn = overrides?.findByIdImpl ?? defaultFindById;
  const createFn = overrides?.createImpl ?? defaultCreate;
  const findByIdAndUpdateFn = overrides?.findByIdAndUpdateImpl ?? defaultFindByIdAndUpdate;
  const findByIdAndDeleteFn = overrides?.findByIdAndDeleteImpl ?? defaultFindByIdAndDelete;

  return {
    find(filter: Record<string, unknown>) {
      const result = findItemsFn(filter);
      return {
        sort(sort: Record<string, 1 | -1>) {
          const sorted = sortItems(result, sort);
          return {
            skip(n: number) {
              return {
                limit(n2: number) {
                  return Promise.resolve(sorted.slice(n, n + n2));
                },
              };
            },
          };
        },
      };
    },
    countDocuments(filter: Record<string, unknown>) {
      const result = findItemsFn(filter);
      return Promise.resolve(result.length);
    },
    findById: vi.fn((id: string) => findByIdFn(id)),
    create: vi.fn((body: Record<string, unknown>) => createFn(body)),
    findByIdAndUpdate: vi.fn((id: string, body: Record<string, unknown>) => findByIdAndUpdateFn(id, body)),
    findByIdAndDelete: vi.fn((id: string) => findByIdAndDeleteFn(id)),
  };
}

function findItems(filter: Record<string, unknown>): Item[] {
  let result = [...items];      // Filter by isActive (default true)
  if (filter['isActive'] !== undefined) {
    result = result.filter((i) => i.isActive === filter['isActive']);
  }

  // Search via $or with $regex
  const orFilter = filter['$or'] as Array<Record<string, { $regex: string; $options: string }>> | undefined;
  if (orFilter) {
    const firstKey = Object.keys(orFilter[0] ?? {})[0];
    const searchStr = orFilter[0]?.[firstKey]?.$regex?.toLowerCase();
    if (searchStr) {
      result = result.filter((i) =>
        Object.values(i).some((v) => String(v).toLowerCase().includes(searchStr)),
      );
    }
  }

  // Arbitrary filters (extraField, etc.)
  for (const [key, value] of Object.entries(filter)) {
    if (key !== 'isActive' && key !== '$or') {
      result = result.filter((i) => (i as unknown as Record<string, unknown>)[key] === value);
    }
  }

  return result;
}

function sortItems(result: Item[], sort: Record<string, 1 | -1>): Item[] {
  const [field, order] = Object.entries(sort)[0] ?? ['createdAt', -1];
  return [...result].sort((a, b) => {
    const aVal = (a as unknown as Record<string, unknown>)[field] as string;
    const bVal = (b as unknown as Record<string, unknown>)[field] as string;
    return aVal < bVal ? -order : aVal > bVal ? order : 0;
  });
}

const defaultFindById = vi.fn(async (id: string) => {
  const item = items.find((i) => i._id === id) ?? null;
  return item;
});

const defaultCreate = vi.fn(async (body: Record<string, unknown>) => {
  return {
    _id: String(items.length + 1),
    name: String(body['name'] ?? 'New'),
    isActive: true,
    createdAt: new Date().toISOString(),
  } as Item;
});

const defaultFindByIdAndUpdate = vi.fn(async (id: string, body: Record<string, unknown>) => {
  const idx = items.findIndex((i) => i._id === id);
  if (idx === -1) return null;
  return { ...items[idx], ...body } as Item;
});

const defaultFindByIdAndDelete = vi.fn(async (id: string) => {
  const item = items.find((i) => i._id === id) ?? null;
  return item;
});

async function withCrudServer(
  router: any,
  fn: (baseUrl: string) => Promise<void>,
): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use('/api/crud', router);
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  const baseUrl = `http://127.0.0.1:${port}/api/crud`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

// ── GET / (list) ──────────────────────────────────────────────────────────

describe('createCrudRouter — GET / (list)', () => {
  it('returns paginated active items by default', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(true);
      const data = body['data'] as Item[];
      expect(data).toHaveLength(3); // Alpha, Beta, Delta (Gamma is inactive)
      expect(body['total']).toBe(3);
      expect(body['page']).toBe(1);
      expect(body['limit']).toBe(50);
    });
  });

  it('includes inactive items when all=true', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?all=true`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data).toHaveLength(4); // all items including Gamma
    });
  });

  it('supports pagination with page and limit', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?page=2&limit=2`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data).toHaveLength(1); // only Delta (items 3-4 in 3-item filtered set)
      expect(body['page']).toBe(2);
      expect(body['limit']).toBe(2);
    });
  });

  it('supports search with regex (case-insensitive)', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model, { searchFields: ['name'] });
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?search=alpha`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe('Alpha');
    });
  });

  it('supports empty search results', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model, { searchFields: ['name'] });
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?search=ZZZ`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect((body['data'] as Item[])).toHaveLength(0);
      expect(body['total']).toBe(0);
    });
  });

  it('supports custom sort field and order', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?sort=name&order=asc`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data[0].name).toBe('Alpha');
      expect(data[2].name).toBe('Delta');
    });
  });

  it('passes arbitrary query params as filters', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}?extraField=custom`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe('Delta');
    });
  });

  it('returns 500 on model error', async () => {
    const model = createMockModel({
      findImpl: () => { throw new Error('DB error'); },
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}`);
      expect(res.status).toBe(500);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(false);
      expect(body['error']).toBe('DB error');
    });
  });

  it('uses custom searchFields from options', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model, { searchFields: ['createdAt'] });
    await withCrudServer(router, async (base) => {
      // search by createdAt substring
      const res = await fetch(`${base}?search=2024-01`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      const data = body['data'] as Item[];
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe('Alpha');
    });
  });
});

// ── GET /:id ───────────────────────────────────────────────────────────────

describe('createCrudRouter — GET /:id', () => {
  it('returns item by id', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`);
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(true);
      expect((body['data'] as Item).name).toBe('Alpha');
    });
  });

  it('returns 404 for non-existent id', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/999`);
      expect(res.status).toBe(404);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(false);
      expect(body['error']).toBe('Not found');
    });
  });

  it('returns 500 on model error', async () => {
    const model = createMockModel({
      findByIdImpl: async () => { throw new Error('Find error'); },
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`);
      expect(res.status).toBe(500);
      const body = await res.json() as Record<string, unknown>;
      expect(body['error']).toBe('Find error');
    });
  });
});

// ── POST / ─────────────────────────────────────────────────────────────────

describe('createCrudRouter — POST /', () => {
  it('creates a new item', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'NewItem' }),
      });
      expect(res.status).toBe(201);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(true);
      expect(body['message']).toBe('Created');
      expect((body['data'] as Item).name).toBe('NewItem');
      expect(model.create).toHaveBeenCalledWith({ name: 'NewItem' });
    });
  });

  it('calls hooks.beforeCreate before creating', async () => {
    const beforeCreate = vi.fn(async () => undefined);
    const model = createMockModel();
    const router = createCrudRouter(model, {
      hooks: { beforeCreate },
    });
    await withCrudServer(router, async (base) => {
      await fetch(`${base}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'X' }),
      });
      expect(beforeCreate).toHaveBeenCalledWith({ name: 'X' });
    });
  });

  it('returns 400 on validation/creation error', async () => {
    const model = createMockModel({
      createImpl: async () => { throw new Error('Validation failed'); },
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '' }),
      });
      expect(res.status).toBe(400);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(false);
      expect(body['error']).toBe('Validation failed');
    });
  });
});

// ── PUT /:id ───────────────────────────────────────────────────────────────

describe('createCrudRouter — PUT /:id', () => {
  it('updates an existing item', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated Alpha' }),
      });
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(true);
      expect(body['message']).toBe('Updated');
      expect((body['data'] as Item).name).toBe('Updated Alpha');
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { name: 'Updated Alpha' },
        { new: true, runValidators: true },
      );
    });
  });

  it('returns 404 for non-existent id', async () => {
    const model = createMockModel({
      findByIdAndUpdateImpl: async () => null,
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/999`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'X' }),
      });
      expect(res.status).toBe(404);
      const body = await res.json() as Record<string, unknown>;
      expect(body['error']).toBe('Not found');
    });
  });

  it('calls hooks.beforeUpdate before updating', async () => {
    const beforeUpdate = vi.fn(async () => undefined);
    const model = createMockModel();
    const router = createCrudRouter(model, {
      hooks: { beforeUpdate },
    });
    await withCrudServer(router, async (base) => {
      await fetch(`${base}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'X' }),
      });
      expect(beforeUpdate).toHaveBeenCalledWith({ name: 'X' });
    });
  });

  it('returns 400 on update error', async () => {
    const model = createMockModel({
      findByIdAndUpdateImpl: async () => { throw new Error('Update failed'); },
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '' }),
      });
      expect(res.status).toBe(400);
      const body = await res.json() as Record<string, unknown>;
      expect(body['error']).toBe('Update failed');
    });
  });
});

// ── DELETE /:id ────────────────────────────────────────────────────────────

describe('createCrudRouter — DELETE /:id', () => {
  it('deletes an existing item', async () => {
    const model = createMockModel();
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`, { method: 'DELETE' });
      expect(res.status).toBe(200);
      const body = await res.json() as Record<string, unknown>;
      expect(body['success']).toBe(true);
      expect(body['message']).toBe('Deleted');
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });

  it('returns 404 for non-existent id', async () => {
    const model = createMockModel({
      findByIdAndDeleteImpl: async () => null,
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/999`, { method: 'DELETE' });
      expect(res.status).toBe(404);
      const body = await res.json() as Record<string, unknown>;
      expect(body['error']).toBe('Not found');
    });
  });

  it('returns 500 on delete error', async () => {
    const model = createMockModel({
      findByIdAndDeleteImpl: async () => { throw new Error('Delete failed'); },
    });
    const router = createCrudRouter(model);
    await withCrudServer(router, async (base) => {
      const res = await fetch(`${base}/1`, { method: 'DELETE' });
      expect(res.status).toBe(500);
      const body = await res.json() as Record<string, unknown>;
      expect(body['error']).toBe('Delete failed');
    });
  });
});

// ── Auth / Permissions ────────────────────────────────────────────────────

describe('createCrudRouter — auth & permissions', () => {
  it('calls authenticate middleware when permPrefix is set', async () => {
    const authenticate = vi.fn((_req: unknown, _res: unknown, next: () => void) => next());
    const model = createMockModel();
    const router = createCrudRouter(model, {
      permPrefix: 'products',
      authenticate,
    });
    await withCrudServer(router, async (base) => {
      await fetch(`${base}`);
      expect(authenticate).toHaveBeenCalled();
    });
  });

  it('does not call authenticate when permPrefix is not set', async () => {
    const authenticate = vi.fn((_req: unknown, _res: unknown, next: () => void) => next());
    const model = createMockModel();
    const router = createCrudRouter(model, {
      authenticate, // permPrefix not set → authenticate is ignored
    });
    await withCrudServer(router, async (base) => {
      await fetch(`${base}`);
      expect(authenticate).not.toHaveBeenCalled();
    });
  });

  it('calls requirePermission for each action when permPrefix is set', async () => {
    const requirePermission = vi.fn((_action: string) => {
      return (_req: unknown, _res: unknown, next: () => void) => next();
    });
    const model = createMockModel();
    const router = createCrudRouter(model, {
      permPrefix: 'products',
      authenticate: (_req: unknown, _res: unknown, next: () => void) => next(),
      requirePermission,
    });
    await withCrudServer(router, async (base) => {
      // GET / (view)
      await fetch(`${base}`);
      expect(requirePermission).toHaveBeenCalledWith('view');

      // GET /:id (view)
      await fetch(`${base}/1`);
      expect(requirePermission).toHaveBeenCalledWith('view');

      // POST / (create)
      await fetch(`${base}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'X' }),
      });
      expect(requirePermission).toHaveBeenCalledWith('create');

      // PUT /:id (edit)
      await fetch(`${base}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'X' }),
      });
      expect(requirePermission).toHaveBeenCalledWith('edit');

      // DELETE /:id (delete)
      await fetch(`${base}/1`, { method: 'DELETE' });
      expect(requirePermission).toHaveBeenCalledWith('delete');
    });
  });
});
