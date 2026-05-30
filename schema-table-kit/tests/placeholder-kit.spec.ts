import { describe, expect, it } from 'vitest';
import { resolvePlaceholders, extractPlaceholderTokens } from '../placeholder-kit/src/core/resolve-placeholders';

describe('resolvePlaceholders', () => {
  const ctx = {
    org: { name: 'ООО Ромашка', inn: '123' },
    doc: { number: 'КП-1' },
  };

  it('substitutes known tokens', () => {
    expect(resolvePlaceholders('{{org.name}} — {{doc.number}}', ctx)).toBe('ООО Ромашка — КП-1');
  });

  it('leaves unknown tokens unchanged', () => {
    expect(resolvePlaceholders('{{unknown.x}}', ctx)).toBe('{{unknown.x}}');
  });

  it('extracts token keys', () => {
    expect(extractPlaceholderTokens('{{org.name}} x {{doc.number}}')).toEqual(['doc.number', 'org.name']);
  });
});
