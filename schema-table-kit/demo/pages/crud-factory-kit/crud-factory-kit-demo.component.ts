import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { paginated, success } from '@crud-factory-kit/core';

@Component({
  selector: 'demo-crud-factory-kit',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './crud-factory-kit-demo.component.html',
  styleUrl: './crud-factory-kit-demo.component.scss',
})
export class CrudFactoryKitDemoComponent {
  readonly listResponse = paginated(
    [
      { _id: '1', name: 'Пример A', isActive: true },
      { _id: '2', name: 'Пример B', isActive: true },
    ],
    2,
    1,
    50,
  );

  readonly createResponse = success({ _id: '3', name: 'New record' }, 'Created');

  readonly routerSnippet = `import { createCrudRouter } from '@crud-factory-kit/express';

app.use('/api/products', createCrudRouter(ProductModel, {
  searchFields: ['name', 'sku'],
  permPrefix: 'catalog.products',
  authenticate: authMiddleware,
  requirePermission: (action) => checkPerm('catalog.products.' + action),
}));`;
}
