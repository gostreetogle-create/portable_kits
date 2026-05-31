import { Component, inject } from '@angular/core';
import { COMPOSER_PALETTE } from '../../models/composer-palette.config';
import { ComposerStateService } from '../../services/composer-state.service';
import type { ComposerComponentType } from '../../models/component-preset.model';

@Component({
  selector: 'demo-composer-palette',
  standalone: true,
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.scss',
})
export class ComposerPaletteComponent {
  readonly state = inject(ComposerStateService);
  readonly entries = COMPOSER_PALETTE;

  select(type: ComposerComponentType): void {
    this.state.selectType(type);
  }

  isActive(type: ComposerComponentType): boolean {
    return this.state.selectedType() === type;
  }
}
