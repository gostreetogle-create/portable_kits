import { Provider } from '@angular/core';

import type { OptionsResolverConfig } from '../core';
import { OPTIONS_RESOLVER_CONFIG } from './tokens';

export function provideOptionsResolver(config: OptionsResolverConfig): Provider[] {
  return [{ provide: OPTIONS_RESOLVER_CONFIG, useValue: config }];
}

export { OPTIONS_RESOLVER_CONFIG };
