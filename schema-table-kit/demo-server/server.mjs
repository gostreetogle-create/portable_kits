import express from 'express';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = join(__dirname, '../demo/mock-data/schema-export.json');

/** Fallback если JSON не собран — минимальный products */
const FALLBACK = {
  entities: [
    {
      key: 'products',
      label: 'Товары',
      apiPath: '/products',
      schemaVersion: '1.0.0',
      fields: [
        { field: 'sku', label: 'Артикул', type: 'text' },
        { field: 'name', label: 'Наименование', type: 'text' },
        { field: 'listPrice', label: 'Цена', type: 'currency' },
      ],
    },
  ],
};

function loadConfig() {
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'));
  } catch {
    return FALLBACK;
  }
}

const config = loadConfig();
const app = express();
const PORT = 3333;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/v1/schema/entities', (_req, res) => {
  const list = (config.entities ?? []).map(
    ({ key, label, apiPath, schemaVersion, collection }) => ({
      key,
      label,
      apiPath,
      schemaVersion,
      collection,
    }),
  );
  res.json(list);
});

app.get('/api/v1/schema/entities/:key', (req, res) => {
  const entity = (config.entities ?? []).find((e) => e.key === req.params.key);
  if (!entity) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  res.json(entity);
});

app.listen(PORT, () => {
  console.log(`Schema demo-server: http://localhost:${PORT}/api/v1/schema/entities`);
});
