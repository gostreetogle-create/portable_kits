import type { Request, RequestHandler, Response, Router } from 'express';
import type { EntitySchema, SchemaTableKitConfig } from '../core';
import { findEntity } from '../core';

export interface SchemaRouterOptions {
  middleware?: RequestHandler[];
  filterEntities?: (req: Request) => string[] | undefined;
  filterFields?: (req: Request, entityKey: string) => string[] | undefined;
}

function getEntities(config: SchemaTableKitConfig): EntitySchema[] {
  return config.entities ?? [];
}

export function createSchemaRouter(
  config: SchemaTableKitConfig,
  options: SchemaRouterOptions = {},
): Router {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const express = require('express') as typeof import('express');
  const router = express.Router();

  if (options.middleware?.length) {
    router.use(...options.middleware);
  }

  router.get('/entities', (req: Request, res: Response) => {
    let list = getEntities(config).map(({ key, label, apiPath, schemaVersion, collection }) => ({
      key,
      label,
      apiPath,
      schemaVersion,
      collection,
    }));

    const allowed = options.filterEntities?.(req);
    if (allowed) {
      list = list.filter((e) => allowed.includes(e.key));
    }

    res.json(list);
  });

  router.get('/entities/:key', (req: Request, res: Response) => {
    const key = String(req.params['key'] ?? '');
    const entity = findEntity(getEntities(config), key);
    if (!entity) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    let fields = entity.fields;
    const allowedFields = options.filterFields?.(req, key);
    if (allowedFields) {
      fields = fields.filter((f) => allowedFields.includes(f.field));
    }

    res.json({ ...entity, fields });
  });

  return router;
}
