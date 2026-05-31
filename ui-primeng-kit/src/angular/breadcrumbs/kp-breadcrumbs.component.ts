import {
  Component,
  input,
  signal,
  inject,
  DestroyRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

export interface KpBreadcrumbItem {
  label: string;
  routerLink?: string;
}

interface KpRouteLabels {
  [key: string]: string;
}

const DEFAULT_ROUTE_LABELS: KpRouteLabels = {
  dashboard: 'Главная',
  documents: 'Документы',
  products: 'Товары',
  directories: 'НСИ',
  modules: 'Бизнес-процессы',
  tenders: 'Тендеры',
  quotations: 'Ком. предложения',
  orders: 'Заказы',
  'product-passports': 'Паспорта изделий',
  'work-orders': 'Производственные наряды',
  operations: 'Операции',
  boms: 'Спецификации (BOM)',
  'tech-processes': 'Техпроцессы',
  'work-order-operations': 'Операции нарядов',
  'purchase-orders': 'Закупки',
  shipments: 'Отгрузки',
  'attribute-definitions': 'Атрибуты',
  'document-templates': 'Шаблоны документов',
  'document-table-types': 'Шаблоны таблиц',
  administration: 'Администрирование',
  new: 'Новый',
  'process-map': 'Карта процессов',
};

const DEFAULT_ROUTE_PARENTS: KpRouteLabels = {
  quotations: 'documents',
  orders: 'documents',
  tenders: 'documents',
  'document-templates': 'administration',
  'document-table-types': 'administration',
  'work-orders': 'orders',
  'work-order-operations': 'work-orders',
};

const DEFAULT_EDITOR_ROUTES = new Set([
  'document-templates',
  'quotations',
  'orders',
  'tenders',
  'work-orders',
  'operations',
  'boms',
  'tech-processes',
  'work-order-operations',
  'purchase-orders',
  'shipments',
  'product-passports',
]);

const OBJECT_ID_RE = /^[a-f0-9]{24}$/;

@Component({
  selector: 'up-kp-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbModule],
  templateUrl: './kp-breadcrumbs.component.html',
  styleUrl: './kp-breadcrumbs.component.scss',
})
export class KpBreadcrumbsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly items = input<KpBreadcrumbItem[] | undefined>(undefined);
  readonly routeLabels = input<KpRouteLabels>({});
  readonly routeParents = input<KpRouteLabels>({});
  readonly editorRoutes = input<Set<string> | undefined>(undefined);

  readonly menuItems = signal<MenuItem[]>([]);
  readonly visible = signal(false);

  readonly homeItem: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/dashboard',
    label: 'Главная',
  };

  ngOnInit(): void {
    this.syncFromRouter();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.syncFromRouter());
  }

  private syncFromRouter(): void {
    const custom = this.items();
    const crumbs = custom?.length ? custom : this.buildFromUrl(this.router.url);
    const trail = this.toMenuItems(crumbs);

    this.menuItems.set(trail);
    this.visible.set(trail.length > 0);
  }

  private buildFromUrl(url: string): KpBreadcrumbItem[] {
    const path = url.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);
    const labels = { ...DEFAULT_ROUTE_LABELS, ...this.routeLabels() };
    const parents = { ...DEFAULT_ROUTE_PARENTS, ...this.routeParents() };
    const editors = this.editorRoutes() ?? DEFAULT_EDITOR_ROUTES;

    if (segments.length === 0 || (segments.length === 1 && segments[0] === 'dashboard')) {
      return [];
    }

    const items: KpBreadcrumbItem[] = [];
    let cumulative = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      cumulative += `/${segment}`;

      const parent = parents[segment];
      if (parent && !items.some((item) => item.routerLink === `/${parent}`)) {
        items.push({
          label: labels[parent] ?? this.humanizeSegment(parent),
          routerLink: `/${parent}`,
        });
      }

      const label = labels[segment] ?? this.humanizeSegment(segment);
      const isLast = i === segments.length - 1;

      const prevSegment = i > 0 ? segments[i - 1] : null;
      const displayLabel =
        isLast && prevSegment && editors.has(prevSegment) && OBJECT_ID_RE.test(segment)
          ? 'Редактирование'
          : segment === 'new' && prevSegment === 'document-templates'
            ? 'Новый шаблон'
            : segment === 'new' && prevSegment === 'quotations'
              ? 'Новое КП'
              : label;

      items.push({
        label: displayLabel,
        routerLink: isLast ? undefined : cumulative,
      });
    }

    return items;
  }

  private toMenuItems(items: KpBreadcrumbItem[]): MenuItem[] {
    return items.map((item) => ({
      label: item.label,
      routerLink: item.routerLink,
    }));
  }

  private humanizeSegment(segment: string): string {
    return segment
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}
