import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getDemoModuleById, type DemoModule } from '../../modules.config';

@Component({
  selector: 'demo-kit-placeholder',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kit-placeholder.component.html',
  styleUrl: './kit-placeholder.component.scss',
})
export class KitPlaceholderComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  module: DemoModule | null = null;

  ngOnInit(): void {
    const kitId = this.route.snapshot.paramMap.get('kitId');
    if (!kitId) {
      void this.router.navigateByUrl('/');
      return;
    }

    const mod = getDemoModuleById(kitId);
    if (!mod || mod.hasDemo) {
      void this.router.navigateByUrl('/');
      return;
    }

    this.module = mod;
  }
}
