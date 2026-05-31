import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  isValidEavAttributeKey,
  normalizeEavAttributeOrder,
  type EavAttributeDefinition,
  type EavAttributeType,
} from '../core';
import { EAV_KIT_CONFIG } from './tokens';

@Component({
  selector: 'eav-attribute-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <section class="eav-editor">
      <header class="eav-editor__header">
        <h2>Атрибуты: {{ entityKey() }}</h2>
        <button type="button" class="eav-btn eav-btn--primary" (click)="addAttribute()">+ Атрибут</button>
      </header>

      @if (loading()) {
        <p class="eav-editor__status">Загрузка…</p>
      } @else if (error()) {
        <p class="eav-editor__status eav-editor__status--error">{{ error() }}</p>
      } @else if (attributes().length === 0) {
        <p class="eav-editor__status">Нет атрибутов. Добавьте первый.</p>
      } @else {
        <table class="eav-table">
          <thead>
            <tr>
              <th>Ключ</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Обяз.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (attr of attributes(); track attr.key; let i = $index) {
              <tr>
                <td>
                  <input
                    [(ngModel)]="attr.key"
                    (ngModelChange)="onFieldChange()"
                    [class.eav-input--invalid]="!isValidEavAttributeKey(attr.key)"
                  />
                </td>
                <td><input [(ngModel)]="attr.label" (ngModelChange)="onFieldChange()" /></td>
                <td>
                  <select [(ngModel)]="attr.type" (ngModelChange)="onFieldChange()">
                    @for (t of types; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                </td>
                <td><input type="checkbox" [(ngModel)]="attr.required" (ngModelChange)="onFieldChange()" /></td>
                <td>
                  <button type="button" class="eav-btn eav-btn--danger" (click)="removeAttribute(i)">×</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }

      <footer class="eav-editor__footer">
        <button type="button" class="eav-btn eav-btn--primary" [disabled]="saving()" (click)="save()">
          {{ saving() ? 'Сохранение…' : 'Сохранить' }}
        </button>
      </footer>
    </section>
  `,
  styles: `
    .eav-editor {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .eav-editor__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .eav-editor__header h2 {
      margin: 0;
      font-size: 1.125rem;
    }

    .eav-editor__status {
      color: #6b7280;
      text-align: center;
      padding: 2rem;
    }

    .eav-editor__status--error {
      color: #dc2626;
    }

    .eav-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .eav-table th,
    .eav-table td {
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
    }

    .eav-table input,
    .eav-table select {
      width: 100%;
      padding: 0.375rem 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font: inherit;
    }

    .eav-input--invalid {
      border-color: #dc2626 !important;
    }

    .eav-editor__footer {
      display: flex;
      justify-content: flex-end;
    }

    .eav-btn {
      padding: 0.5rem 0.875rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: #fff;
      font: inherit;
      cursor: pointer;
    }

    .eav-btn--primary {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }

    .eav-btn--danger {
      color: #dc2626;
    }
  `,
})
export class EavAttributeEditorComponent {
  private readonly config = inject(EAV_KIT_CONFIG, { optional: true }) ?? {};

  readonly entityKey = model<string>('');

  readonly attributes = signal<EavAttributeDefinition[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly types: EavAttributeType[] = ['string', 'number', 'boolean', 'date', 'select'];
  readonly isValidEavAttributeKey = isValidEavAttributeKey;

  constructor() {
    effect(() => {
      const key = this.entityKey();
      void this.load(key);
    });
  }

  addAttribute(): void {
    this.attributes.update((attrs) =>
      normalizeEavAttributeOrder([
        ...attrs,
        {
          entityKey: this.entityKey(),
          key: `attr_${attrs.length + 1}`,
          label: 'Новый атрибут',
          type: 'string',
          required: false,
        },
      ]),
    );
  }

  removeAttribute(index: number): void {
    this.attributes.update((attrs) => normalizeEavAttributeOrder(attrs.filter((_, i) => i !== index)));
  }

  onFieldChange(): void {
    this.attributes.update((attrs) => [...attrs]);
  }

  async save(): Promise<void> {
    if (!this.config.saveAttributes) {
      this.error.set('saveAttributes не настроен в provideEavKit()');
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    try {
      await this.config.saveAttributes(this.entityKey(), this.attributes());
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Save error');
    } finally {
      this.saving.set(false);
    }
  }

  private async load(entityKey: string): Promise<void> {
    if (!this.config.loadAttributes) {
      this.attributes.set([]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const attrs = await this.config.loadAttributes(entityKey);
      this.attributes.set(normalizeEavAttributeOrder(attrs));
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Load error');
      this.attributes.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
