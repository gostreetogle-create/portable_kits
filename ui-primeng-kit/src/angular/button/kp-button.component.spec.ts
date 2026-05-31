import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpButtonComponent } from './kp-button.component';

describe('KpButtonComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    expect(comp.type()).toBe('button');
    expect(comp.severity()).toBe('primary');
    expect(comp.size()).toBe('small');
    expect(comp.variant()).toBe('premium');
    expect(comp.label()).toBe('');
  });

  it('emits buttonClick on click', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    let emitted: MouseEvent | null = null;
    comp.buttonClick.subscribe((e) => (emitted = e));
    comp.onClick(new MouseEvent('click'));
    expect(emitted).toBeTruthy();
  });

  it('blocks click when disabled', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('disabled', true);
    let emitted = false;
    comp.buttonClick.subscribe(() => (emitted = true));
    const event = new MouseEvent('click');
    event.preventDefault();
    comp.onClick(event);
    expect(emitted).toBe(false);
  });

  it('blocks click when loading', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('loading', true);
    let emitted = false;
    comp.buttonClick.subscribe(() => (emitted = true));
    const event = new MouseEvent('click');
    event.preventDefault();
    comp.onClick(event);
    expect(emitted).toBe(false);
  });

  it('host binding classes reflect variant', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('variant', 'premium');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('up-kp-button--variant-premium')).toBe(true);
    expect(fixture.nativeElement.classList.contains('up-kp-button--variant-flat')).toBe(false);

    fixture.componentRef.setInput('variant', 'flat');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('up-kp-button--variant-flat')).toBe(true);
    expect(fixture.nativeElement.classList.contains('up-kp-button--variant-premium')).toBe(false);
  });

  it('host binding classes reflect severity', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('severity', 'danger');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('up-kp-button--severity-danger')).toBe(true);
    expect(fixture.nativeElement.classList.contains('up-kp-button--severity-primary')).toBe(false);
  });

  it('tooltipText omits duplicate label', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Save');
    fixture.componentRef.setInput('tooltip', 'Save');
    expect(comp.tooltipText()).toBe('');
    fixture.componentRef.setInput('tooltip', 'Save changes');
    expect(comp.tooltipText()).toBe('Save changes');
  });

  it('buttonClasses includes size and severity', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('severity', 'danger');
    const cls = comp.buttonClasses();
    expect(cls).toContain('p-button-lg');
    expect(cls).toContain('p-button-danger');
  });

  it('mergedStyleClass includes block', async () => {
    const fixture = await createTestFixture(KpButtonComponent);
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('block', true);
    expect(comp.mergedStyleClass()).toContain('up-kp-button--block');
  });
});
