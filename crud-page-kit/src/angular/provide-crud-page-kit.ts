import { Provider } from '@angular/core';

import type { CrudPageKitConfig } from '../core';
import { CRUD_PAGE_KIT_CONFIG } from './tokens';

export function provideCrudPageKit(config: CrudPageKitConfig = {}): Provider[] {
  return [{ provide: CRUD_PAGE_KIT_CONFIG, useValue: config }];
}

export { CRUD_PAGE_KIT_CONFIG };
