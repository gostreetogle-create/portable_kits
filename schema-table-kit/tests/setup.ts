import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// DragEvent polyfill for jsdom (needed by KpPhotoUploaderComponent)
if (typeof globalThis.DragEvent === 'undefined') {
  class DragEventPolyfill extends Event {
    readonly dataTransfer: DataTransfer | null = null;
    constructor(type: string, init?: DragEventInit) {
      super(type, init);
      this.dataTransfer = init?.dataTransfer ?? null;
    }
  }
  (globalThis as unknown as Record<string, unknown>)['DragEvent'] = DragEventPolyfill;
}
