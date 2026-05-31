import { Router, type NextFunction, type Request, type Response } from 'express';

import { error, paginated, success } from '../core';
import type { CreateCrudRouterOptions, CrudModel } from '../core';

/**
 * Creates a generic CRUD router for any Mongoose-compatible model.
 *
 * Query params (all optional):
 *   ?page=1&limit=50        — pagination
 *   ?search=text             — regex search across searchFields (case-insensitive)
 *   ?sort=field&order=asc    — sort by field (default: createdAt desc)
 *   ?all=true                — include inactive records (default: isActive:true only)
 */
export function createCrudRouter<T>(
  model: CrudModel<T>,
  options: CreateCrudRouterOptions = {},
): Router {
  const searchFields = options.searchFields ?? ['name', 'number', 'label'];
  const hooks = options.hooks;
  const permPrefix = options.permPrefix;

  const router = Router();

  if (permPrefix && options.authenticate) {
    router.use(options.authenticate);
  }

  const noop = (_req: unknown, _res: unknown, next: NextFunction) => next();
  const p = (action: 'view' | 'create' | 'edit' | 'delete') =>
    permPrefix && options.requirePermission ? options.requirePermission(action) : noop;

  router.get('/', p('view'), async (req: Request, res: Response) => {
    try {
      const q = req.query as Record<string, string | undefined>;
      const page = parseInt(q['page'] ?? '1') || 1;
      const limit = parseInt(q['limit'] ?? '50') || 50;
      const skip = (page - 1) * limit;
      const filter: Record<string, unknown> = {};

      const showAll = q['all'] === 'true';
      if (!showAll) {
        filter['isActive'] = true;
      }

      const search = q['search'];
      if (search && searchFields.length > 0) {
        const regex = { $regex: search, $options: 'i' };
        filter['$or'] = searchFields.map((field) => ({ [field]: regex }));
      }

      const knownParams = ['page', 'limit', 'search', 'sort', 'order', 'all'];
      for (const key of Object.keys(q)) {
        if (!knownParams.includes(key) && q[key]) {
          filter[key] = q[key];
        }
      }

      const sortField = q['sort'] || 'createdAt';
      const sortOrder = q['order'] === 'asc' ? 1 : -1;
      const sort: Record<string, 1 | -1> = { [sortField]: sortOrder };

      const [data, total] = await Promise.all([
        model.find(filter).sort(sort).skip(skip).limit(limit),
        model.countDocuments(filter),
      ]);

      res.json(paginated(data, total, page, limit));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json(error(message));
    }
  });

  router.get('/:id', p('view'), async (req: Request, res: Response) => {
    try {
      const doc = await model.findById(req.params['id']);
      if (!doc) {
        res.status(404).json(error('Not found'));
        return;
      }
      res.json(success(doc));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json(error(message));
    }
  });

  router.post('/', p('create'), async (req: Request, res: Response) => {
    try {
      if (hooks?.beforeCreate) {
        await hooks.beforeCreate(req.body);
      }
      const doc = await model.create(req.body);
      res.status(201).json(success(doc, 'Created'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(400).json(error(message));
    }
  });

  router.put('/:id', p('edit'), async (req: Request, res: Response) => {
    try {
      if (hooks?.beforeUpdate) {
        await hooks.beforeUpdate(req.body);
      }
      const doc = await model.findByIdAndUpdate(req.params['id'], req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        res.status(404).json(error('Not found'));
        return;
      }
      res.json(success(doc, 'Updated'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(400).json(error(message));
    }
  });

  router.delete('/:id', p('delete'), async (req: Request, res: Response) => {
    try {
      const doc = await model.findByIdAndDelete(req.params['id']);
      if (!doc) {
        res.status(404).json(error('Not found'));
        return;
      }
      res.json(success(null, 'Deleted'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json(error(message));
    }
  });

  return router;
}
