import { Provider } from '@angular/core';

import type { QuotationEditorKitConfig } from '../core';
import { QUOTATION_EDITOR_KIT_CONFIG } from './tokens';

export function provideQuotationEditorKit(config: QuotationEditorKitConfig = {}): Provider[] {
  return [{ provide: QUOTATION_EDITOR_KIT_CONFIG, useValue: config }];
}

export { QUOTATION_EDITOR_KIT_CONFIG };
