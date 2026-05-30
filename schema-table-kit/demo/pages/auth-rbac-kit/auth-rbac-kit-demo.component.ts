import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRbacService } from '@auth-rbac-kit/angular';
import { DEMO_PERMISSIONS, hasPermission, type AuthUser } from '@auth-rbac-kit/core';

@Component({
  selector: 'demo-auth-rbac-kit',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="demo-page">
      <a routerLink="/" class="demo-back">← Все модули</a>
      <h1>auth-rbac-kit</h1>
      <p class="demo-lead">Проверка прав через AuthRbacService и hasPermission().</p>

      <div class="demo-actions">
        <button type="button" (click)="setRole('viewer')">Роль: viewer</button>
        <button type="button" (click)="setRole('editor')">Роль: editor</button>
      </div>

      <ul class="demo-perms">
        <li [class.demo-perms__ok]="canView()">products.view — {{ canView() ? '✅' : '⛔' }}</li>
        <li [class.demo-perms__ok]="canCreate()">products.create — {{ canCreate() ? '✅' : '⛔' }}</li>
        <li [class.demo-perms__ok]="canEdit()">products.edit — {{ canEdit() ? '✅' : '⛔' }}</li>
        <li [class.demo-perms__ok]="canDelete()">products.delete — {{ canDelete() ? '✅' : '⛔' }}</li>
      </ul>
    </section>
  `,
  styles: `
    .demo-actions {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .demo-perms {
      list-style: none;
      padding: 0;
    }

    .demo-perms li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #e5e7eb;
      color: #6b7280;
    }

    .demo-perms__ok {
      color: #059669;
    }
  `,
})
export class AuthRbacKitDemoComponent {
  private readonly auth = inject(AuthRbacService);
  private readonly user = signal<AuthUser | null>({
    id: 'demo',
    permissions: [DEMO_PERMISSIONS.products.view],
  });

  constructor() {
    // AuthRbacService reads from provideAuthRbacKit getUser — demo toggles via direct checks
  }

  setRole(role: 'viewer' | 'editor'): void {
    const perms =
      role === 'editor'
        ? Object.values(DEMO_PERMISSIONS.products)
        : [DEMO_PERMISSIONS.products.view];
    this.user.set({ id: 'demo', permissions: perms });
  }

  canView(): boolean {
    return hasPermission(this.user(), DEMO_PERMISSIONS.products.view);
  }

  canCreate(): boolean {
    return hasPermission(this.user(), DEMO_PERMISSIONS.products.create);
  }

  canEdit(): boolean {
    return hasPermission(this.user(), DEMO_PERMISSIONS.products.edit);
  }

  canDelete(): boolean {
    return hasPermission(this.user(), DEMO_PERMISSIONS.products.delete);
  }
}
