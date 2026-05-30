import { describe, expect, it } from 'vitest';
import type { PhotoItem } from '../photo-uploader-kit/src/core/types';

describe('PhotoItem', () => {
  it('accepts url with optional frame settings', () => {
    const item: PhotoItem = {
      url: 'https://example.com/a.jpg',
      position: { x: 30, y: 70 },
      scale: 1.2,
    };
    expect(item.url).toContain('example.com');
    expect(item.scale).toBe(1.2);
  });
});
