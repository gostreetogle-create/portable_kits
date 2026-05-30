export interface PermissionActions {
  view: string;
  create: string;
  edit: string;
  delete: string;
}

export interface AuthUser {
  id: string;
  name?: string;
  permissions: string[];
}

export interface AuthRbacKitConfig {
  /** Current user permissions (demo apps can use a static list). */
  getUser?: () => AuthUser | null;
  /** Optional permission catalog for demos. */
  catalog?: Record<string, PermissionActions>;
}

/** Check if user has a specific permission string. */
export function hasPermission(user: AuthUser | null | undefined, permission: string): boolean {
  if (!user) return false;
  if (!permission) return true;
  return user.permissions.includes(permission);
}

/** Check if user has any of the given permissions. */
export function hasAnyPermission(
  user: AuthUser | null | undefined,
  permissions: string[],
): boolean {
  return permissions.some((p) => hasPermission(user, p));
}

/** Demo catalog — consumer replaces with app-specific permissions. */
export const DEMO_PERMISSIONS = {
  products: {
    view: 'office.products.view',
    create: 'office.products.create',
    edit: 'office.products.edit',
    delete: 'office.products.delete',
  },
  quotations: {
    view: 'office.quotations.view',
    create: 'office.quotations.create',
    edit: 'office.quotations.edit',
    delete: 'office.quotations.delete',
  },
} as const;
