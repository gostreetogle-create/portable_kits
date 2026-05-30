import { Component, model, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EntityPickerComponent } from '@entity-picker-kit/angular';
import type { EntityPickerRow } from '@entity-picker-kit/core';

@Component({
  selector: 'demo-entity-picker-kit',
  standalone: true,
  imports: [RouterLink, JsonPipe, EntityPickerComponent],
  templateUrl: './entity-picker-kit-demo.component.html',
  styleUrl: './entity-picker-kit-demo.component.scss',
})
export class EntityPickerKitDemoComponent {
  readonly singleVisible = model(false);
  readonly multiVisible = model(false);
  readonly selected = signal<EntityPickerRow | null>(null);
  readonly selectedMany = signal<EntityPickerRow[]>([]);

  openSingle(): void {
    this.singleVisible.set(true);
  }

  openMulti(): void {
    this.multiVisible.set(true);
  }

  onSelected(row: EntityPickerRow): void {
    this.selected.set(row);
  }

  onSelectedMany(rows: EntityPickerRow[]): void {
    this.selectedMany.set(rows);
  }
}
