import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutShellComponent } from '@layout-shell-kit/angular';

@Component({
  selector: 'demo-layout-shell-kit',
  standalone: true,
  imports: [RouterLink, LayoutShellComponent],
  template: `
    <section class="demo-page">
      <a routerLink="/" class="demo-back">← Все модули</a>
      <h1>layout-shell-kit</h1>
      <p class="demo-lead">Оболочка приложения с боковым меню (preview в iframe-like block).</p>

      <div class="demo-shell-preview">
        <ls-layout-shell>
          <div class="demo-shell-content">
            <h2>Контент страницы</h2>
            <p>Слот router-outlet — здесь preview без nested routing.</p>
          </div>
        </ls-layout-shell>
      </div>
    </section>
  `,
  styles: `
    .demo-shell-preview {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      max-height: 480px;
    }

    .demo-shell-content {
      padding: 1rem;
    }
  `,
})
export class LayoutShellKitDemoComponent {}
