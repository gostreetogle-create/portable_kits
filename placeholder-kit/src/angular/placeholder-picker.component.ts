import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  DEFAULT_PLACEHOLDER_REGISTRY,
  buildPlaceholderGroups,
  type PlaceholderCategory,
  type PlaceholderToken,
} from '../core';
import { PLACEHOLDER_KIT_CONFIG } from './tokens';

@Component({
  selector: 'ph-placeholder-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './placeholder-picker.component.html',
  styleUrl: './placeholder-picker.component.scss',
})
export class PlaceholderPickerComponent {
  private readonly config = inject(PLACEHOLDER_KIT_CONFIG, { optional: true }) ?? {};

  readonly visible = model(false);
  readonly allowedCategories = input<PlaceholderCategory[]>([]);
  readonly placeholderSelected = output<string>();

  readonly searchQuery = signal('');

  readonly registry = this.config.registry ?? DEFAULT_PLACEHOLDER_REGISTRY;

  readonly filteredGroups = computed(() =>
    buildPlaceholderGroups({
      registry: this.registry,
      allowedCategories: this.allowedCategories(),
      query: this.searchQuery(),
    }),
  );

  onSelect(token: PlaceholderToken): void {
    this.placeholderSelected.emit(`{{${token.token}}}`);
    this.visible.set(false);
    this.searchQuery.set('');
  }

  close(): void {
    this.visible.set(false);
    this.searchQuery.set('');
  }

  onDialogHide(): void {
    this.searchQuery.set('');
  }
}
