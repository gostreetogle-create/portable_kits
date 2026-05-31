import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import type { LayoutNavItem } from '../core';
import { LAYOUT_SHELL_KIT_CONFIG } from './tokens';

@Component({
  selector: 'ls-layout-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="ls-layout" [class.ls-layout--sidebar-open]="sidebarOpen()">
      @if (sidebarOpen()) {
        <button type="button" class="ls-overlay" aria-label="Закрыть меню" (click)="closeSidebar()"></button>
      }

      <header class="ls-mobile-header">
        <button type="button" class="ls-menu-btn" (click)="toggleSidebar()" aria-label="Меню">☰</button>
        <span>{{ config.appTitle ?? 'Приложение' }}</span>
      </header>

      <aside class="ls-sidebar" [class.ls-sidebar--open]="sidebarOpen()">
        <div class="ls-logo">{{ config.appTitle ?? 'Приложение' }}</div>
        <nav class="ls-nav" aria-label="Основная навигация">
          @for (item of navItems(); track item.route) {
            <a
              class="ls-nav-item"
              [routerLink]="item.route"
              routerLinkActive="ls-nav-item--active"
              [routerLinkActiveOptions]="{ exact: item.route === '/' }"
              (click)="closeSidebar()"
            >
              @if (item.icon) {
                <span class="ls-nav-icon" aria-hidden="true">{{ item.icon }}</span>
              }
              {{ item.label }}
            </a>
          }
        </nav>
      </aside>

      <main class="ls-main">
        <ng-content />
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .ls-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100vh;
      background: #f3f4f6;
    }

    .ls-overlay,
    .ls-mobile-header {
      display: none;
    }

    .ls-sidebar {
      background: #111827;
      color: #f9fafb;
      padding: 1rem 0;
    }

    .ls-logo {
      padding: 0 1rem 1rem;
      font-weight: 700;
      font-size: 1.125rem;
      border-bottom: 1px solid rgb(255 255 255 / 10%);
      margin-bottom: 0.5rem;
    }

    .ls-nav {
      display: flex;
      flex-direction: column;
    }

    .ls-nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      color: #d1d5db;
      text-decoration: none;
    }

    .ls-nav-item:hover,
    .ls-nav-item--active {
      background: rgb(255 255 255 / 8%);
      color: #fff;
    }

    .ls-main {
      padding: 1.5rem;
    }

    @media (max-width: 768px) {
      .ls-layout {
        grid-template-columns: 1fr;
      }

      .ls-mobile-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #fff;
        border-bottom: 1px solid #e5e7eb;
        grid-column: 1;
      }

      .ls-menu-btn {
        border: 1px solid #e5e7eb;
        background: #fff;
        border-radius: 6px;
        padding: 0.375rem 0.625rem;
        cursor: pointer;
      }

      .ls-sidebar {
        position: fixed;
        inset: 0 auto 0 0;
        width: 240px;
        z-index: 1001;
        transform: translateX(-100%);
        transition: transform 0.2s;
      }

      .ls-sidebar--open {
        transform: translateX(0);
      }

      .ls-overlay {
        display: block;
        position: fixed;
        inset: 0;
        border: none;
        background: rgb(0 0 0 / 40%);
        z-index: 1000;
        cursor: pointer;
      }
    }
  `,
})
export class LayoutShellComponent {
  private readonly kitConfig = inject(LAYOUT_SHELL_KIT_CONFIG, { optional: true }) ?? {};

  readonly config = this.kitConfig;
  readonly navItems = computed(() => this.kitConfig.navItems ?? []);
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
