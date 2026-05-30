import { Provider } from '@angular/core';

import type { EavKitConfig } from '../core';
import { EAV_KIT_CONFIG } from './tokens';

export function provideEavKit(config: EavKitConfig = {}): Provider[] {
  return [{ provide: EAV_KIT_CONFIG, useValue: config }];
}

export { EAV_KIT_CONFIG };
