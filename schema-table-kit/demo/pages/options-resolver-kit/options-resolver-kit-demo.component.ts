import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OptionsResolver } from '@options-resolver-kit/angular';
import type { SelectOption } from '@options-resolver-kit/core';

@Component({
  selector: 'demo-options-resolver-kit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './options-resolver-kit-demo.component.html',
  styleUrl: './options-resolver-kit-demo.component.scss',
})
export class OptionsResolverKitDemoComponent implements OnInit {
  private readonly resolver = inject(OptionsResolver);

  readonly entityKey = signal('managers');
  readonly options = signal<SelectOption[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    void this.loadOptions('managers');
  }

  async loadOptions(key: string): Promise<void> {
    this.entityKey.set(key);
    this.loading.set(true);
    this.error.set(null);
    try {
      const opts = await this.resolver.getOptions(key);
      this.options.set(opts);
    } catch (err: unknown) {
      this.options.set([]);
      this.error.set(err instanceof Error ? err.message : 'Error');
    } finally {
      this.loading.set(false);
    }
  }

  async reload(): Promise<void> {
    this.resolver.clearCache(this.entityKey());
    await this.loadOptions(this.entityKey());
  }
}
