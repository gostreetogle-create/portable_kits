import { InjectionToken, inject, Injectable } from '@angular/core';

import { hasPermission, type AuthRbacKitConfig, type AuthUser } from '../core';

export const AUTH_RBAC_KIT_CONFIG = new InjectionToken<AuthRbacKitConfig>('AUTH_RBAC_KIT_CONFIG');

@Injectable({ providedIn: 'root' })
export class AuthRbacService {
  private readonly config = inject(AUTH_RBAC_KIT_CONFIG, { optional: true }) ?? {};

  getUser(): AuthUser | null {
    return this.config.getUser?.() ?? null;
  }

  can(permission: string): boolean {
    return hasPermission(this.getUser(), permission);
  }
}
