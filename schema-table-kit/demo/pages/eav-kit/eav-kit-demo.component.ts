import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EavAttributeEditorComponent } from '@eav-kit/angular';

@Component({
  selector: 'demo-eav-kit',
  standalone: true,
  imports: [RouterLink, EavAttributeEditorComponent],
  template: `
    <section class="demo-page">
      <a routerLink="/" class="demo-back">← Все модули</a>
      <h1>eav-kit</h1>
      <p class="demo-lead">Редактор EAV-атрибутов для сущности (in-memory mock).</p>
      <eav-attribute-editor entityKey="products" />
    </section>
  `,
})
export class EavKitDemoComponent {}
