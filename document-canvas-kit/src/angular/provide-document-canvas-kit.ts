import { Provider } from '@angular/core';

import type { DocumentCanvasKitConfig } from '../core';
import { DOCUMENT_CANVAS_KIT_CONFIG } from './tokens';

export function provideDocumentCanvasKit(config: DocumentCanvasKitConfig = {}): Provider[] {
  return [{ provide: DOCUMENT_CANVAS_KIT_CONFIG, useValue: config }];
}

export { DOCUMENT_CANVAS_KIT_CONFIG };
