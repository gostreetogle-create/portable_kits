import { describe, expect, it } from 'vitest';
import { createTestFixture } from '../test-utils';
import { provideRouter } from '@angular/router';
import { KpBreadcrumbsComponent } from './kp-breadcrumbs.component';

describe('KpBreadcrumbsComponent', () => {
  it('creates component', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct selector', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('starts hidden when no items and root path', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    expect(fixture.componentInstance.visible()).toBe(false);
  });

  it('renders custom items via input', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('items', [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
    ]);
    comp.ngOnInit();
    expect(comp.visible()).toBe(true);
    expect(comp.menuItems().length).toBe(2);
    expect(comp.menuItems()[0].label).toBe('Home');
  });

  it('homeItem has home icon', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    expect(fixture.componentInstance.homeItem.icon).toBe('pi pi-home');
    expect(fixture.componentInstance.homeItem.routerLink).toBe('/dashboard');
  });

  it('humanizeSegment converts kebab to title', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    const result = (fixture.componentInstance as any).humanizeSegment('product-passports');
    expect(result).toBe('Product Passports');
  });

  it('accepts custom routeLabels', async () => {
    const fixture = await createTestFixture(KpBreadcrumbsComponent, { extraProviders: [provideRouter([])] });
    const comp = fixture.componentInstance;
    fixture.componentRef.setInput('routeLabels', { dashboard: 'Home' });
    expect(comp.routeLabels()['dashboard']).toBe('Home');
  });
});
