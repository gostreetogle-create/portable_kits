import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpDatepickerComponent } from './kp-datepicker.component';

describe('KpDatepickerComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    const comp = fixture.componentInstance;
    expect(comp.value()).toBe('');
    expect(comp.required()).toBe(false);
  });

  it('computes errorId from name', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    fixture.componentRef.setInput('name', 'date');
    expect(fixture.componentInstance.errorId()).toBe('date-error');
  });

  it('dateValue parses ISO string', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    fixture.componentRef.setInput('value', '2026-06-15');
    const d = fixture.componentInstance.dateValue();
    expect(d).toBeInstanceOf(Date);
    expect(d!.getFullYear()).toBe(2026);
    expect(d!.getMonth()).toBe(5); // June = 5
    expect(d!.getDate()).toBe(15);
  });

  it('dateValue returns null for empty string', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    expect(fixture.componentInstance.dateValue()).toBeNull();
  });

  it('dateValue returns null for invalid date', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    fixture.componentRef.setInput('value', 'invalid');
    expect(fixture.componentInstance.dateValue()).toBeNull();
  });

  it('onDateChange formats date to ISO string', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    const comp = fixture.componentInstance;
    comp.onDateChange(new Date(2026, 5, 15));
    expect(comp.value()).toBe('2026-06-15');
  });

  it('onDateChange with null clears value', async () => {
    const fixture = await createTestFixture(KpDatepickerComponent);
    fixture.componentRef.setInput('value', '2026-06-15');
    fixture.componentInstance.onDateChange(null);
    expect(fixture.componentInstance.value()).toBe('');
  });
});
