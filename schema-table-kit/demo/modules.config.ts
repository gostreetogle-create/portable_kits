export interface DemoModule {
  id: string;
  /** Русское название модуля (заголовок карточки) */
  title: string;
  /** Английское имя kit-папки (подзаголовок) */
  subtitle: string;
  description: string;
  route: string;
  /** false — карточка видна, но переход недоступен (модуль в разработке) */
  available: boolean;
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
  },
  {
    id: 'schema-data-table-kit',
    title: 'Таблица данных по схеме',
    subtitle: 'schema-data-table-kit',
    description:
      'Таблица данных по schema-table config: <sdt-schema-data-table tableKey="..." [rows]="..." />',
    route: '/modules/schema-data-table-kit',
    available: false,
  },
  {
    id: 'entity-picker-kit',
    title: 'Выбор сущности',
    subtitle: 'entity-picker-kit',
    description:
      'Модальное окно выбора сущности по ключу: <ep-entity-picker entityKey="..." [(visible)]="v" (selected)="onPick($event)" />',
    route: '/modules/entity-picker-kit',
    available: false,
  },
  {
    id: 'document-canvas-kit',
    title: 'Редактор блоков документа',
    subtitle: 'document-canvas-kit',
    description:
      'Редактор блоков документа (шаблон или экземпляр): <dc-document-canvas mode="instance|template" [(blocks)]="blocks" />',
    route: '/modules/document-canvas-kit',
    available: false,
  },
  {
    id: 'photo-uploader-kit',
    title: 'Загрузка фотографий',
    subtitle: 'photo-uploader-kit',
    description: 'Загрузка и управление фотографиями: <pu-photo-uploader [(photos)]="photos" />',
    route: '/modules/photo-uploader-kit',
    available: false,
  },
  {
    id: 'sortable-kit',
    title: 'Сортируемые списки',
    subtitle: 'sortable-kit',
    description:
      'Drag-and-drop списки без Angular CDK: soSortableList, soSortableItem, soSortableHandle, moveSortableItems()',
    route: '/modules/sortable-kit',
    available: false,
  },
  {
    id: 'placeholder-kit',
    title: 'Подстановка плейсхолдеров',
    subtitle: 'placeholder-kit',
    description:
      'Подстановка плейсхолдеров в текст и UI-пикер: resolvePlaceholders(text, ctx), <ph-placeholder-picker />',
    route: '/modules/placeholder-kit',
    available: false,
  },
  {
    id: 'crud-page-kit',
    title: 'CRUD-страница',
    subtitle: 'crud-page-kit',
    description:
      'Универсальная CRUD-страница Angular: <cp-crud-page [config]="cfg" />, CrudStore, provideCrudPageKit()',
    route: '/modules/crud-page-kit',
    available: false,
  },
  {
    id: 'crud-factory-kit',
    title: 'Фабрика CRUD (Express)',
    subtitle: 'crud-factory-kit',
    description:
      'Express CRUD-роутер из Mongoose-модели: createCrudRouter(model, { permPrefix, ... })',
    route: '/modules/crud-factory-kit',
    available: false,
  },
  {
    id: 'options-resolver-kit',
    title: 'Резолвер опций',
    subtitle: 'options-resolver-kit',
    description:
      'Кэш и загрузка опций для select/autocomplete: provideOptionsResolver(config), OptionsResolver.getOptions(entityKey)',
    route: '/modules/options-resolver-kit',
    available: false,
  },
  {
    id: 'ui-primeng-kit',
    title: 'UI-компоненты PrimeNG',
    subtitle: 'ui-primeng-kit',
    description:
      'Обёртки PrimeNG (кнопки, поля, таблицы, диалоги): KpButton, KpInput, KpTable, KpDialog, barrel export',
    route: '/modules/ui-primeng-kit',
    available: false,
  },
  {
    id: 'auth-rbac-kit',
    title: 'Аутентификация и права',
    subtitle: 'auth-rbac-kit',
    description:
      'JWT, guards и проверка прав: provideAuthRbacKit(), hasPermission(), createAuthMiddleware()',
    route: '/modules/auth-rbac-kit',
    available: false,
  },
  {
    id: 'eav-kit',
    title: 'EAV-атрибуты',
    subtitle: 'eav-kit',
    description:
      'Редактор EAV-атрибутов сущности: <eav-attribute-editor entityKey="..." />, EavSchemaProvider',
    route: '/modules/eav-kit',
    available: false,
  },
  {
    id: 'quotation-editor',
    title: 'Редактор коммерческих предложений',
    subtitle: 'quotation-editor',
    description:
      'Редактор коммерческих предложений: строки, таблицы, расчёты и экспорт документа',
    route: '/modules/quotation-editor',
    available: false,
  },
  {
    id: 'layout-shell-kit',
    title: 'Оболочка приложения',
    subtitle: 'layout-shell-kit',
    description:
      'Оболочка приложения: боковое меню, layout, хлебные крошки и метки маршрутов',
    route: '/modules/layout-shell-kit',
    available: false,
  },
];
