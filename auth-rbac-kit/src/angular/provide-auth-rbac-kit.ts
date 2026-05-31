import { Provider } from '@angular/core';

import type { AuthRbacKitConfig } from '../core';
import { AUTH_RBAC_KIT_CONFIG } from './auth-rbac.service';
import { AuthRbacService } from './auth-rbac.service';

export function provideAuthRbacKit(config: AuthRbacKitConfig = {}): Provider[] {
  return [{ provide: AUTH_RBAC_KIT_CONFIG, useValue: config }, AuthRbacService];
}
