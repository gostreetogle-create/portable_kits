import { type Type } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

export interface TestFixtureOptions {
  extraImports?: unknown[];
  extraProviders?: unknown[];
}

/**
 * Create a component fixture with async compileComponents.
 * Works with @analogjs/vite-plugin-angular which resolves
 * templateUrl / styleUrl at compile time.
 */
export async function createTestFixture<T>(
  component: Type<T>,
  options?: TestFixtureOptions,
): Promise<ComponentFixture<T>> {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [component, ...(options?.extraImports ?? [])],
    providers: [...(options?.extraProviders ?? [])],
  });
  await TestBed.compileComponents();
  return TestBed.createComponent(component);
}
