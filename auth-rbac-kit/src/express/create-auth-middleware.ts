import type { Request, Response, NextFunction } from 'express';

/** Minimal JWT auth middleware stub — consumer replaces with real JWT validation. */
export function createAuthMiddleware(options: {
  headerName?: string;
  onUnauthorized?: (res: Response) => void;
} = {}) {
  const headerName = options.headerName ?? 'authorization';
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers[headerName];
    if (!token) {
      if (options.onUnauthorized) {
        options.onUnauthorized(res);
        return;
      }
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    next();
  };
}

/** Check permission on request user (expects req.user.permissions). */
export function requirePermission(permission: string) {
  return (req: Request & { user?: { permissions?: string[] } }, res: Response, next: NextFunction): void => {
    const perms = req.user?.permissions ?? [];
    if (!perms.includes(permission)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
}
