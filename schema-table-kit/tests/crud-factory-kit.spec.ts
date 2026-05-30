import { describe, expect, it } from 'vitest';
import { paginated, success, error } from '@crud-factory-kit/core';

describe('crud-factory-kit api-response', () => {
  it('builds paginated payload', () => {
    const res = paginated([{ id: 1 }], 1, 1, 50);
    expect(res.success).toBe(true);
    expect(res.totalPages).toBe(1);
    expect(res.data).toHaveLength(1);
  });

  it('builds success payload', () => {
    expect(success({ ok: true }).data).toEqual({ ok: true });
  });

  it('builds error payload', () => {
    expect(error('fail').success).toBe(false);
  });
});
