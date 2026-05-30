import { InjectionToken } from '@angular/core';

import type { QuotationEditorKitConfig } from '../core';

export const QUOTATION_EDITOR_KIT_CONFIG = new InjectionToken<QuotationEditorKitConfig>(
  'QUOTATION_EDITOR_KIT_CONFIG',
);
