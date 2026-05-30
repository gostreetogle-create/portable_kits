export type UiPrimengComponentStatus = 'ready' | 'planned';

export interface UiPrimengComponentEntry {
  id: string;
  title: string;
  className: string;
  selector: string;
  status: UiPrimengComponentStatus;
  description: string;
}

/** Каталог kp-* компонентов ui-primeng-kit для demo-hub. */
export const UI_PRIMENG_COMPONENTS: UiPrimengComponentEntry[] = [
  {
    id: 'button',
    title: 'Кнопка',
    className: 'KpButtonComponent',
    selector: 'up-kp-button',
    status: 'ready',
    description: 'Primary/secondary/danger, flat/premium, icon, loading',
  },
  {
    id: 'input',
    title: 'Поле ввода',
    className: 'KpInputComponent',
    selector: 'up-kp-input',
    status: 'ready',
    description: 'Label, validation error, autofocus, disabled',
  },
  {
    id: 'dialog',
    title: 'Диалог',
    className: 'KpDialogComponent',
    selector: 'up-kp-dialog',
    status: 'ready',
    description: 'Modal, footer slot, autofocus first field',
  },
  {
    id: 'select',
    title: 'Выпадающий список',
    className: 'KpSelectComponent',
    selector: 'up-kp-select',
    status: 'planned',
    description: 'Single select, options-resolver integration',
  },
  {
    id: 'table',
    title: 'Таблица',
    className: 'KpTableComponent',
    selector: 'up-kp-table',
    status: 'planned',
    description: 'Data table with column config',
  },
  {
    id: 'paginator',
    title: 'Пагинатор',
    className: 'KpPaginatorComponent',
    selector: 'up-kp-paginator',
    status: 'planned',
    description: 'Page size, total records',
  },
  {
    id: 'checkbox',
    title: 'Чекбокс',
    className: 'KpCheckboxComponent',
    selector: 'up-kp-checkbox',
    status: 'planned',
    description: 'Boolean field with label',
  },
  {
    id: 'textarea',
    title: 'Многострочное поле',
    className: 'KpTextareaComponent',
    selector: 'up-kp-textarea',
    status: 'planned',
    description: 'Auto-resize, validation',
  },
  {
    id: 'datepicker',
    title: 'Выбор даты',
    className: 'KpDatepickerComponent',
    selector: 'up-kp-datepicker',
    status: 'planned',
    description: 'Date and datetime picker',
  },
  {
    id: 'autocomplete',
    title: 'Автодополнение',
    className: 'KpAutocompleteComponent',
    selector: 'up-kp-autocomplete',
    status: 'planned',
    description: 'Search with async options',
  },
  {
    id: 'multiselect',
    title: 'Мультиселект',
    className: 'KpMultiselectComponent',
    selector: 'up-kp-multiselect',
    status: 'planned',
    description: 'Multiple selection dropdown',
  },
  {
    id: 'toggle',
    title: 'Переключатель',
    className: 'KpToggleComponent',
    selector: 'up-kp-toggle',
    status: 'planned',
    description: 'Boolean toggle switch',
  },
  {
    id: 'chip',
    title: 'Чип',
    className: 'KpChipComponent',
    selector: 'up-kp-chip',
    status: 'planned',
    description: 'Removable tag chip',
  },
  {
    id: 'tag',
    title: 'Тег',
    className: 'KpTagComponent',
    selector: 'up-kp-tag',
    status: 'planned',
    description: 'Status tag with severity',
  },
  {
    id: 'badge',
    title: 'Бейдж',
    className: 'KpBadgeComponent',
    selector: 'up-kp-badge',
    status: 'planned',
    description: 'Inline counter badge',
  },
  {
    id: 'tabs',
    title: 'Вкладки',
    className: 'KpTabsComponent',
    selector: 'up-kp-tabs',
    status: 'planned',
    description: 'Tabbed panel navigation',
  },
  {
    id: 'menu',
    title: 'Меню',
    className: 'KpMenuComponent',
    selector: 'up-kp-menu',
    status: 'planned',
    description: 'Context and dropdown menu',
  },
  {
    id: 'breadcrumb',
    title: 'Хлебные крошки',
    className: 'KpBreadcrumbComponent',
    selector: 'up-kp-breadcrumb',
    status: 'planned',
    description: 'Route breadcrumb trail',
  },
  {
    id: 'toast',
    title: 'Toast',
    className: 'KpToastComponent',
    selector: 'up-kp-toast',
    status: 'planned',
    description: 'Transient notification messages',
  },
  {
    id: 'confirm',
    title: 'Подтверждение',
    className: 'KpConfirmComponent',
    selector: 'up-kp-confirm',
    status: 'planned',
    description: 'Confirm/cancel dialog helper',
  },
  {
    id: 'file-upload',
    title: 'Загрузка файла',
    className: 'KpFileUploadComponent',
    selector: 'up-kp-file-upload',
    status: 'planned',
    description: 'Drag-and-drop file upload',
  },
  {
    id: 'image',
    title: 'Изображение',
    className: 'KpImageComponent',
    selector: 'up-kp-image',
    status: 'planned',
    description: 'Preview with zoom',
  },
];

export function getUiPrimengComponentById(id: string): UiPrimengComponentEntry | undefined {
  return UI_PRIMENG_COMPONENTS.find((c) => c.id === id);
}

export function uiPrimengComponentDemoRoute(id: string): string {
  return `/modules/ui-primeng-kit/${id}`;
}
