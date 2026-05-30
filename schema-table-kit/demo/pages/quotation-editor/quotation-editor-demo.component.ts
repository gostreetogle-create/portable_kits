import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuotationEditorComponent } from '@quotation-editor/angular';

@Component({
  selector: 'demo-quotation-editor',
  standalone: true,
  imports: [RouterLink, QuotationEditorComponent],
  template: `
    <section class="demo-page">
      <a routerLink="/" class="demo-back">← Все модули</a>
      <h1>quotation-editor</h1>
      <p class="demo-lead">
        v0.1: document-canvas + multi-select entity-picker + placeholder picker.
      </p>
      <qe-quotation-editor />
    </section>
  `,
})
export class QuotationEditorDemoComponent {}
