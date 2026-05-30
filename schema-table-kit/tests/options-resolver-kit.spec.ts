import { describe, expect, it } from 'vitest';

describe('options-resolver-kit', () => {
  it('exports core types module', async () => {
    const mod = await import('@options-resolver-kit/core');
    expect(mod).toBeDefined();
  });
});
