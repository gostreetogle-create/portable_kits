import { describe, expect, it } from 'vitest';
import { DEMO_PERMISSIONS, hasAnyPermission, hasPermission } from '../../auth-rbac-kit/src/core';

describe('hasPermission', () => {
  it('checks user permission list', () => {
    const user = { id: '1', permissions: [DEMO_PERMISSIONS.products.view] };
    expect(hasPermission(user, DEMO_PERMISSIONS.products.view)).toBe(true);
    expect(hasPermission(user, DEMO_PERMISSIONS.products.delete)).toBe(false);
  });

  it('hasAnyPermission checks multiple', () => {
    const user = { id: '1', permissions: [DEMO_PERMISSIONS.products.edit] };
    expect(
      hasAnyPermission(user, [DEMO_PERMISSIONS.products.create, DEMO_PERMISSIONS.products.edit]),
    ).toBe(true);
  });
});
