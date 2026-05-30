import http from 'node:http';
import express from 'express';
import { describe, expect, it } from 'vitest';
import { createSchemaRouter } from '../src/express/create-schema-router';
import { MOCK_SCHEMA_CONFIG } from '../demo/mock-data/schema-tables.config';

async function withSchemaServer(
  router: express.Router,
  fn: (baseUrl: string) => Promise<void>,
): Promise<void> {
  const app = express();
  app.use('/api/v1/schema', router);
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  const baseUrl = `http://127.0.0.1:${port}/api/v1/schema`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

describe('createSchemaRouter', () => {
  it('GET /entities returns entity list', async () => {
    const router = createSchemaRouter(MOCK_SCHEMA_CONFIG);
    await withSchemaServer(router, async (base) => {
      const res = await fetch(`${base}/entities`);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { key: string; label: string }[];
      expect(body.some((e) => e.key === 'products' && e.label === 'Товары')).toBe(true);
    });
  });

  it('GET /entities/:key returns fields', async () => {
    const router = createSchemaRouter(MOCK_SCHEMA_CONFIG);
    await withSchemaServer(router, async (base) => {
      const res = await fetch(`${base}/entities/products`);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { fields: { field: string }[] };
      expect(body.fields.some((f) => f.field === 'sku')).toBe(true);
    });
  });

  it('GET /entities/:key returns 404 for unknown key', async () => {
    const router = createSchemaRouter(MOCK_SCHEMA_CONFIG);
    await withSchemaServer(router, async (base) => {
      const res = await fetch(`${base}/entities/unknown`);
      expect(res.status).toBe(404);
    });
  });

  it('filterEntities middleware limits list', async () => {
    const router = createSchemaRouter(MOCK_SCHEMA_CONFIG, {
      filterEntities: () => [],
    });
    await withSchemaServer(router, async (base) => {
      const res = await fetch(`${base}/entities`);
      const body = (await res.json()) as unknown[];
      expect(body).toHaveLength(0);
    });
  });
});
