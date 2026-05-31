export type KitReadiness = 'ready' | 'stub' | 'scaffold';

/** Module complexity level in composition hierarchy */
export type DemoModuleTier = 'brick' | 'composite' | 'application';

export interface DemoModule {
  id: string;
  /** Module display name (card heading) */
  title: string;
  /** Kit folder name (card subtitle) */
  subtitle: string;
  description: string;
  route: string;
  /** false — card visible but not clickable (deprecated: use hasDemo) */
  available: boolean;
  /** true — working demo page exists; false — placeholder 'under development' page */
  hasDemo?: boolean;
  /** ready = working src + demo; stub = placeholder in hub; scaffold = export {} in src/ */
  readiness: KitReadiness;
  /** brick = atomic UI/utils; composite = composed from bricks; application = composed from composites */
  tier: DemoModuleTier;
}

export interface DemoModuleTierSection {
  tier: DemoModuleTier;
  heading: string;
  subtitle?: string;
}

/** Home page sections: left to right by increasing complexity */
export const DEMO_MODULE_TIER_SECTIONS: DemoModuleTierSection[] = [
  { tier: 'brick', heading: 'Bricks', subtitle: 'UI & Utilities' },
  { tier: 'composite', heading: 'Composite modules' },
  { tier: 'application', heading: 'Applications & Editors' },
];

export function getDemoModulesByTier(tier: DemoModuleTier): DemoModule[] {
  return DEMO_MODULES.filter((m) => m.tier === tier);
}

/** Demo module registry. To add a new kit — append an object here and register a route in app.routes.ts */
export const DEMO_MODULES: DemoModule[] = [
  {
    id: 'schema-table-kit',
    title: 'Table Column Builder',
    subtitle: 'schema-table-kit',
    description:
      'Unified DB table config + Angular column builder (+ optional Express schema API)',
    route: '/modules/schema-table-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'schema-data-table-kit',
    title: 'Schema Data Table',
    subtitle: 'schema-data-table-kit',
    description:
      'Data table driven by schema-table config: <sdt-schema-data-table tableKey="..." [rows]="..." />',
    route: '/modules/schema-data-table-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'entity-picker-kit',
    title: 'Entity Picker',
    subtitle: 'entity-picker-kit',
    description:
      'Modal entity selection by key: <ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />',
    route: '/modules/entity-picker-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'document-canvas-kit',
    title: 'Document Block Editor',
    subtitle: 'document-canvas-kit',
    description:
      'Document block editor (template or instance): <dc-document-canvas mode="instance|template" [(blocks)]="blocks" />',
    route: '/modules/document-canvas-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'photo-uploader-kit',
    title: 'Photo Uploader',
    subtitle: 'photo-uploader-kit',
    description: 'Photo upload and management: <pu-photo-uploader [(photos)]="photos" />',
    route: '/modules/photo-uploader-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'sortable-kit',
    title: 'Sortable Lists',
    subtitle: 'sortable-kit',
    description:
      'Drag-and-drop lists via @angular/cdk/drag-drop: soSortableList, soSortableItem, soSortableHandle, moveSortableItems()',
    route: '/modules/sortable-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'placeholder-kit',
    title: 'Placeholder Substitution',
    subtitle: 'placeholder-kit',
    description:
      'Placeholder resolution in text + UI picker: resolvePlaceholders(text, ctx), <ph-placeholder-picker />',
    route: '/modules/placeholder-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'crud-page-kit',
    title: 'CRUD Page',
    subtitle: 'crud-page-kit',
    description:
      'Generic Angular CRUD page: <cp-crud-page [store]="store" [config]="cfg" [columns]="cols" />',
    route: '/modules/crud-page-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'crud-factory-kit',
    title: 'CRUD Factory (Express)',
    subtitle: 'crud-factory-kit',
    description:
      'Express CRUD router from Mongoose model: createCrudRouter(model, { permPrefix, ... })',
    route: '/modules/crud-factory-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'options-resolver-kit',
    title: 'Options Resolver',
    subtitle: 'options-resolver-kit',
    description:
      'Options cache & loader for select/autocomplete: provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)',
    route: '/modules/options-resolver-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'ui-primeng-kit',
    title: 'UI Kit',
    subtitle: 'ui-primeng-kit',
    description:
      'Catalog of kp-* PrimeNG wrappers: type table → variant demo (button, input, dialog, …)',
    route: '/modules/ui-primeng-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'ui-kit-composer',
    title: 'UI Kit Composer',
    subtitle: 'ui-kit-composer',
    description:
      'Visual kp-brick customization: palette → preview → export JSON / localStorage draft',
    route: '/modules/ui-kit-composer',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'auth-rbac-kit',
    title: 'Auth & RBAC',
    subtitle: 'auth-rbac-kit',
    description:
      'JWT, guards & permission checks: provideAuthRbacKit(), hasPermission(), createAuthMiddleware()',
    route: '/modules/auth-rbac-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'eav-kit',
    title: 'EAV Attributes',
    subtitle: 'eav-kit',
    description:
      'Entity attribute-value editor: <eav-attribute-editor entityKey="..." />, provideEavKit()',
    route: '/modules/eav-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'quotation-editor',
    title: 'Quotation Editor',
    subtitle: 'quotation-editor',
    description:
      'Quotation editor: document-canvas + entity-picker + placeholders — <qe-quotation-editor />',
    route: '/modules/quotation-editor',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'application',
  },
  {
    id: 'layout-shell-kit',
    title: 'App Shell',
    subtitle: 'layout-shell-kit',
    description:
      'Application shell: <ls-layout-shell> with sidebar menu and router-outlet',
    route: '/modules/layout-shell-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
];

export function getDemoModuleById(id: string): DemoModule | undefined {
  return DEMO_MODULES.find((m) => m.id === id);
}
