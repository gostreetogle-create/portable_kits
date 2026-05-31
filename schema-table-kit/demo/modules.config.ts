export type KitReadiness = 'ready' | 'stub' | 'scaffold';

/** Уровень сложности модуля в иерархии композиции */
export type DemoModuleTier = 'brick' | 'composite' | 'application';

export interface DemoModule {
  id: string;
  /** Русское название модуля (заголовок карточки) */
  title: string;
  /** Английское имя kit-папки (подзаголовок) */
  subtitle: string;
  description: string;
  route: string;
  /** false — карточка видна, но переход недоступен (устарело: используйте hasDemo) */
  available: boolean;
  /** true — есть рабочее demo; false — страница-заглушка «в разработке» */
  hasDemo?: boolean;
  /** ready = working src + demo; stub = placeholder in hub; scaffold = export {} in src/ */
  readiness: KitReadiness;
  /** brick = атомарные UI/утилиты; composite = из кирпичиков; application = из составных */
  tier: DemoModuleTier;
}

export interface DemoModuleTierSection {
  tier: DemoModuleTier;
  heading: string;
  subtitle?: string;
}

/** Секции home-страницы hub: слева направо по возрастанию сложности */
export const DEMO_MODULE_TIER_SECTIONS: DemoModuleTierSection[] = [
  { tier: 'brick', heading: 'Кирпичики', subtitle: 'UI и утилиты' },
  { tier: 'composite', heading: 'Составные модули' },
  { tier: 'application', heading: 'Приложения и редакторы' },
];

export function getDemoModulesByTier(tier: DemoModuleTier): DemoModule[] {
  return DEMO_MODULES.filter((m) => m.tier === tier);
}

/** Реестр demo-модулей. Чтобы добавить новый — допишите объект в массив и зарегистрируйте route в app.routes.ts */
export const DEMO_MODULES: DemoModule[] = [
  {
    id: 'schema-table-kit',
    title: 'Конструктор колонок таблиц',
    subtitle: 'schema-table-kit',
    description:
      'Единый config таблиц БД + конструктор колонок для Angular (+ optional Express schema API)',
    route: '/modules/schema-table-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'schema-data-table-kit',
    title: 'Таблица данных по схеме',
    subtitle: 'schema-data-table-kit',
    description:
      'Таблица данных по schema-table config: <sdt-schema-data-table tableKey="..." [rows]="..." />',
    route: '/modules/schema-data-table-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'entity-picker-kit',
    title: 'Выбор сущности',
    subtitle: 'entity-picker-kit',
    description:
      'Модальное окно выбора сущности по ключу: <ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />',
    route: '/modules/entity-picker-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'document-canvas-kit',
    title: 'Редактор блоков документа',
    subtitle: 'document-canvas-kit',
    description:
      'Редактор блоков документа (шаблон или экземпляр): <dc-document-canvas mode="instance|template" [(blocks)]="blocks" />',
    route: '/modules/document-canvas-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'photo-uploader-kit',
    title: 'Загрузка фотографий',
    subtitle: 'photo-uploader-kit',
    description: 'Загрузка и управление фотографиями: <pu-photo-uploader [(photos)]="photos" />',
    route: '/modules/photo-uploader-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'sortable-kit',
    title: 'Сортируемые списки',
    subtitle: 'sortable-kit',
    description:
      'Drag-and-drop списки на @angular/cdk/drag-drop: soSortableList, soSortableItem, soSortableHandle, moveSortableItems()',
    route: '/modules/sortable-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'placeholder-kit',
    title: 'Подстановка плейсхолдеров',
    subtitle: 'placeholder-kit',
    description:
      'Подстановка плейсхолдеров в текст и UI-пикер: resolvePlaceholders(text, ctx), <ph-placeholder-picker />',
    route: '/modules/placeholder-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'crud-page-kit',
    title: 'CRUD-страница',
    subtitle: 'crud-page-kit',
    description:
      'Универсальная CRUD-страница Angular: <cp-crud-page [store]="store" [config]="cfg" [columns]="cols" />',
    route: '/modules/crud-page-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'crud-factory-kit',
    title: 'Фабрика CRUD (Express)',
    subtitle: 'crud-factory-kit',
    description:
      'Express CRUD-роутер из Mongoose-модели: createCrudRouter(model, { permPrefix, ... })',
    route: '/modules/crud-factory-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'options-resolver-kit',
    title: 'Резолвер опций',
    subtitle: 'options-resolver-kit',
    description:
      'Кэш и загрузка опций для select/autocomplete: provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)',
    route: '/modules/options-resolver-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'ui-primeng-kit',
    title: 'UI-кит',
    subtitle: 'ui-primeng-kit',
    description:
      'Каталог kp-* обёрток PrimeNG: таблица типов → demo вариантов (button, input, dialog, …)',
    route: '/modules/ui-primeng-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'ui-kit-composer',
    title: 'Конструктор UI-кита',
    subtitle: 'ui-kit-composer',
    description:
      'Визуальная настройка kp-кирпичиков: палитра → preview → export JSON / localStorage draft',
    route: '/modules/ui-kit-composer',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'auth-rbac-kit',
    title: 'Аутентификация и права',
    subtitle: 'auth-rbac-kit',
    description:
      'JWT, guards и проверка прав: provideAuthRbacKit(), hasPermission(), createAuthMiddleware()',
    route: '/modules/auth-rbac-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'brick',
  },
  {
    id: 'eav-kit',
    title: 'EAV-атрибуты',
    subtitle: 'eav-kit',
    description:
      'Редактор EAV-атрибутов сущности: <eav-attribute-editor entityKey="..." />, provideEavKit()',
    route: '/modules/eav-kit',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'composite',
  },
  {
    id: 'quotation-editor',
    title: 'Редактор коммерческих предложений',
    subtitle: 'quotation-editor',
    description:
      'Редактор КП: document-canvas + entity-picker + placeholders — <qe-quotation-editor />',
    route: '/modules/quotation-editor',
    available: true,
    hasDemo: true,
    readiness: 'ready',
    tier: 'application',
  },
  {
    id: 'layout-shell-kit',
    title: 'Оболочка приложения',
    subtitle: 'layout-shell-kit',
    description:
      'Оболочка приложения: <ls-layout-shell> с боковым меню и router-outlet',
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
