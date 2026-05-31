import { describe, expect, it } from 'vitest';
import { resolvePlaceholders, extractPlaceholderTokens } from '../../placeholder-kit/src/core/resolve-placeholders';
import {
  resolvePlaceholderToken,
  resolvePlaceholderBlock,
  extractBlockPlaceholderTokens,
  createPlaceholderResolver,
} from '../../placeholder-kit/src/core/resolve-placeholders';
import {
  PLACEHOLDER_CATEGORIES,
  DEFAULT_PLACEHOLDER_REGISTRY,
  groupPlaceholdersByCategory,
  buildPlaceholderGroups,
} from '../../placeholder-kit/src/core/placeholder.registry';
import { escapeHtml, wrapPlaceholderDisplay, formatRuDate } from '../../placeholder-kit/src/core/placeholder-display.util';

const ctx = {
  org: { name: 'ООО Ромашка', inn: '123' },
  doc: { number: 'КП-1' },
  client: { name: 'ООО Клиент' },
};

// ── Existing resolvePlaceholders / extractPlaceholderTokens ────────────────

describe('resolvePlaceholders', () => {
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

// ── resolvePlaceholderToken ───────────────────────────────────────────────

describe('resolvePlaceholderToken', () => {
  it('resolves known token', () => {
    expect(resolvePlaceholderToken('org.name', ctx)).toBe('ООО Ромашка');
  });

  it('returns {{token}} for unknown token', () => {
    expect(resolvePlaceholderToken('unknown.x', ctx)).toBe('{{unknown.x}}');
  });

  it('resolves deep nested path', () => {
    const deepCtx = { org: { address: { city: 'Москва' } } };
    expect(resolvePlaceholderToken('org.address.city', deepCtx)).toBe('Москва');
  });

  it('returns {{token}} for null value', () => {
    expect(resolvePlaceholderToken('org.inn', { org: { inn: null } })).toBe('{{org.inn}}');
  });
});

// ── resolvePlaceholderBlock ───────────────────────────────────────────────

describe('resolvePlaceholderBlock', () => {
  it('resolves content in block', () => {
    const block = { type: 'text', content: '{{org.name}} — {{doc.number}}', settings: {} };
    const resolved = resolvePlaceholderBlock(block, ctx);
    expect(resolved.content).toBe('ООО Ромашка — КП-1');
    expect(resolved).not.toBe(block); // shallow copy
  });

  it('resolves content in cells array', () => {
    const block = {
      content: 'Header',
      cells: [
        { content: '{{org.name}}' },
        { content: '{{unknown}}' },
      ],
    };
    const resolved = resolvePlaceholderBlock(block, ctx);
    expect(resolved.cells?.[0]?.content).toBe('ООО Ромашка');
    expect(resolved.cells?.[1]?.content).toBe('{{unknown}}');
  });

  it('handles block without cells', () => {
    const block = { content: '{{org.name}}' };
    const resolved = resolvePlaceholderBlock(block, ctx);
    expect(resolved.content).toBe('ООО Ромашка');
    expect('cells' in resolved ? resolved['cells'] : undefined).toBeUndefined();
  });
});

// ── extractBlockPlaceholderTokens ─────────────────────────────────────────

describe('extractBlockPlaceholderTokens', () => {
  it('extracts from content and cells', () => {
    const block = {
      content: '{{org.name}} x {{doc.number}}',
      cells: [{ content: '{{client.name}}' }, { content: 'plain' }],
    };
    expect(extractBlockPlaceholderTokens(block)).toEqual(['client.name', 'doc.number', 'org.name']);
  });

  it('extracts from content only when no cells', () => {
    const block = { content: '{{org.name}}' };
    expect(extractBlockPlaceholderTokens(block)).toEqual(['org.name']);
  });
});

// ── createPlaceholderResolver ─────────────────────────────────────────────

describe('createPlaceholderResolver', () => {
  it('returns resolver with baked config', () => {
    const resolver = createPlaceholderResolver({
      fieldAliases: { phone: 'contactPhone' },
    });
    const result = resolver.resolve('test', ctx);
    expect(typeof result).toBe('string');
  });
});

// ── Placeholder Registry ──────────────────────────────────────────────────

describe('placeholder.registry', () => {
  it('PLACEHOLDER_CATEGORIES lists 4 categories', () => {
    expect(PLACEHOLDER_CATEGORIES).toHaveLength(4);
    expect(PLACEHOLDER_CATEGORIES.map((c) => c.key)).toEqual(['org', 'client', 'doc', 'item']);
  });

  it('DEFAULT_PLACEHOLDER_REGISTRY has 18 tokens', () => {
    expect(DEFAULT_PLACEHOLDER_REGISTRY).toHaveLength(18);
  });

  it('groupPlaceholdersByCategory groups tokens', () => {
    const grouped = groupPlaceholdersByCategory(DEFAULT_PLACEHOLDER_REGISTRY);
    expect(grouped.org.length).toBeGreaterThan(0);
    expect(grouped.client.length).toBeGreaterThan(0);
    expect(grouped.doc.length).toBeGreaterThan(0);
    expect(grouped.item.length).toBeGreaterThan(0);
    expect(grouped.org.every((t) => t.category === 'org')).toBe(true);
  });

  it('buildPlaceholderGroups returns all categories by default', () => {
    const groups = buildPlaceholderGroups();
    expect(groups).toHaveLength(4);
  });

  it('buildPlaceholderGroups filters by allowedCategories', () => {
    const groups = buildPlaceholderGroups({ allowedCategories: ['org', 'doc'] });
    expect(groups).toHaveLength(2);
    expect(groups.map((g) => g.category)).toEqual(['org', 'doc']);
  });

  it('buildPlaceholderGroups limits per category', () => {
    const groups = buildPlaceholderGroups({ limitPerCategory: 2 });
    for (const g of groups) {
      expect(g.tokens.length).toBeLessThanOrEqual(2);
    }
  });

  it('buildPlaceholderGroups filters by query', () => {
    const groups = buildPlaceholderGroups({ query: 'инн' });
    const allTokens = groups.flatMap((g) => g.tokens);
    expect(allTokens.length).toBeGreaterThanOrEqual(2);
    expect(allTokens.every((t) => t.token.toLowerCase().includes('инн') || t.label.toLowerCase().includes('инн')))
      .toBe(true);
  });
});

// ── Placeholder Display Utils ─────────────────────────────────────────────

describe('placeholder-display.util', () => {
  describe('escapeHtml', () => {
    it('escapes special characters', () => {
      expect(escapeHtml('<script>alert("x")</script>')).toBe(
        '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
      );
    });

    it('returns empty string for falsy input', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('wrapPlaceholderDisplay', () => {
    it('wraps unresolved tokens in span.ph-unresolved', () => {
      const result = wrapPlaceholderDisplay('{{unknown}}', (t) => `{{${t}}}`);
      expect(result).toContain('ph-unresolved');
      expect(result).toContain('{{unknown}}');
    });

    it('wraps resolved tokens in span.ph-resolved', () => {
      const result = wrapPlaceholderDisplay('{{org.name}}', (t) =>
        t === 'org.name' ? 'Ромашка' : `{{${t}}}`,
      );
      expect(result).toContain('ph-resolved');
      expect(result).toContain('Ромашка');
    });

    it('preserves plain text between tokens', () => {
      const result = wrapPlaceholderDisplay('Hello {{org.name}}!', (t) => 'X');
      expect(result).toContain('Hello');
      expect(result).toContain('!');
    });
  });

  describe('formatRuDate', () => {
    it('formats ISO date to ru-RU locale', () => {
      const result = formatRuDate('2026-05-30T12:00:00.000Z');
      expect(result).toBe('30.05.2026');
    });

    it('returns empty string for null/undefined', () => {
      expect(formatRuDate(null)).toBe('');
      expect(formatRuDate(undefined)).toBe('');
    });

    it('returns raw string for invalid date', () => {
      expect(formatRuDate('not-a-date')).toBe('not-a-date');
    });
  });
});
