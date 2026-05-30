import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrudPageComponent } from '@crud-page-kit/angular';
import { CrudStore } from '@crud-page-kit/core';
import { DEMO_CRUD_API, type DemoCrudRow } from '../../mock-data/crud-page.mock';

@Component({
  selector: 'demo-crud-page-kit',
  standalone: true,
  imports: [RouterLink, FormsModule, CrudPageComponent],
  template: `
    <section class="demo-page">
      <a routerLink="/" class="demo-back">← Все модули</a>
      <h1>crud-page-kit</h1>
      <p class="demo-lead">Универсальная CRUD-страница с in-memory mock API.</p>

      <cp-crud-page [store]="store" [config]="pageConfig" [columns]="columns">
        <ng-template #form let-row="row">
          <label>
            Название
            <input type="text" [(ngModel)]="row['name']" name="name" />
          </label>
          <label>
            Категория
            <input type="text" [(ngModel)]="row['category']" name="category" />
          </label>
        </ng-template>
      </cp-crud-page>
    </section>
  `,
  styles: `
    label {
      display: block;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }

    input {
      display: block;
      width: 100%;
      margin-top: 0.25rem;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font: inherit;
    }
  `,
})
export class CrudPageKitDemoComponent {
  readonly store = new CrudStore<DemoCrudRow>(DEMO_CRUD_API, {
    basePath: '/demo/items',
    defaultLimit: 10,
    defaultSortField: 'name',
    defaultSortOrder: 1,
  });

  readonly pageConfig = {
    title: 'Демо-справочник',
    description: 'CrudStore + cp-crud-page с mock API',
    createLabel: 'Добавить',
    emptyMessage: 'Нет записей',
  };

  readonly columns = [
    { field: 'name', header: 'Название' },
    { field: 'category', header: 'Категория' },
    { field: 'status', header: 'Статус', width: '100px' },
  ];
}
