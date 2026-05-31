import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { KpTabGroupComponent } from './kp-tab-group.component';

describe('KpTabGroupComponent', () => {
  const mockOptions = [
    { label: 'General', value: 'general' },
    { label: 'Details', value: 'details', icon: 'pi pi-info' },
  ];

  async function createTabGroupFixture() {
    const fixture = await createTestFixture(KpTabGroupComponent);
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
    return fixture;
  }

  it('creates component', async () => {
    const fixture = await createTabGroupFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTabGroupFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets default inputs', async () => {
    const fixture = await createTabGroupFixture();
    const comp = fixture.componentInstance;
    expect(comp.activeTab()).toBe('');
    expect(comp.ariaLabel()).toBe('Вкладки');
  });

  it('onTabClick updates activeTab and emits tabChange', async () => {
    const fixture = await createTabGroupFixture();
    const comp = fixture.componentInstance;
    let emitted = '';
    comp.tabChange.subscribe((v) => (emitted = v));
    comp.onTabClick('details');
    expect(comp.activeTab()).toBe('details');
    expect(emitted).toBe('details');
  });

  it('emits tabChange on tab click', async () => {
    const fixture = await createTabGroupFixture();
    const comp = fixture.componentInstance;
    let value = '';
    comp.tabChange.subscribe((v) => (value = v));
    comp.onTabClick('general');
    expect(value).toBe('general');
  });
});
