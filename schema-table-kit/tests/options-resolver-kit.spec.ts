import { describe, expect, it, vi } from 'vitest';
import { OptionsResolver } from '../../options-resolver-kit/src/angular/options-resolver.service';
import type { OptionsResolverConfig, EntityOptionsDefinition } from '../../options-resolver-kit/src/core';

function createResolver(
  entities: EntityOptionsDefinition[],
): { resolver: OptionsResolver; config: OptionsResolverConfig } {
  const config: OptionsResolverConfig = { entities };
  const resolver = new OptionsResolver(config);
  return { resolver, config };
}

describe('OptionsResolver', () => {
  it('returns options from entity loader', async () => {
    const { resolver } = createResolver([
      {
        entityKey: 'statuses',
        load: async () => [
          { label: 'Active', value: 1 },
          { label: 'Inactive', value: 0 },
        ],
      },
    ]);

    const options = await resolver.getOptions('statuses');
    expect(options).toHaveLength(2);
    expect(options[0].label).toBe('Active');
  });

  it('caches the pending promise for concurrent deduplication', async () => {
    const load = vi.fn().mockResolvedValue([{ label: 'X', value: 1 }]);
    const { resolver } = createResolver([{ entityKey: 'test', load }]);

    const [a, b] = await Promise.all([
      resolver.getOptions('test'),
      resolver.getOptions('test'),
    ]);

    expect(load).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
  });

  it('rejects for unknown entityKey', async () => {
    const { resolver } = createResolver([]);

    await expect(resolver.getOptions('unknown')).rejects.toThrow(
      'options-resolver-kit: unknown entityKey "unknown"',
    );
  });

  it('does not cache rejected promises — retry possible', async () => {
    const load = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce([{ label: 'OK', value: 1 }]);

    const { resolver } = createResolver([{ entityKey: 'flaky', load }]);

    // First call fails
    await expect(resolver.getOptions('flaky')).rejects.toThrow(
      'options-resolver-kit: failed to load "flaky"',
    );

    // Second call retries and succeeds
    const options = await resolver.getOptions('flaky');
    expect(options).toHaveLength(1);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('wraps non-Error rejections with normalized message', async () => {
    const load = vi.fn().mockRejectedValue('string error');
    const { resolver } = createResolver([{ entityKey: 'bad', load }]);

    await expect(resolver.getOptions('bad')).rejects.toThrow(
      'options-resolver-kit: failed to load "bad": Unknown error',
    );
  });

  it('clearCache removes single entry', async () => {
    const load = vi.fn().mockResolvedValue([{ label: 'A', value: 1 }]);
    const { resolver } = createResolver([{ entityKey: 'x', load }]);

    await resolver.getOptions('x');
    resolver.clearCache('x');
    await resolver.getOptions('x');

    expect(load).toHaveBeenCalledTimes(2);
  });

  it('clearCache without key clears all', async () => {
    const load = vi.fn().mockResolvedValue([{ label: 'A', value: 1 }]);
    const { resolver } = createResolver([{ entityKey: 'x', load }]);

    await resolver.getOptions('x');
    resolver.clearCache();
    await resolver.getOptions('x');

    expect(load).toHaveBeenCalledTimes(2);
  });
});
