import { describe, expect, it } from 'vitest';
import type { PhotoItem } from '../../photo-uploader-kit/src/core/types';
import {
  filterImageFiles,
  DEFAULT_PHOTO_POSITION,
  photoPositionStyle,
} from '../../photo-uploader-kit/src/core/photo.utils';

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

// ── photo.utils ───────────────────────────────────────────────────────────

describe('filterImageFiles', () => {
  function fakeFile(name: string, type: string): File {
    return { name, type, size: 0, lastModified: 0, slice: () => new Blob(), arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)), text: () => Promise.resolve(''), stream: () => new ReadableStream() } as File;
  }

  it('keeps only image files', () => {
    const files = [
      fakeFile('photo.jpg', 'image/jpeg'),
      fakeFile('doc.pdf', 'application/pdf'),
      fakeFile('logo.png', 'image/png'),
    ];
    const result = filterImageFiles(files);
    expect(result).toHaveLength(2);
    expect(result.every((f) => f.type.startsWith('image/'))).toBe(true);
  });

  it('returns empty array for no images', () => {
    expect(filterImageFiles([fakeFile('doc.pdf', 'application/pdf')])).toHaveLength(0);
  });

  it('returns empty array for empty input', () => {
    expect(filterImageFiles([])).toHaveLength(0);
  });
});

describe('DEFAULT_PHOTO_POSITION', () => {
  it('is center', () => {
    expect(DEFAULT_PHOTO_POSITION).toEqual({ x: 50, y: 50 });
  });
});

describe('photoPositionStyle', () => {
  it('returns position from photo', () => {
    const style = photoPositionStyle({ url: 'a.jpg', position: { x: 30, y: 70 } });
    expect(style).toBe('30% 70%');
  });

  it('falls back to DEFAULT_PHOTO_POSITION', () => {
    const style = photoPositionStyle({ url: 'a.jpg' });
    expect(style).toBe('50% 50%');
  });
});
