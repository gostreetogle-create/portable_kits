import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComposerPaletteComponent } from './components/palette/palette.component';
import { ComposerCanvasComponent } from './components/canvas/canvas.component';
import { ComposerPropertiesPanelComponent } from './components/properties-panel/properties-panel.component';
import { ComposerStateService } from './services/composer-state.service';
import { ComposerExportService } from './services/composer-export.service';

@Component({
  selector: 'demo-ui-kit-composer-page',
  standalone: true,
  imports: [
    RouterLink,
    ComposerPaletteComponent,
    ComposerCanvasComponent,
    ComposerPropertiesPanelComponent,
  ],
  templateUrl: './composer-page.component.html',
  styleUrl: './composer-page.component.scss',
})
export class UiKitComposerPageComponent {
  private readonly state = inject(ComposerStateService);
  private readonly exportService = inject(ComposerExportService);

  readonly statusMessage = signal('');

  saveDraft(): void {
    this.state.saveDraft();
    this.flash('Черновик сохранён в localStorage');
  }

  clearDraft(): void {
    this.state.clearDraft();
    this.state.selectedType.set(null);
    this.state.currentPreset.set({});
    this.flash('Черновик удалён');
  }

  reset(): void {
    this.state.resetToDefaults();
    this.flash('Сброшено к значениям по умолчанию');
  }

  async exportJson(): Promise<void> {
    const preset = this.state.toExportPreset();
    if (!preset) {
      this.flash('Выберите компонент и задайте название пресета');
      return;
    }
    const result = await this.exportService.copyJson(preset);
    if (result === 'copied') {
      this.flash('JSON скопирован в буфер обмена');
    } else if (result === 'downloaded') {
      this.flash('JSON скачан (clipboard недоступен)');
    } else {
      this.flash('Не удалось экспортировать');
    }
  }

  downloadJson(): void {
    const preset = this.state.toExportPreset();
    if (!preset) {
      this.flash('Выберите компонент и задайте название пресета');
      return;
    }
    this.exportService.downloadJson(preset);
    this.flash('JSON скачан');
  }

  private flash(message: string): void {
    this.statusMessage.set(message);
    setTimeout(() => this.statusMessage.set(''), 3000);
  }
}
