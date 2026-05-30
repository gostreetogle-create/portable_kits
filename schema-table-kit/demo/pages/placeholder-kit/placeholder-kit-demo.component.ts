import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaceholderPickerComponent } from '@placeholder-kit/angular';
import {
  resolvePlaceholders,
  wrapPlaceholderDisplay,
  resolvePlaceholderToken,
  type PlaceholderContext,
} from '@placeholder-kit/core';

@Component({
  selector: 'demo-placeholder-kit',
  standalone: true,
  imports: [RouterLink, PlaceholderPickerComponent],
  templateUrl: './placeholder-kit-demo.component.html',
  styleUrl: './placeholder-kit-demo.component.scss',
})
export class PlaceholderKitDemoComponent {
  readonly tokenExample = '{{org.name}}';
  readonly pickerVisible = signal(false);
  readonly template = signal('Поставщик: {{org.name}}, ИНН {{org.inn}}. Документ №{{doc.number}}');

  readonly context: PlaceholderContext = {
    org: { name: 'ООО «Ромашка»', inn: '7701234567' },
    client: { name: 'ИП Иванов' },
    doc: { number: 'КП-2026-001', total: 125000 },
  };

  readonly resolved = signal('');
  readonly displayHtml = signal('');

  constructor() {
    this.refresh();
  }

  refresh(): void {
    const tpl = this.template();
    this.resolved.set(resolvePlaceholders(tpl, this.context));
    this.displayHtml.set(
      wrapPlaceholderDisplay(tpl, (token) => resolvePlaceholderToken(token, this.context)),
    );
  }

  openPicker(): void {
    this.pickerVisible.set(true);
  }

  onPlaceholderSelected(token: string): void {
    this.template.update((t) => t + token);
    this.refresh();
  }

  onTemplateInput(value: string): void {
    this.template.set(value);
    this.refresh();
  }
}
