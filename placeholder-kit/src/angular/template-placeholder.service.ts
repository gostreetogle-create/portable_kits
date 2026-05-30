import { Injectable, inject } from '@angular/core';

import type { PlaceholderContext } from '../core';
import {
  extractBlockPlaceholderTokens,
  extractPlaceholderTokens,
  resolvePlaceholderBlock,
  resolvePlaceholders,
  type PlaceholderResolvableBlock,
} from '../core';
import { PLACEHOLDER_KIT_CONFIG } from './tokens';

@Injectable({ providedIn: 'root' })
export class TemplatePlaceholderService {
  private readonly config = inject(PLACEHOLDER_KIT_CONFIG, { optional: true }) ?? {};

  resolve(template: string, context: PlaceholderContext): string {
    return resolvePlaceholders(template, context, this.config);
  }

  resolveBlock<T extends PlaceholderResolvableBlock>(
    block: T,
    context: PlaceholderContext,
  ): T {
    return resolvePlaceholderBlock(block, context, this.config);
  }

  extractTokens(template: string): string[] {
    return extractPlaceholderTokens(template);
  }

  extractBlockTokens(block: PlaceholderResolvableBlock): string[] {
    return extractBlockPlaceholderTokens(block);
  }
}
